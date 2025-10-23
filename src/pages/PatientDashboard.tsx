import { DashboardLayout } from '@/components/DashboardLayout';
import { VitalCard } from '@/components/VitalCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Activity, Thermometer, Droplets, Wind, Calendar, Pill, FileText, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const currentVitals = {
  hr: 72,
  bp: '120/80',
  spo2: 98,
  temp: 36.8,
  resp: 16,
};

const vitalHistory = [
  { date: '1 week ago', hr: 68, spo2: 97, temp: 36.5 },
  { date: '5 days ago', hr: 70, spo2: 98, temp: 36.7 },
  { date: '3 days ago', hr: 71, spo2: 98, temp: 36.6 },
  { date: '1 day ago', hr: 73, spo2: 97, temp: 36.9 },
  { date: 'Today', hr: 72, spo2: 98, temp: 36.8 },
];

const upcomingAppointments = [
  { date: 'Tomorrow, 10:00 AM', doctor: 'Dr. Sarah Johnson', type: 'Follow-up', location: 'Room 204' },
  { date: 'Jan 28, 2:30 PM', doctor: 'Dr. Michael Chen', type: 'Lab Results', location: 'Room 105' },
];

const medications = [
  { name: 'Aspirin', dosage: '100mg', frequency: 'Once daily', time: '8:00 AM' },
  { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', time: '8:00 AM' },
  { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', time: '8:00 AM, 8:00 PM' },
];

const doctorNotes = [
  { date: 'Jan 20, 2025', note: 'Patient showing good recovery. Continue current medication. Monitor blood pressure regularly.' },
  { date: 'Jan 15, 2025', note: 'Adjusted medication dosage. Schedule follow-up in one week for lab results review.' },
];

export default function PatientDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome Back, John</h1>
            <p className="text-muted-foreground">Here's your health overview</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="shadow-card md:col-span-2">
            <CardHeader>
              <CardTitle>Current Vitals</CardTitle>
              <CardDescription>Last updated: 5 minutes ago</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <VitalCard
                  title="Heart Rate"
                  value={currentVitals.hr}
                  unit="bpm"
                  icon={Heart}
                  status="normal"
                  trend="stable"
                />
                <VitalCard
                  title="Blood Pressure"
                  value={currentVitals.bp}
                  unit="mmHg"
                  icon={Activity}
                  status="normal"
                  trend="stable"
                />
                <VitalCard
                  title="SpO₂"
                  value={currentVitals.spo2}
                  unit="%"
                  icon={Droplets}
                  status="normal"
                  trend="stable"
                />
                <VitalCard
                  title="Temperature"
                  value={currentVitals.temp}
                  unit="°C"
                  icon={Thermometer}
                  status="normal"
                  trend="stable"
                />
                <VitalCard
                  title="Respiration"
                  value={currentVitals.resp}
                  unit="/min"
                  icon={Wind}
                  status="normal"
                  trend="stable"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Your Doctor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">SJ</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Dr. Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">Cardiologist</p>
                  <p className="text-xs text-muted-foreground mt-1">15 years experience</p>
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">+1 (555) 123-4567</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">s.johnson@hospital.com</span>
                </div>
              </div>
              <Button className="w-full mt-4">Message Doctor</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Vitals Trend</CardTitle>
              <CardDescription>Your health metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={vitalHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Line type="monotone" dataKey="hr" stroke="hsl(var(--primary))" name="Heart Rate" strokeWidth={2} />
                  <Line type="monotone" dataKey="spo2" stroke="hsl(var(--success))" name="SpO₂" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((apt, idx) => (
                <div key={idx} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{apt.date}</p>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {apt.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{apt.doctor}</p>
                  <p className="text-xs text-muted-foreground">{apt.location}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full">View All Appointments</Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />
                Current Medications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {medications.map((med, idx) => (
                <div key={idx} className="border-l-4 border-primary pl-4 py-2">
                  <p className="font-semibold">{med.name}</p>
                  <p className="text-sm text-muted-foreground">{med.dosage} - {med.frequency}</p>
                  <p className="text-xs text-muted-foreground mt-1">Take at: {med.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Doctor's Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {doctorNotes.map((note, idx) => (
                <div key={idx} className="space-y-2 pb-4 border-b last:border-0">
                  <p className="text-sm font-medium text-muted-foreground">{note.date}</p>
                  <p className="text-sm">{note.note}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
