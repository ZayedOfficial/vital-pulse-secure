import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPatients from "./pages/admin/Patients";
import AdminDoctors from "./pages/admin/Doctors";
import AdminVitals from "./pages/admin/Vitals";
import AdminSettings from "./pages/admin/Settings";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorPatients from "./pages/doctor/Patients";
import DoctorAppointments from "./pages/doctor/Appointments";
import DoctorReports from "./pages/doctor/Reports";
import DoctorSettings from "./pages/doctor/Settings";
import PatientDashboard from "./pages/PatientDashboard";
import PatientHealth from "./pages/patient/Health";
import PatientAppointments from "./pages/patient/Appointments";
import PatientPrescriptions from "./pages/patient/Prescriptions";
import PatientSettings from "./pages/patient/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/patients" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPatients />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/doctors" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDoctors />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/vitals" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminVitals />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSettings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor" 
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/patients" 
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorPatients />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/appointments" 
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorAppointments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/reports" 
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorReports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/settings" 
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorSettings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/patient" 
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/patient/health" 
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientHealth />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/patient/appointments" 
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientAppointments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/patient/prescriptions" 
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientPrescriptions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/patient/settings" 
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientSettings />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
