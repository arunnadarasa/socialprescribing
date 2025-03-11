
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import AppointmentCard from '@/components/common/AppointmentCard';
import PageTransition from '@/components/layout/PageTransition';
import { mockAppointments } from '@/lib/data';

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Filter appointments by status
  const upcomingAppointments = mockAppointments.filter(a => a.status === 'upcoming');
  const completedAppointments = mockAppointments.filter(a => a.status === 'completed');
  const cancelledAppointments = mockAppointments.filter(a => a.status === 'cancelled');

  return (
    <PageTransition>
      <div className="space-y-6 pt-6 pb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
            <p className="text-muted-foreground">
              Manage and track all your social prescribing appointments
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="min-w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Button className="bg-nhs-blue hover:bg-nhs-darkblue text-white">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledAppointments.length})
            </TabsTrigger>
          </TabsList>
          
          <div className="flex justify-end">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="mental-health">Mental Health</SelectItem>
                <SelectItem value="physical-activity">Physical Activity</SelectItem>
                <SelectItem value="financial-support">Financial Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  id={appointment.id}
                  serviceName={appointment.serviceName}
                  date={appointment.date}
                  time={appointment.time}
                  duration={appointment.duration}
                  location={appointment.location}
                  status={appointment.status}
                  className="animate-fade-in"
                />
              ))}
              
              {upcomingAppointments.length === 0 && (
                <div className="col-span-full p-8 text-center">
                  <div className="text-muted-foreground mb-2">You have no upcoming appointments</div>
                  <Button 
                    variant="default"
                    className="bg-nhs-blue hover:bg-nhs-darkblue text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Book an Appointment
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {completedAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  id={appointment.id}
                  serviceName={appointment.serviceName}
                  date={appointment.date}
                  time={appointment.time}
                  duration={appointment.duration}
                  location={appointment.location}
                  status={appointment.status}
                  className="animate-fade-in"
                />
              ))}
              
              {completedAppointments.length === 0 && (
                <div className="col-span-full p-8 text-center">
                  <div className="text-muted-foreground">You have no completed appointments</div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="cancelled" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cancelledAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  id={appointment.id}
                  serviceName={appointment.serviceName}
                  date={appointment.date}
                  time={appointment.time}
                  duration={appointment.duration}
                  location={appointment.location}
                  status={appointment.status}
                  className="animate-fade-in"
                />
              ))}
              
              {cancelledAppointments.length === 0 && (
                <div className="col-span-full p-8 text-center">
                  <div className="text-muted-foreground">You have no cancelled appointments</div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Appointments;
