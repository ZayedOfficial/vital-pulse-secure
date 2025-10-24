import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Star, Award, Calendar, Sparkles } from 'lucide-react';
import { useDoctorRecommendation } from '@/hooks/useDoctorRecommendation';
import { toast } from 'sonner';

interface DoctorRecommendationsProps {
  patientConditions: string[];
  isRareCase?: boolean;
}

export function DoctorRecommendations({ patientConditions, isRareCase = false }: DoctorRecommendationsProps) {
  const { recommendations, isLoading, error, getRecommendations } = useDoctorRecommendation();
  const [hasSearched, setHasSearched] = useState(false);

  const handleGetRecommendations = async () => {
    if (!patientConditions || patientConditions.length === 0) {
      toast.error('Please add medical conditions to get recommendations');
      return;
    }
    
    setHasSearched(true);
    const results = await getRecommendations(patientConditions, isRareCase);
    
    if (results && results.length > 0) {
      toast.success(`Found ${results.length} recommended doctors`);
    } else if (!error) {
      toast.info('No doctors found matching your conditions');
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI-Powered Doctor Recommendations
            </CardTitle>
            <CardDescription>
              Get personalized doctor recommendations based on your conditions
            </CardDescription>
          </div>
          <Button 
            onClick={handleGetRecommendations} 
            disabled={isLoading || !patientConditions.length}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Get Recommendations'
            )}
          </Button>
        </div>
      </CardHeader>
      
      {hasSearched && (
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {!isLoading && recommendations.length === 0 && !error && (
            <div className="rounded-lg bg-muted p-8 text-center">
              <p className="text-muted-foreground">
                No recommendations available. Please try again or check your conditions.
              </p>
            </div>
          )}

          {recommendations.map((doctor, index) => (
            <Card key={doctor.doctor_id} className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold">{doctor.doctor_name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {doctor.specialization.replace(/_/g, ' ')}
                      </p>
                    </div>
                    <Badge variant={getPriorityColor(doctor.priority)}>
                      {doctor.priority || 'Recommended'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>{doctor.experience_years} years experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>{doctor.rating.toFixed(1)} rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>{doctor.rare_cases_handled} rare cases</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className={doctor.is_available ? 'text-green-600' : 'text-orange-600'}>
                        {doctor.next_available || 'Check schedule'}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-sm font-medium mb-1">Why Recommended:</p>
                    <p className="text-sm text-muted-foreground">{doctor.reason}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all" 
                          style={{ width: `${doctor.match_score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{doctor.match_score}% match</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      )}
    </Card>
  );
}