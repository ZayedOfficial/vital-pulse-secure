import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  patients: number;
  email: string;
  phone: string;
  status: string;
}

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: 'D001', name: 'Dr. Sarah Johnson', specialization: 'Cardiology', patients: 12, email: 'sarah.j@hospital.com', phone: '+1 234-567-8901', status: 'Active' },
    { id: 'D002', name: 'Dr. Michael Brown', specialization: 'General Medicine', patients: 18, email: 'michael.b@hospital.com', phone: '+1 234-567-8902', status: 'Active' },
    { id: 'D003', name: 'Dr. Jennifer Lee', specialization: 'Pediatrics', patients: 15, email: 'jennifer.l@hospital.com', phone: '+1 234-567-8903', status: 'Active' },
    { id: 'D004', name: 'Dr. David Wilson', specialization: 'Neurology', patients: 8, email: 'david.w@hospital.com', phone: '+1 234-567-8904', status: 'On Leave' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({ name: '', specialization: '', email: '', phone: '' });

  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = () => {
    if (!newDoctor.name || !newDoctor.specialization || !newDoctor.email) {
      toast.error('Please fill all required fields');
      return;
    }
    const doctor: Doctor = {
      id: `D${String(doctors.length + 1).padStart(3, '0')}`,
      name: newDoctor.name,
      specialization: newDoctor.specialization,
      patients: 0,
      email: newDoctor.email,
      phone: newDoctor.phone || 'N/A',
      status: 'Active'
    };
    setDoctors([...doctors, doctor]);
    setNewDoctor({ name: '', specialization: '', email: '', phone: '' });
    setIsDialogOpen(false);
    toast.success('Doctor added successfully');
  };

  const handleDeleteDoctor = (id: string) => {
    setDoctors(doctors.filter(d => d.id !== id));
    toast.success('Doctor removed');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Doctor Management</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Doctor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Doctor</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input value={newDoctor.name} onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})} placeholder="Dr. John Doe" />
                </div>
                <div>
                  <Label>Specialization</Label>
                  <Select value={newDoctor.specialization} onValueChange={(v) => setNewDoctor({...newDoctor, specialization: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="General Medicine">General Medicine</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="Neurology">Neurology</SelectItem>
                      <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="Dermatology">Dermatology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={newDoctor.email} onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})} placeholder="doctor@hospital.com" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={newDoctor.phone} onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})} placeholder="+1 234-567-8900" />
                </div>
                <Button onClick={handleAddDoctor} className="w-full">Add Doctor</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by name or specialization..." 
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
                  <TableHead>Specialization</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">{doctor.id}</TableCell>
                    <TableCell>{doctor.name}</TableCell>
                    <TableCell>{doctor.specialization}</TableCell>
                    <TableCell>{doctor.patients}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.phone}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        doctor.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                      }`}>
                        {doctor.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteDoctor(doctor.id)}>
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
