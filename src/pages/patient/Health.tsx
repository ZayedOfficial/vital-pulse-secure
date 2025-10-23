import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VitalCard } from '@/components/VitalCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Heart, Activity, Droplet, Thermometer } from 'lucide-react';

export default function PatientHealth() {
  const currentVitals = {
    hr: 72,
    bp: '120/80',
    spo2: 98,
    temp: 36.8,
  };

  const hrData = [
    { time: '00:00', value: 68 },
    { time: '04:00', value: 65 },
    { time: '08:00', value: 72 },
    { time: '12:00', value: 75 },
    { time: '16:00', value: 78 },
    { time: '20:00', value: 72 },
  ];

  const bpData = [
    { time: '00:00', systolic: 118, diastolic: 78 },
    { time: '04:00', systolic: 115, diastolic: 75 },
    { time: '08:00', systolic: 120, diastolic: 80 },
    { time: '12:00', systolic: 122, diastolic: 82 },
    { time: '16:00', systolic: 125, diastolic: 85 },
    { time: '20:00', systolic: 120, diastolic: 80 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">My Health</h1>

        <div>
          <h2 className="text-lg font-semibold mb-4">Current Vitals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <VitalCard title="Heart Rate" value={currentVitals.hr} unit="bpm" icon={Heart} status="normal" />
            <VitalCard title="Blood Pressure" value={currentVitals.bp} unit="" icon={Activity} status="normal" />
            <VitalCard title="SpO₂" value={currentVitals.spo2} unit="%" icon={Droplet} status="normal" />
            <VitalCard title="Temperature" value={currentVitals.temp} unit="°C" icon={Thermometer} status="normal" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Heart Rate Trend (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={hrData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blood Pressure Trend (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={bpData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Line type="monotone" dataKey="systolic" stroke="hsl(var(--primary))" strokeWidth={2} name="Systolic" />
                  <Line type="monotone" dataKey="diastolic" stroke="hsl(var(--success))" strokeWidth={2} name="Diastolic" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Health Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">BMI</p>
                <p className="text-2xl font-bold">24.5</p>
                <p className="text-xs text-success">Normal</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blood Type</p>
                <p className="text-2xl font-bold">A+</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Allergies</p>
                <p className="text-sm">Penicillin</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Checkup</p>
                <p className="text-sm">Oct 15, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
