
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  CalendarClock, 
  Search, 
  UserRound, 
  PieChart, 
  Users, 
  FileText, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isOpen: boolean;
}

// Navigation items by role
const patientNavItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Services', path: '/services', icon: Search },
  { name: 'Appointments', path: '/appointments', icon: CalendarClock },
  { name: 'Profile', path: '/profile', icon: UserRound },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Currently using patient role as default
  const navItems = patientNavItems;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen pt-16 transition-transform duration-300 ease-in-out",
        "bg-sidebar backdrop-blur-md border-r border-sidebar-border",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        "w-64 shrink-0"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-10 w-10 rounded-full bg-nhs-blue/10 text-nhs-blue flex items-center justify-center">
              <UserRound size={20} />
            </div>
            <div>
              <p className="font-medium text-sm">Patient Demo</p>
              <p className="text-xs text-muted-foreground">patient@example.com</p>
            </div>
          </div>
          
          <div className="space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                  currentPath === item.path 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground/80 hover:text-sidebar-foreground"
                )}
              >
                <item.icon size={18} className="shrink-0" />
                <span>{item.name}</span>
                
                {item.name === 'Appointments' && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-nhs-red/10 text-nhs-red text-xs font-medium">
                    2
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
        
        <Separator className="my-4 bg-sidebar-border/50" />
        
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-4">
            <h3 className="text-xs font-semibold text-sidebar-foreground/70 uppercase mb-2 tracking-wider">
              Recent Services
            </h3>
            <ul className="space-y-2">
              {['Mental Health Support', 'Physical Activity Group', 'Community Garden Project'].map((service, index) => (
                <li 
                  key={index}
                  className="text-sm text-sidebar-foreground/90 hover:text-sidebar-foreground cursor-pointer"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="p-4 mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground"
          >
            <LogOut size={18} className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
