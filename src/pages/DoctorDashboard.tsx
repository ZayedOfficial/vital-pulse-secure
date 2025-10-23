import { DashboardLayout } from '@/components/DashboardLayout';
import { VitalCard } from '@/components/VitalCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Activity, Thermometer, Droplets, Wind, TrendingUp, FileText, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Badge } from '@/components/ui/badge';

const myPatients = [
  { 
    id: '1', 
    name: 'John Smith', 
    age: 45, 
    condition: 'Post-operative',
    hr: 72, 
    bp: '120/80', 
    spo2: 98, 
    temp: 36.8,
    resp: 16,
    lastUpdated: '2 mins ago'
  },
  { 
    id: '2', 
    name: 'Mary Johnson', 
    age: 62, 
    condition: 'Cardiac Monitoring',
    hr: 88, 
    bp: '135/85', 
    spo2: 96, 
    temp: 37.1,
    resp: 18,
    lastUpdated: '5 mins ago'
  },
  { 
    id: '3', 
    name: 'Robert Williams', 
    age: 38, 
    condition: 'Pneumonia Recovery',
    hr: 76, 
    bp: '118/76', 
    spo2: 94, 
    temp: 37.8,
    resp: 22,
    lastUpdated: '1 min ago'
  },
];

const heartRateHistory = [
  { time: '00:00', hr: 68 },
  { time: '04:00', hr: 65 },
  { time: '08:00', hr: 72 },
  { time: '12:00', hr: 75 },
  { time: '16:00', hr: 73 },
  { time: '20:00', hr: 70 },
  { time: 'Now', hr: 72 },
];

const appointmentsToday = [
  { time: '09:00 AM', patient: 'Alice Brown', type: 'Follow-up' },
  { time: '10:30 AM', patient: 'David Miller', type: 'Initial Consultation' },
  { time: '02:00 PM', patient: 'Emma Wilson', type: 'Review Results' },
  { time: '04:00 PM', patient: 'James Taylor', type: 'Post-op Check' },
];

export default function DoctorDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Monitor your patients and manage appointments</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Patients</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myPatients.length}</div>
              <p className="text-xs text-muted-foreground">Active patients</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointmentsToday.length}</div>
              <p className="text-xs text-muted-foreground">Scheduled for today</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
              <TrendingUp className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-warning">Needs attention</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reports Pending</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">To be reviewed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>Your schedule for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointmentsToday.map((apt, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{apt.patient}</p>
                    <p className="text-sm text-muted-foreground">{apt.type}</p>
                  </div>
                  <Badge variant="outline">{apt.time}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Patient Vitals Trend</CardTitle>
              <CardDescription>Heart rate over 24 hours - John Smith</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={heartRateHistory}>
                  <defs>
                    <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" domain={[60, 80]} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Area type="monotone" dataKey="hr" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorHr)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>My Patients - Live Vitals</CardTitle>
            <CardDescription>Real-time monitoring of assigned patients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {myPatients.map((patient) => (
              <div key={patient.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">Age: {patient.age} | {patient.condition}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Updated {patient.lastUpdated}
                    </Badge>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  <VitalCard
                    title="Heart Rate"
                    value={patient.hr}
                    unit="bpm"
                    icon={Heart}
                    status={patient.hr > 90 ? 'warning' : 'normal'}
                  />
                  <VitalCard
                    title="Blood Pressure"
                    value={patient.bp}
                    unit="mmHg"
                    icon={Activity}
                    status={patient.bp.startsWith('135') ? 'warning' : 'normal'}
                  />
                  <VitalCard
                    title="SpO₂"
                    value={patient.spo2}
                    unit="%"
                    icon={Droplets}
                    status={patient.spo2 < 95 ? 'warning' : 'normal'}
                  />
                  <VitalCard
                    title="Temperature"
                    value={patient.temp}
                    unit="°C"
                    icon={Thermometer}
                    status={patient.temp > 37.5 ? 'warning' : 'normal'}
                  />
                  <VitalCard
                    title="Respiration"
                    value={patient.resp}
                    unit="/min"
                    icon={Wind}
                    status={patient.resp > 20 ? 'warning' : 'normal'}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
