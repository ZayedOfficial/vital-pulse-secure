import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pill, Download, Calendar } from 'lucide-react';

export default function PatientPrescriptions() {
  const activePrescriptions = [
    {
      id: 1,
      medication: 'Lisinopril 10mg',
      dosage: '1 tablet daily',
      prescribedBy: 'Dr. Sarah Johnson',
      startDate: '2025-10-01',
      duration: '30 days',
      refills: 2,
      instructions: 'Take in the morning with food'
    },
    {
      id: 2,
      medication: 'Aspirin 81mg',
      dosage: '1 tablet daily',
      prescribedBy: 'Dr. Sarah Johnson',
      startDate: '2025-10-01',
      duration: 'Ongoing',
      refills: 5,
      instructions: 'Take with water'
    },
  ];

  const pastPrescriptions = [
    {
      id: 3,
      medication: 'Amoxicillin 500mg',
      dosage: '1 capsule 3x daily',
      prescribedBy: 'Dr. Michael Brown',
      startDate: '2025-09-15',
      endDate: '2025-09-25',
      completed: true
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">My Prescriptions</h1>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download All
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Active Medications</h2>
          <div className="space-y-4">
            {activePrescriptions.map((rx) => (
              <Card key={rx.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Pill className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{rx.medication}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{rx.dosage}</p>
                      </div>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Prescribed by</p>
                      <p className="font-medium">{rx.prescribedBy}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{rx.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p className="font-medium">{rx.startDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Refills Remaining</p>
                      <p className="font-medium">{rx.refills}</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm"><strong>Instructions:</strong> {rx.instructions}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Request Refill</Button>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Past Prescriptions</h2>
          <div className="space-y-4">
            {pastPrescriptions.map((rx) => (
              <Card key={rx.id} className="opacity-75">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                        <Pill className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{rx.medication}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{rx.dosage}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Prescribed by</p>
                      <p className="font-medium">{rx.prescribedBy}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Period</p>
                      <p className="font-medium">{rx.startDate} - {rx.endDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
