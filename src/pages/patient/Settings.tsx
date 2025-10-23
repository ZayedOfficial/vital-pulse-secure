import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

export default function PatientSettings() {
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [medicationReminders, setMedicationReminders] = useState(true);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input defaultValue="John Patient" />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input type="date" defaultValue="1990-01-15" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" defaultValue="patient@hospital.com" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input defaultValue="+1 (555) 123-4567" />
                </div>
                <div>
                  <Label>Emergency Contact</Label>
                  <Input placeholder="Name and phone number" />
                </div>
                <Button onClick={() => toast.success('Profile updated')} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Appointment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminded before appointments</p>
                  </div>
                  <Switch checked={appointmentReminders} onCheckedChange={setAppointmentReminders} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Medication Reminders</Label>
                    <p className="text-sm text-muted-foreground">Daily reminders to take medications</p>
                  </div>
                  <Switch checked={medicationReminders} onCheckedChange={setMedicationReminders} />
                </div>
                <Button onClick={() => toast.success('Preferences saved')} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage your password and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Current Password</Label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div>
                  <Label>New Password</Label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div>
                  <Label>Confirm New Password</Label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button onClick={() => toast.success('Password updated')} className="gap-2">
                  <Save className="h-4 w-4" />
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
