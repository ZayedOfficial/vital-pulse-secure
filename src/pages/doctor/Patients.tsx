import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VitalCard } from '@/components/VitalCard';
import { Search, FileText, Heart, Activity, Droplet, Thermometer } from 'lucide-react';

export default function DoctorPatients() {
  const [searchTerm, setSearchTerm] = useState('');
  const patients = [
    { id: 'P001', name: 'John Smith', age: 45, ward: 'ICU', condition: 'Post-surgery recovery', hr: 118, bp: '145/92', spo2: 94, temp: 38.2, status: 'Critical' },
    { id: 'P003', name: 'Robert Wilson', age: 67, ward: 'Cardiology', condition: 'Cardiac monitoring', hr: 88, bp: '130/85', spo2: 96, temp: 37.1, status: 'Stable' },
    { id: 'P007', name: 'Patricia Moore', age: 52, ward: 'General', condition: 'Hypertension management', hr: 75, bp: '128/82', spo2: 98, temp: 36.9, status: 'Stable' },
  ];

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">My Patients</h1>
          <div className="flex items-center gap-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search patients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{patient.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {patient.id} • {patient.age} years • {patient.ward}
                    </p>
                    <p className="text-sm text-foreground mt-2">{patient.condition}</p>
                  </div>
                  <Badge variant={patient.status === 'Critical' ? 'destructive' : 'default'}>
                    {patient.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <VitalCard 
                    title="Heart Rate"
                    value={patient.hr}
                    unit="bpm"
                    icon={Heart}
                    status={patient.hr > 100 ? 'critical' : 'normal'}
                  />
                  <VitalCard 
                    title="Blood Pressure"
                    value={patient.bp}
                    unit=""
                    icon={Activity}
                    status="normal"
                  />
                  <VitalCard 
                    title="SpO₂"
                    value={patient.spo2}
                    unit="%"
                    icon={Droplet}
                    status={patient.spo2 < 95 ? 'critical' : 'normal'}
                  />
                  <VitalCard 
                    title="Temperature"
                    value={patient.temp}
                    unit="°C"
                    icon={Thermometer}
                    status={patient.temp > 38 ? 'critical' : 'normal'}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    View Details
                  </Button>
                  <Button variant="outline">Add Notes</Button>
                  <Button>Prescribe</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
