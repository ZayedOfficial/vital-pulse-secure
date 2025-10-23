import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Activity, Users, Shield, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'doctor':
          navigate('/doctor');
          break;
        case 'patient':
          navigate('/patient');
          break;
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-success/10">
      <nav className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Smart Healthcare System</span>
          </div>
          <Button onClick={() => navigate('/login')}>Sign In</Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-medical bg-clip-text text-transparent">
            Smart Healthcare Access Control
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced monitoring and management system for modern hospitals. Real-time vitals tracking, 
            role-based access, and comprehensive patient care.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" className="gap-2" onClick={() => navigate('/login')}>
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          <Card className="shadow-card hover:shadow-hover transition-shadow">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Real-Time Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                Track patient vitals 24/7 with instant alerts for critical changes
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-shadow">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold">Multi-Role Access</h3>
              <p className="text-sm text-muted-foreground">
                Secure dashboards for admins, doctors, and patients with tailored features
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-shadow">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-warning" />
              </div>
              <h3 className="font-semibold">Secure & Compliant</h3>
              <p className="text-sm text-muted-foreground">
                HIPAA-ready architecture with JWT authentication and encryption
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-shadow">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Comprehensive Care</h3>
              <p className="text-sm text-muted-foreground">
                Manage appointments, prescriptions, and patient records seamlessly
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-hover">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">System Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Admin Dashboard</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Hospital overview & analytics</li>
                  <li>• User management (doctors & patients)</li>
                  <li>• Live vitals monitoring</li>
                  <li>• Department statistics</li>
                  <li>• Bed & resource allocation</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Doctor Dashboard</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Assigned patient list</li>
                  <li>• Real-time vitals tracking</li>
                  <li>• Patient history & trends</li>
                  <li>• Appointment management</li>
                  <li>• Notes & prescriptions</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Patient Dashboard</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Personal health vitals</li>
                  <li>• Medication schedule</li>
                  <li>• Doctor's notes & reports</li>
                  <li>• Appointment booking</li>
                  <li>• Health trends visualization</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t mt-16 py-8 text-center text-muted-foreground">
        <p>Smart Healthcare Access Control System © 2025</p>
      </footer>
    </div>
  );
};

export default Index;
