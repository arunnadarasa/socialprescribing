
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name: string;
  role?: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  name, 
  role, 
  imageUrl, 
  size = 'md',
  className
}) => {
  const getInitials = (fullName: string) => {
    const names = fullName.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0].slice(0, 2).toUpperCase();
  };
  
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };
  
  const getRoleColor = () => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-nhs-red/10 text-nhs-red';
      case 'pharmacist':
        return 'bg-nhs-green/10 text-nhs-green';
      case 'social prescriber':
        return 'bg-nhs-purple/10 text-nhs-purple';
      case 'patient':
      default:
        return 'bg-nhs-blue/10 text-nhs-blue';
    }
  };
  
  return (
    <div className="relative inline-block">
      <Avatar className={cn(sizeClasses[size], "ring-2 ring-background", className)}>
        <AvatarImage 
          src={imageUrl} 
          alt={name} 
          className="object-cover transition-opacity"
          loading="lazy"
        />
        <AvatarFallback className="bg-secondary">
          {imageUrl ? <User className="h-4 w-4" /> : getInitials(name)}
        </AvatarFallback>
      </Avatar>
      
      {role && size === 'lg' && (
        <div className={cn(
          "absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-xs font-medium",
          getRoleColor()
        )}>
          {role}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
