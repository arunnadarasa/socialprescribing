
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarClock, Search, FileText, Plus } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import PrescriptionCard from '@/components/common/PrescriptionCard';
import AppointmentCard from '@/components/common/AppointmentCard';
import ServiceCard from '@/components/common/ServiceCard';
import { mockAppointments, mockPrescriptions, mockServices } from '@/lib/data';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Get recent items
  const upcomingAppointments = mockAppointments.filter(a => a.status === 'upcoming').slice(0, 2);
  const activePrescriptions = mockPrescriptions.filter(p => p.status === 'active').slice(0, 2);
  const recommendedServices = mockServices.slice(0, 3);

  return (
    <PageTransition>
      <div className="space-y-6 pt-6 pb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back to your health dashboard
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <Button size="sm" className="h-9 bg-nhs-blue hover:bg-nhs-darkblue text-white">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>

        <Tabs 
          defaultValue="overview" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="text-sm font-medium">Prescriptions</div>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activePrescriptions.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Active prescriptions
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="text-sm font-medium">Appointments</div>
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Upcoming appointments
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="text-sm font-medium">Wellbeing Score</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7.4</div>
                  <p className="text-xs text-muted-foreground">
                    +1.2 from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Appointments */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold tracking-tight">Upcoming Appointments</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveTab('appointments')}
                  className="text-sm text-muted-foreground"
                >
                  View all
                </Button>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
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
                  />
                ))}
              </div>
            </div>
            
            {/* Active Prescriptions */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold tracking-tight">Active Prescriptions</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveTab('prescriptions')}
                  className="text-sm text-muted-foreground"
                >
                  View all
                </Button>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {activePrescriptions.map((prescription) => (
                  <PrescriptionCard
                    key={prescription.id}
                    id={prescription.id}
                    name={prescription.name}
                    status={prescription.status}
                    items={prescription.items}
                    issueDate={prescription.issueDate}
                    expiryDate={prescription.expiryDate}
                    instructions={prescription.instructions}
                  />
                ))}
              </div>
            </div>
            
            {/* Recommended Services */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold tracking-tight">Recommended Services</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveTab('services')}
                  className="text-sm text-muted-foreground"
                >
                  View all
                </Button>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {recommendedServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    title={service.title}
                    category={service.category}
                    description={service.description}
                    address={service.address}
                    distance={service.distance}
                    contactPhone={service.contactPhone}
                    availability={service.availability}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="prescriptions" className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">All Prescriptions</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockPrescriptions.map((prescription) => (
                <PrescriptionCard
                  key={prescription.id}
                  id={prescription.id}
                  name={prescription.name}
                  status={prescription.status}
                  items={prescription.items}
                  issueDate={prescription.issueDate}
                  expiryDate={prescription.expiryDate}
                  instructions={prescription.instructions}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="appointments" className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">All Appointments</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  id={appointment.id}
                  serviceName={appointment.serviceName}
                  date={appointment.date}
                  time={appointment.time}
                  duration={appointment.duration}
                  location={appointment.location}
                  status={appointment.status}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">All Services</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  category={service.category}
                  description={service.description}
                  address={service.address}
                  distance={service.distance}
                  contactPhone={service.contactPhone}
                  availability={service.availability}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
