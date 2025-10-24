import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  priority?: string;
  next_available?: string;
}

export function useDoctorRecommendation() {
  const [recommendations, setRecommendations] = useState<DoctorRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async (patientConditions: string[], isRareCase: boolean = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('recommend-doctor', {
        body: { patientConditions, isRareCase }
      });

      if (functionError) {
        throw functionError;
      }

      setRecommendations(data.recommendations || []);
      return data.recommendations || [];
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to get recommendations';
      setError(errorMessage);
      console.error('Error getting recommendations:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    recommendations,
    isLoading,
    error,
    getRecommendations,
  };
}