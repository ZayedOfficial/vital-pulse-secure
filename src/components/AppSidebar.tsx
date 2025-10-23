import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  UserCog,
  Activity,
  Calendar,
  FileText,
  Settings,
  Heart,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function AppSidebar() {
  const { state } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();

  const adminItems = [
    { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
    { title: 'Patients', url: '/admin/patients', icon: Users },
    { title: 'Doctors', url: '/admin/doctors', icon: UserCog },
    { title: 'Live Vitals', url: '/admin/vitals', icon: Activity },
    { title: 'Settings', url: '/admin/settings', icon: Settings },
  ];

  const doctorItems = [
    { title: 'Dashboard', url: '/doctor', icon: LayoutDashboard },
    { title: 'My Patients', url: '/doctor/patients', icon: Users },
    { title: 'Appointments', url: '/doctor/appointments', icon: Calendar },
    { title: 'Reports', url: '/doctor/reports', icon: FileText },
    { title: 'Settings', url: '/doctor/settings', icon: Settings },
  ];

  const patientItems = [
    { title: 'Dashboard', url: '/patient', icon: LayoutDashboard },
    { title: 'My Health', url: '/patient/health', icon: Activity },
    { title: 'Appointments', url: '/patient/appointments', icon: Calendar },
    { title: 'Prescriptions', url: '/patient/prescriptions', icon: FileText },
    { title: 'Settings', url: '/patient/settings', icon: Settings },
  ];

  let items = patientItems;
  if (user?.role === 'admin') items = adminItems;
  if (user?.role === 'doctor') items = doctorItems;

  const isActive = (path: string) => location.pathname === path;

  const collapsed = state === 'collapsed';
  
  return (
    <Sidebar className={collapsed ? 'w-16' : 'w-64'}>
      <div className="flex h-16 items-center justify-center border-b border-sidebar-border bg-sidebar">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-sidebar-foreground" />
            <span className="text-lg font-bold text-sidebar-foreground">HealthCare</span>
          </div>
        )}
        {collapsed && <Heart className="h-6 w-6 text-sidebar-foreground" />}
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {!collapsed && 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
