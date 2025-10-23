import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Activity } from 'lucide-react';

export default function AdminVitals() {
  const [searchTerm, setSearchTerm] = useState('');
  const vitalsData = [
    { id: 'P001', name: 'John Smith', ward: 'ICU', hr: 118, bp: '145/92', spo2: 94, temp: 38.2, rr: 22, status: 'Critical' },
    { id: 'P002', name: 'Emily Davis', ward: 'General', hr: 72, bp: '120/80', spo2: 98, temp: 36.8, rr: 16, status: 'Stable' },
    { id: 'P003', name: 'Robert Wilson', ward: 'Cardiology', hr: 88, bp: '130/85', spo2: 96, temp: 37.1, rr: 18, status: 'Stable' },
    { id: 'P004', name: 'Lisa Anderson', ward: 'Maternity', hr: 76, bp: '118/76', spo2: 99, temp: 36.9, rr: 15, status: 'Good' },
    { id: 'P005', name: 'Michael Chen', ward: 'ICU', hr: 125, bp: '150/95', spo2: 91, temp: 38.8, rr: 24, status: 'Critical' },
    { id: 'P006', name: 'Sarah Thompson', ward: 'Pediatrics', hr: 95, bp: '110/70', spo2: 97, temp: 37.5, rr: 20, status: 'Stable' },
  ];

  const filteredVitals = vitalsData.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.ward.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getVitalStatus = (vital: string, value: number) => {
    if (vital === 'hr') {
      if (value > 100 || value < 60) return 'text-destructive';
      return 'text-success';
    }
    if (vital === 'spo2') {
      if (value < 95) return 'text-destructive';
      return 'text-success';
    }
    if (vital === 'temp') {
      if (value > 38 || value < 36) return 'text-destructive';
      return 'text-success';
    }
    if (vital === 'rr') {
      if (value > 20 || value < 12) return 'text-destructive';
      return 'text-success';
    }
    return 'text-foreground';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Live Patient Vitals</h1>
          <Badge variant="outline" className="gap-2">
            <Activity className="h-3 w-3 animate-pulse text-success" />
            Live Monitoring
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by patient name, ID, or ward..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Ward</TableHead>
                  <TableHead>HR (bpm)</TableHead>
                  <TableHead>BP (mmHg)</TableHead>
                  <TableHead>SpO₂ (%)</TableHead>
                  <TableHead>Temp (°C)</TableHead>
                  <TableHead>RR (bpm)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVitals.map((vital) => (
                  <TableRow key={vital.id}>
                    <TableCell className="font-medium">{vital.id}</TableCell>
                    <TableCell>{vital.name}</TableCell>
                    <TableCell>{vital.ward}</TableCell>
                    <TableCell className={getVitalStatus('hr', vital.hr)}>{vital.hr}</TableCell>
                    <TableCell>{vital.bp}</TableCell>
                    <TableCell className={getVitalStatus('spo2', vital.spo2)}>{vital.spo2}</TableCell>
                    <TableCell className={getVitalStatus('temp', vital.temp)}>{vital.temp}</TableCell>
                    <TableCell className={getVitalStatus('rr', vital.rr)}>{vital.rr}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        vital.status === 'Critical' ? 'bg-destructive/10 text-destructive' :
                        vital.status === 'Stable' ? 'bg-success/10 text-success' :
                        'bg-primary/10 text-primary'
                      }`}>
                        {vital.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
