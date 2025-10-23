import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCog, Bed, Calendar, Activity, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const vitalsData = [
  { time: '00:00', avgHR: 72, avgBP: 120, avgSpO2: 98 },
  { time: '04:00', avgHR: 68, avgBP: 118, avgSpO2: 98 },
  { time: '08:00', avgHR: 75, avgBP: 122, avgSpO2: 97 },
  { time: '12:00', avgHR: 78, avgBP: 125, avgSpO2: 97 },
  { time: '16:00', avgHR: 76, avgBP: 123, avgSpO2: 98 },
  { time: '20:00', avgHR: 74, avgBP: 121, avgSpO2: 98 },
];

const departmentData = [
  { name: 'Cardiology', patients: 45, color: '#06B6D4' },
  { name: 'Neurology', patients: 32, color: '#10B981' },
  { name: 'Orthopedics', patients: 28, color: '#F59E0B' },
  { name: 'Pediatrics', patients: 38, color: '#8B5CF6' },
  { name: 'Emergency', patients: 15, color: '#EF4444' },
];

const monthlyAdmissions = [
  { month: 'Jan', admissions: 245 },
  { month: 'Feb', admissions: 268 },
  { month: 'Mar', admissions: 289 },
  { month: 'Apr', admissions: 312 },
  { month: 'May', admissions: 298 },
  { month: 'Jun', admissions: 325 },
];

const recentPatients = [
  { id: '1', name: 'John Smith', age: 45, condition: 'Stable', hr: 72, bp: '120/80', spo2: 98, temp: 36.8 },
  { id: '2', name: 'Sarah Johnson', age: 32, condition: 'Critical', hr: 95, bp: '140/90', spo2: 94, temp: 37.5 },
  { id: '3', name: 'Mike Wilson', age: 58, condition: 'Stable', hr: 68, bp: '115/75', spo2: 99, temp: 36.5 },
  { id: '4', name: 'Emily Davis', age: 28, condition: 'Monitoring', hr: 88, bp: '125/85', spo2: 96, temp: 37.2 },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Hospital management and monitoring</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Patients"
            value="158"
            description="Active patients"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Doctors"
            value="42"
            description="On duty today"
            icon={UserCog}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Available Beds"
            value="67"
            description="Out of 200 beds"
            icon={Bed}
          />
          <StatCard
            title="Today's Appointments"
            value="84"
            description="Scheduled appointments"
            icon={Calendar}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Average Vitals Trend</CardTitle>
              <CardDescription>24-hour patient vitals monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={vitalsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Legend />
                  <Line type="monotone" dataKey="avgHR" stroke="hsl(var(--primary))" name="Heart Rate" strokeWidth={2} />
                  <Line type="monotone" dataKey="avgSpO2" stroke="hsl(var(--success))" name="SpO₂" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Patient Distribution</CardTitle>
              <CardDescription>By department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => `${entry.name}: ${(entry.percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="patients"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card md:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Admissions</CardTitle>
              <CardDescription>Patient admissions over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyAdmissions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Bar dataKey="admissions" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Live Patient Vitals Monitoring
            </CardTitle>
            <CardDescription>Real-time monitoring of critical patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Patient</th>
                    <th className="text-left p-4 font-medium">Age</th>
                    <th className="text-left p-4 font-medium">Condition</th>
                    <th className="text-center p-4 font-medium">HR (bpm)</th>
                    <th className="text-center p-4 font-medium">BP (mmHg)</th>
                    <th className="text-center p-4 font-medium">SpO₂ (%)</th>
                    <th className="text-center p-4 font-medium">Temp (°C)</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPatients.map((patient) => (
                    <tr key={patient.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-medium">{patient.name}</td>
                      <td className="p-4">{patient.age}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          patient.condition === 'Stable' ? 'bg-success/10 text-success' :
                          patient.condition === 'Critical' ? 'bg-destructive/10 text-destructive' :
                          'bg-warning/10 text-warning'
                        }`}>
                          {patient.condition}
                        </span>
                      </td>
                      <td className={`p-4 text-center ${patient.hr > 90 ? 'text-warning font-semibold' : ''}`}>
                        {patient.hr}
                      </td>
                      <td className={`p-4 text-center ${patient.bp.startsWith('140') ? 'text-warning font-semibold' : ''}`}>
                        {patient.bp}
                      </td>
                      <td className={`p-4 text-center ${patient.spo2 < 95 ? 'text-destructive font-semibold' : ''}`}>
                        {patient.spo2}
                      </td>
                      <td className={`p-4 text-center ${patient.temp > 37.2 ? 'text-warning font-semibold' : ''}`}>
                        {patient.temp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
