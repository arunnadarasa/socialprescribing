
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, MapPin, Filter, ListFilter } from 'lucide-react';
import ServiceCard from '@/components/common/ServiceCard';
import PageTransition from '@/components/layout/PageTransition';
import { mockServices, ServiceCategory } from '@/lib/data';

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxDistance, setMaxDistance] = useState<number>(5);
  
  // Convert string distances to numbers for filtering
  const services = mockServices.map(service => ({
    ...service,
    distanceValue: service.distance 
      ? parseFloat(service.distance.split(' ')[0]) 
      : 0
  }));
  
  // Filter services based on search, category, and distance
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           service.category === selectedCategory;
    
    const matchesDistance = service.distanceValue <= maxDistance;
    
    return matchesSearch && matchesCategory && matchesDistance;
  });
  
  // Get unique categories for filter dropdown
  const categories = ['all', ...new Set(mockServices.map(s => s.category))];

  return (
    <PageTransition>
      <div className="space-y-6 pt-6 pb-16">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Service Directory</h1>
          <p className="text-muted-foreground">
            Find and connect with local services to support your health and wellbeing
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-card"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="w-full md:w-auto">
              <MapPin className="mr-2 h-4 w-4" />
              Near Me
            </Button>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-lg space-y-4">
          <div className="flex items-center mb-2">
            <ListFilter className="mr-2 h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">Refine Results</h3>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' 
                        ? 'All Categories' 
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="distance">Distance</Label>
                <span className="text-sm text-muted-foreground">{maxDistance} miles</span>
              </div>
              <Slider
                id="distance"
                min={0}
                max={10}
                step={0.5}
                defaultValue={[maxDistance]}
                onValueChange={(value) => setMaxDistance(value[0])}
                className="py-2"
              />
            </div>
            
            <div className="space-y-2 sm:col-span-2 md:col-span-1">
              <Label htmlFor="availability">Availability</Label>
              <Select defaultValue="any">
                <SelectTrigger id="availability">
                  <SelectValue placeholder="Any Day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Day</SelectItem>
                  <SelectItem value="weekday">Weekdays</SelectItem>
                  <SelectItem value="weekend">Weekends</SelectItem>
                  <SelectItem value="evening">Evenings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold tracking-tight">
              {filteredServices.length} Services Available
            </h2>
            <Select defaultValue="closest">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="closest">Closest First</SelectItem>
                <SelectItem value="az">A-Z</SelectItem>
                <SelectItem value="za">Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                category={service.category as ServiceCategory}
                description={service.description}
                address={service.address}
                distance={service.distance}
                contactPhone={service.contactPhone}
                availability={service.availability}
                className="animate-fade-in"
              />
            ))}
            
            {filteredServices.length === 0 && (
              <div className="col-span-full p-8 text-center">
                <div className="text-muted-foreground">No services found matching your criteria</div>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setMaxDistance(5);
                  }}
                >
                  Reset filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Services;
