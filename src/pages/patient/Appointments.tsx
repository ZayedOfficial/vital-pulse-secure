import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Plus } from 'lucide-react';

export default function PatientAppointments() {
  const appointments = [
    { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2025-10-25', time: '10:30 AM', status: 'Confirmed', type: 'Follow-up' },
    { id: 2, doctor: 'Dr. Michael Brown', specialty: 'General Medicine', date: '2025-10-28', time: '02:00 PM', status: 'Confirmed', type: 'Routine Checkup' },
    { id: 3, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2025-11-02', time: '11:00 AM', status: 'Pending', type: 'Lab Results' },
  ];

  const pastAppointments = [
    { id: 4, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2025-10-15', time: '10:00 AM', status: 'Completed' },
    { id: 5, doctor: 'Dr. Michael Brown', specialty: 'General Medicine', date: '2025-09-20', time: '03:30 PM', status: 'Completed' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">My Appointments</h1>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Book Appointment
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Upcoming</h2>
          <div className="space-y-4">
            {appointments.map((apt) => (
              <Card key={apt.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{apt.doctor}</h3>
                          <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground ml-13">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {apt.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {apt.time}
                        </div>
                      </div>
                      <div className="ml-13">
                        <Badge variant="outline">{apt.type}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={apt.status === 'Confirmed' ? 'default' : 'secondary'}>
                        {apt.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Cancel</Button>
                        <Button size="sm">Details</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Past Appointments</h2>
          <div className="space-y-4">
            {pastAppointments.map((apt) => (
              <Card key={apt.id} className="opacity-75">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{apt.doctor}</h3>
                          <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground ml-13">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {apt.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {apt.time}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">View Summary</Button>
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
