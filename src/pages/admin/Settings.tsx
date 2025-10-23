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

export default function AdminSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const handleSaveGeneral = () => {
    toast.success('General settings saved');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved');
  };

  const handleSaveSecurity = () => {
    toast.success('Security settings updated');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">System Settings</h1>

        <Tabs defaultValue="general" className="w-full">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hospital Information</CardTitle>
                <CardDescription>Update your hospital's basic information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Hospital Name</Label>
                  <Input defaultValue="City General Hospital" />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input defaultValue="123 Healthcare Ave, Medical District" />
                </div>
                <div>
                  <Label>Contact Email</Label>
                  <Input type="email" defaultValue="admin@cityhospital.com" />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input defaultValue="+1 (555) 123-4567" />
                </div>
                <Button onClick={handleSaveGeneral} className="gap-2">
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
                <CardDescription>Manage how you receive alerts and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Critical Alerts</Label>
                    <p className="text-sm text-muted-foreground">Instant alerts for critical patient conditions</p>
                  </div>
                  <Switch checked={criticalAlerts} onCheckedChange={setCriticalAlerts} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Backup</Label>
                    <p className="text-sm text-muted-foreground">Automatically backup data daily</p>
                  </div>
                  <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                </div>
                <Button onClick={handleSaveNotifications} className="gap-2">
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
                <CardDescription>Manage security and access control</CardDescription>
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
                <Button onClick={handleSaveSecurity} className="gap-2">
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
