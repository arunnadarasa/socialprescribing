
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Activity, Users, Clock, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  const features = [
    {
      icon: <Activity className="h-8 w-8 text-nhs-blue" />,
      title: 'Health Tracking',
      description:
        'Monitor your prescriptions and health journey in one secure place.',
    },
    {
      icon: <Users className="h-8 w-8 text-nhs-green" />,
      title: 'Community Connection',
      description:
        'Discover and book local services that support your wellbeing needs.',
    },
    {
      icon: <Clock className="h-8 w-8 text-nhs-purple" />,
      title: 'Appointment Management',
      description:
        'Schedule, track and receive reminders for all your appointments.',
    },
    {
      icon: <Lock className="h-8 w-8 text-nhs-darkblue" />,
      title: 'Secure & Compliant',
      description:
        'Your data is protected with NHS-standard security and GDPR compliance.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
        
        <div className="container px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center text-center space-y-4 md:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block rounded-full bg-nhs-blue/10 px-3 py-1 text-sm font-medium text-nhs-blue mb-2">
              Transforming Community Healthcare
            </div>
            
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Social Prescribing for <span className="text-nhs-blue">Better Health</span>
            </h1>
            
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Connecting patients with community services to improve health and wellbeing,
              in partnership with your local pharmacy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild size="lg" className="bg-nhs-blue hover:bg-nhs-darkblue text-white font-medium">
                <Link to="/dashboard">
                  Access Dashboard
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="mt-16 md:mt-24 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="rounded-lg overflow-hidden glass-card border shadow-xl">
              <div className="aspect-video w-full bg-nhs-blue/5 flex items-center justify-center">
                <div className="text-xl text-nhs-blue font-medium">Dashboard Preview</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-full bg-nhs-lightblue/10 blur-2xl" />
            <div className="absolute -top-6 -left-6 -z-10 h-40 w-40 rounded-full bg-nhs-green/10 blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="glass-card p-6 rounded-lg"
                variants={item}
              >
                <div className="mb-4 rounded-full bg-primary/10 p-2 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Ready to improve your wellbeing?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-lg">
              Join thousands of patients who are discovering local services tailored to their needs.
            </p>
            <Button asChild size="lg" className="mt-4 bg-nhs-blue hover:bg-nhs-darkblue text-white">
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-6 md:py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-nhs-blue flex items-center justify-center">
                <span className="text-white font-semibold text-xs">NHS</span>
              </div>
              <span className="text-sm font-medium">Social Prescribing Platform</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NHS Digital. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
