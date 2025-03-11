
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  X 
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import UserAvatar from '../common/UserAvatar';
import { cn } from '@/lib/utils';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  // Get page title based on current location
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/services':
        return 'Service Directory';
      case '/appointments':
        return 'Appointments';
      case '/profile':
        return 'Profile';
      default:
        return 'Social Prescribing Platform';
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md transition-all duration-300 border-b",
        scrolled ? "border-border/50 shadow-sm" : "border-transparent"
      )}
    >
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="focus-ring"
          >
            {sidebarOpen && isMobile ? <X size={20} /> : <Menu size={20} />}
          </Button>
          
          <div className="hidden md:block">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-nhs-blue flex items-center justify-center">
                <span className="text-white font-semibold text-xs">NHS</span>
              </div>
              <h1 className="text-lg font-medium">
                <span className="text-nhs-blue font-semibold">Social</span> Prescribing
              </h1>
            </Link>
          </div>
          
          <div className="md:hidden">
            <h2 className="text-base font-medium">{getPageTitle()}</h2>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="focus-ring">
            <Search size={20} />
          </Button>
          
          <Button variant="ghost" size="icon" className="focus-ring relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-nhs-red animate-pulse"></span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="focus-ring"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <UserAvatar 
            name="Patient Demo" 
            role="Patient"
            imageUrl="/placeholder.svg"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
