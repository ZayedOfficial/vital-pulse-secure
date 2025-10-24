import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DoctorRecommendation {
  doctor_id: string;
  doctor_name: string;
  specialization: string;
  experience_years: number;
  rating: number;
  is_available: boolean;
  rare_cases_handled: number;
  match_score: number;
  reason: string;
  next_available?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { patientConditions, isRareCase } = await req.json();

    console.log('Recommending doctors for conditions:', patientConditions, 'Rare case:', isRareCase);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all doctors with their profiles
    const { data: doctors, error: doctorsError } = await supabase
      .from('doctors')
      .select(`
        id,
        user_id,
        specialization,
        experience_years,
        rating,
        is_available,
        rare_cases_handled,
        total_patients_handled,
        bio,
        profiles!inner(full_name, email)
      `);

    if (doctorsError) {
      console.error('Error fetching doctors:', doctorsError);
      throw doctorsError;
    }

    if (!doctors || doctors.length === 0) {
      return new Response(
        JSON.stringify({ recommendations: [], message: 'No doctors available' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use AI to analyze and recommend doctors
    const aiPrompt = `You are a medical AI assistant. Analyze these patient conditions and recommend the best doctors.

Patient Conditions: ${Array.isArray(patientConditions) ? patientConditions.join(', ') : patientConditions}
Is Rare Case: ${isRareCase}

Available Doctors:
${doctors.map((d: any, i: number) => `
${i + 1}. ${d.profiles.full_name}
   - Specialization: ${d.specialization}
   - Experience: ${d.experience_years} years
   - Rating: ${d.rating}/5
   - Rare Cases Handled: ${d.rare_cases_handled}
   - Total Patients: ${d.total_patients_handled}
   - Currently Available: ${d.is_available ? 'Yes' : 'No'}
   - Bio: ${d.bio || 'N/A'}
`).join('\n')}

Rank the top 3-5 doctors best suited for these conditions. For each doctor, provide:
1. Why they are recommended (specific to the conditions)
2. A match score (0-100)
3. Priority level (High/Medium/Low)

Consider:
- Specialization match with conditions
- Experience level (especially for rare cases)
- Number of rare cases handled (if applicable)
- Current availability
- Overall rating

Respond in JSON format with this structure:
{
  "recommendations": [
    {
      "doctor_index": <index from list above>,
      "match_score": <0-100>,
      "reason": "<specific reason for recommendation>",
      "priority": "<High/Medium/Low>"
    }
  ]
}`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a medical AI that recommends doctors based on patient conditions. Always respond with valid JSON.' },
          { role: 'user', content: aiPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0].message.content;

    console.log('AI Response:', aiContent);

    // Parse AI response
    let aiRecommendations;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = aiContent.match(/```json\s*([\s\S]*?)\s*```/) || aiContent.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : aiContent;
      aiRecommendations = JSON.parse(jsonStr.trim());
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      console.error('AI content:', aiContent);
      // Fallback to simple ranking
      aiRecommendations = {
        recommendations: doctors.slice(0, 3).map((_, i: number) => ({
          doctor_index: i,
          match_score: 80 - (i * 10),
          reason: 'Recommended based on specialization and experience',
          priority: i === 0 ? 'High' : 'Medium'
        }))
      };
    }

    // Build final recommendations
    const recommendations: DoctorRecommendation[] = aiRecommendations.recommendations
      .map((rec: any) => {
        const doctor = doctors[rec.doctor_index];
        if (!doctor) return null;

        const profile = Array.isArray(doctor.profiles) ? doctor.profiles[0] : doctor.profiles;
        
        return {
          doctor_id: doctor.id,
          doctor_name: profile?.full_name || 'Unknown',
          specialization: doctor.specialization,
          experience_years: doctor.experience_years,
          rating: parseFloat(doctor.rating) || 0,
          is_available: doctor.is_available,
          rare_cases_handled: doctor.rare_cases_handled,
          match_score: rec.match_score,
          reason: rec.reason,
          priority: rec.priority,
          next_available: doctor.is_available ? 'Available now' : 'Check schedule'
        };
      })
      .filter((r: any) => r !== null);

    console.log('Final recommendations:', recommendations);

    return new Response(
      JSON.stringify({ recommendations }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in recommend-doctor function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});