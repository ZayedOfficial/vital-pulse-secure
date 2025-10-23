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

export default function DoctorSettings() {
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [patientUpdates, setPatientUpdates] = useState(true);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>Update your professional details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input defaultValue="Dr. Sarah Johnson" />
                </div>
                <div>
                  <Label>Specialization</Label>
                  <Input defaultValue="Cardiology" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" defaultValue="doctor@hospital.com" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input defaultValue="+1 (555) 987-6543" />
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
                <CardDescription>Manage your notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Appointment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get notified before appointments</p>
                  </div>
                  <Switch checked={appointmentReminders} onCheckedChange={setAppointmentReminders} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Patient Critical Updates</Label>
                    <p className="text-sm text-muted-foreground">Instant alerts for critical vitals</p>
                  </div>
                  <Switch checked={patientUpdates} onCheckedChange={setPatientUpdates} />
                </div>
                <Button onClick={() => toast.success('Preferences saved')} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and security</CardDescription>
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
