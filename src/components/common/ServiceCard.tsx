
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Map, CalendarClock, Phone, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  address: string;
  distance?: string;
  contactPhone?: string;
  availability?: string[];
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  category,
  description,
  address,
  distance,
  contactPhone,
  availability,
  className,
}) => {
  const getCategoryColor = () => {
    switch (category.toLowerCase()) {
      case 'mental health':
        return 'bg-nhs-purple/10 text-nhs-purple border-nhs-purple/20';
      case 'physical activity':
        return 'bg-nhs-green/10 text-nhs-green border-nhs-green/20';
      case 'social activity':
        return 'bg-nhs-orange/10 text-nhs-orange border-nhs-orange/20';
      case 'financial support':
        return 'bg-nhs-yellow/10 text-nhs-yellow border-nhs-yellow/20';
      default:
        return 'bg-nhs-blue/10 text-nhs-blue border-nhs-blue/20';
    }
  };

  return (
    <Card className={cn("glass-card overflow-hidden transition-all duration-300 hover:shadow-lg", className)}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className={cn("mb-2", getCategoryColor())}>
              {category}
            </Badge>
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          </div>
          {distance && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Map size={12} className="mr-1" />
              <span>{distance}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <Map size={16} className="shrink-0 mt-0.5 text-muted-foreground" />
            <span className="text-foreground/80">{address}</span>
          </div>
          
          {contactPhone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} className="shrink-0 text-muted-foreground" />
              <span className="text-foreground/80">{contactPhone}</span>
            </div>
          )}
          
          {availability && availability.length > 0 && (
            <div className="flex items-start gap-2 text-sm">
              <CalendarClock size={16} className="shrink-0 mt-0.5 text-muted-foreground" />
              <div>
                {availability.map((time, i) => (
                  <div key={i} className="text-foreground/80">{time}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button variant="default" className="w-full bg-nhs-blue hover:bg-nhs-darkblue text-white transition-colors">
          Book
        </Button>
        <Button variant="outline" size="icon" className="shrink-0">
          <ExternalLink size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
