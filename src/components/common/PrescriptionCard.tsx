
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { File, FileCheck, Pill, CalendarClock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrescriptionCardProps {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending';
  items: string[];
  issueDate: string;
  expiryDate: string;
  instructions?: string;
  className?: string;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  id,
  name,
  status,
  items,
  issueDate,
  expiryDate,
  instructions,
  className,
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
        return 'bg-nhs-green/10 text-nhs-green border-nhs-green/20';
      case 'completed':
        return 'bg-nhs-blue/10 text-nhs-blue border-nhs-blue/20';
      case 'pending':
        return 'bg-nhs-orange/10 text-nhs-orange border-nhs-orange/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className={cn(
      "glass-card transition-all duration-300 hover:shadow-md overflow-hidden",
      className
    )}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className={getStatusStyles()}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
            <h3 className="text-base font-semibold mt-1">{name}</h3>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            {status === 'active' ? (
              <FileCheck size={16} className="text-primary" />
            ) : (
              <File size={16} className="text-primary" />
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 pb-3">
        <div className="mb-3">
          <div className="text-xs font-medium text-muted-foreground mb-1">Medications</div>
          <ul className="space-y-1">
            {items.map((item, i) => (
              <li key={i} className="flex items-center text-sm">
                <Pill size={14} className="mr-2 text-nhs-blue" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center gap-2 text-xs">
          <CalendarClock size={14} className="text-muted-foreground" />
          <span>
            {issueDate} - {expiryDate}
          </span>
        </div>
        
        {instructions && (
          <div className="mt-3 p-2 bg-muted/50 rounded-md text-xs flex items-start">
            <AlertCircle size={14} className="mr-2 shrink-0 mt-0.5 text-nhs-red" />
            <p>{instructions}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant={status === 'active' ? 'default' : 'outline'} 
          className={cn(
            "w-full", 
            status === 'active' && "bg-nhs-blue hover:bg-nhs-darkblue text-white"
          )}
        >
          {status === 'active' ? 'Request Refill' : 'View Details'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PrescriptionCard;
