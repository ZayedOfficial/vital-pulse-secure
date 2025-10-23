import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  ward: string;
  doctor: string;
  admission: string;
  status: string;
}

export default function AdminPatients() {
  const [patients, setPatients] = useState<Patient[]>([
    { id: 'P001', name: 'John Smith', age: 45, gender: 'Male', ward: 'ICU', doctor: 'Dr. Sarah Johnson', admission: '2025-10-20', status: 'Critical' },
    { id: 'P002', name: 'Emily Davis', age: 32, gender: 'Female', ward: 'General', doctor: 'Dr. Michael Brown', admission: '2025-10-21', status: 'Stable' },
    { id: 'P003', name: 'Robert Wilson', age: 67, gender: 'Male', ward: 'Cardiology', doctor: 'Dr. Sarah Johnson', admission: '2025-10-19', status: 'Stable' },
    { id: 'P004', name: 'Lisa Anderson', age: 28, gender: 'Female', ward: 'Maternity', doctor: 'Dr. Jennifer Lee', admission: '2025-10-22', status: 'Good' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '', ward: '', doctor: '' });

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.age || !newPatient.gender || !newPatient.ward) {
      toast.error('Please fill all required fields');
      return;
    }
    const patient: Patient = {
      id: `P${String(patients.length + 1).padStart(3, '0')}`,
      name: newPatient.name,
      age: parseInt(newPatient.age),
      gender: newPatient.gender,
      ward: newPatient.ward,
      doctor: newPatient.doctor || 'Unassigned',
      admission: new Date().toISOString().split('T')[0],
      status: 'Stable'
    };
    setPatients([...patients, patient]);
    setNewPatient({ name: '', age: '', gender: '', ward: '', doctor: '' });
    setIsDialogOpen(false);
    toast.success('Patient added successfully');
  };

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter(p => p.id !== id));
    toast.success('Patient removed');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Patient Management</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input value={newPatient.name} onChange={(e) => setNewPatient({...newPatient, name: e.target.value})} placeholder="John Doe" />
                </div>
                <div>
                  <Label>Age</Label>
                  <Input type="number" value={newPatient.age} onChange={(e) => setNewPatient({...newPatient, age: e.target.value})} placeholder="45" />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select value={newPatient.gender} onValueChange={(v) => setNewPatient({...newPatient, gender: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Ward</Label>
                  <Select value={newPatient.ward} onValueChange={(v) => setNewPatient({...newPatient, ward: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ward" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ICU">ICU</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Maternity">Maternity</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Assign Doctor (Optional)</Label>
                  <Input value={newPatient.doctor} onChange={(e) => setNewPatient({...newPatient, doctor: e.target.value})} placeholder="Dr. Name" />
                </div>
                <Button onClick={handleAddPatient} className="w-full">Add Patient</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by name or ID..." 
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
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Ward</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Admission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.ward}</TableCell>
                    <TableCell>{patient.doctor}</TableCell>
                    <TableCell>{patient.admission}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        patient.status === 'Critical' ? 'bg-destructive/10 text-destructive' :
                        patient.status === 'Stable' ? 'bg-success/10 text-success' :
                        'bg-primary/10 text-primary'
                      }`}>
                        {patient.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeletePatient(patient.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
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
