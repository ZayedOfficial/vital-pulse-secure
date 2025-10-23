import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Clock, User, Video, MapPin } from 'lucide-react';

export default function DoctorAppointments() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const appointments = [
    { id: 1, patient: 'Sarah Johnson', time: '09:00 AM', type: 'In-person', reason: 'Routine checkup', status: 'Confirmed' },
    { id: 2, patient: 'Mike Wilson', time: '10:30 AM', type: 'Video', reason: 'Follow-up consultation', status: 'Confirmed' },
    { id: 3, patient: 'Emma Davis', time: '02:00 PM', type: 'In-person', reason: 'Lab results discussion', status: 'Pending' },
    { id: 4, patient: 'John Smith', time: '03:30 PM', type: 'In-person', reason: 'Post-surgery checkup', status: 'Confirmed' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Appointments</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments.map((apt) => (
                <Card key={apt.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-primary" />
                          <span className="font-semibold">{apt.patient}</span>
                          <Badge variant={apt.status === 'Confirmed' ? 'default' : 'secondary'}>
                            {apt.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground ml-8">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {apt.time}
                          </div>
                          <div className="flex items-center gap-1">
                            {apt.type === 'Video' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                            {apt.type}
                          </div>
                        </div>
                        <p className="text-sm ml-8">{apt.reason}</p>
                      </div>
                      <div className="flex gap-2">
                        {apt.type === 'Video' && (
                          <Button size="sm">Join Call</Button>
                        )}
                        <Button size="sm" variant="outline">Reschedule</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Appointments</span>
                  <span className="font-semibold">4</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">In-person</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Video Calls</span>
                  <span className="font-semibold">1</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
