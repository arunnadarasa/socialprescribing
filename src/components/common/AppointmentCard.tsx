
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, MapPin, Clock, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface AppointmentCardProps {
  id: string;
  serviceName: string;
  date: Date;
  time: string;
  duration: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  className?: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  id,
  serviceName,
  date,
  time,
  duration,
  location,
  status,
  className,
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'upcoming':
        return 'bg-nhs-green/10 text-nhs-green border-nhs-green/20';
      case 'completed':
        return 'bg-nhs-blue/10 text-nhs-blue border-nhs-blue/20';
      case 'cancelled':
        return 'bg-nhs-red/10 text-nhs-red border-nhs-red/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formattedDate = format(date, 'EEE, d MMMM yyyy');
  const isUpcoming = status === 'upcoming';

  return (
    <Card className={cn(
      "glass-card transition-all duration-300 hover:shadow-md overflow-hidden",
      status === 'cancelled' && "opacity-70",
      className
    )}>
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <div>
          <Badge variant="outline" className={getStatusStyles()}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          <h3 className="font-semibold mt-1 text-base">{serviceName}</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical size={16} />
        </Button>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 pb-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <CalendarClock size={16} className="text-muted-foreground" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-muted-foreground" />
            <span>{time} • {duration}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={16} className="text-muted-foreground" />
            <span className="text-foreground/80">{location}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        {isUpcoming ? (
          <>
            <Button variant="default" className="w-full bg-nhs-blue hover:bg-nhs-darkblue text-white">
              Directions
            </Button>
            <Button variant="outline" className="w-full">
              Reschedule
            </Button>
          </>
        ) : (
          <Button variant="outline" className="w-full">
            {status === 'completed' ? 'Leave Feedback' : 'Book Again'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AppointmentCard;
