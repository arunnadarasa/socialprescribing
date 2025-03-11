
// Mock data for the application

// User roles
export type UserRole = 'patient' | 'pharmacist' | 'social_prescriber' | 'admin';

// Service categories
export type ServiceCategory =
  | 'mental health'
  | 'physical activity'
  | 'financial support'
  | 'social activity'
  | 'housing support'
  | 'employment'
  | 'education'
  | 'other';

// Service interface
export interface Service {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  address: string;
  distance?: string;
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  availability?: string[];
  imageUrl?: string;
}

// Appointment status
export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';

// Appointment interface
export interface Appointment {
  id: string;
  serviceName: string;
  serviceId: string;
  date: Date;
  time: string;
  duration: string;
  location: string;
  status: AppointmentStatus;
  notes?: string;
}

// Prescription status
export type PrescriptionStatus = 'active' | 'completed' | 'pending';

// Prescription interface
export interface Prescription {
  id: string;
  name: string;
  status: PrescriptionStatus;
  items: string[];
  issueDate: string;
  expiryDate: string;
  instructions?: string;
  issuedBy: string;
}

// Mock services
export const mockServices: Service[] = [
  {
    id: 's1',
    title: 'Community Mental Health Support',
    category: 'mental health',
    description: 'Weekly support group sessions for anxiety and depression. Facilitated by trained professionals in a welcoming environment.',
    address: '25 High Street, London, SE1 9PX',
    distance: '0.8 miles',
    contactPhone: '020 7123 4567',
    availability: ['Tuesdays 18:00 - 19:30', 'Thursdays 10:00 - 11:30'],
  },
  {
    id: 's2',
    title: 'Walking for Wellbeing',
    category: 'physical activity',
    description: 'Guided walking group for all abilities. Enjoy the outdoors while improving physical and mental wellbeing.',
    address: 'Victoria Park, Grove Road, London, E3 5TB',
    distance: '1.2 miles',
    contactPhone: '020 7234 5678',
    availability: ['Mondays 10:00 - 11:30', 'Saturdays 09:00 - 10:30'],
  },
  {
    id: 's3',
    title: 'Financial Advice Drop-in',
    category: 'financial support',
    description: 'Free confidential advice on benefits, debt management, and budgeting from qualified advisors.',
    address: '15 Church Lane, London, N8 7PQ',
    distance: '1.5 miles',
    contactPhone: '020 7345 6789',
    availability: ['Wednesdays 13:00 - 16:00', 'Fridays 10:00 - 14:00'],
  },
  {
    id: 's4',
    title: 'Community Garden Project',
    category: 'social activity',
    description: 'Join our gardening group to learn skills, grow vegetables and make friends. No experience necessary.',
    address: 'Community Gardens, Elm Street, London, E2 6QT',
    distance: '0.7 miles',
    contactPhone: '020 7456 7890',
    availability: ['Tuesdays 10:00 - 12:00', 'Sundays 14:00 - 16:00'],
  },
  {
    id: 's5',
    title: 'Diabetes Support Network',
    category: 'physical activity',
    description: 'Support group for people living with diabetes. Share experiences and learn about managing the condition effectively.',
    address: '45 Medical Center, London, SE10 8QZ',
    distance: '2.3 miles',
    contactPhone: '020 7567 8901',
    availability: ['Every second Thursday 18:30 - 20:00'],
  },
  {
    id: 's6',
    title: 'Housing Advice Service',
    category: 'housing support',
    description: 'Expert advice on housing issues, including homelessness prevention, tenancy rights, and housing applications.',
    address: '8 Council Road, London, N1 5RT',
    distance: '1.8 miles',
    contactPhone: '020 7678 9012',
    availability: ['Monday to Friday 09:00 - 17:00'],
  },
];

// Mock appointments
export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    serviceName: 'Walking for Wellbeing',
    serviceId: 's2',
    date: new Date(2023, 6, 15),
    time: '10:00',
    duration: '1.5 hours',
    location: 'Victoria Park, Grove Road',
    status: 'upcoming',
  },
  {
    id: 'a2',
    serviceName: 'Community Mental Health Support',
    serviceId: 's1',
    date: new Date(2023, 6, 18),
    time: '18:00',
    duration: '1.5 hours',
    location: '25 High Street',
    status: 'upcoming',
  },
  {
    id: 'a3',
    serviceName: 'Financial Advice Drop-in',
    serviceId: 's3',
    date: new Date(2023, 5, 30),
    time: '14:00',
    duration: '1 hour',
    location: '15 Church Lane',
    status: 'completed',
  },
  {
    id: 'a4',
    serviceName: 'Diabetes Support Network',
    serviceId: 's5',
    date: new Date(2023, 5, 25),
    time: '18:30',
    duration: '1.5 hours',
    location: '45 Medical Center',
    status: 'cancelled',
  },
];

// Mock prescriptions
export const mockPrescriptions: Prescription[] = [
  {
    id: 'p1',
    name: 'Hypertension Medication',
    status: 'active',
    items: ['Amlodipine 5mg', 'Lisinopril 10mg'],
    issueDate: '01/05/2023',
    expiryDate: '01/08/2023',
    issuedBy: 'Dr. Sarah Johnson',
    instructions: 'Take with food in the morning. Avoid grapefruit juice.',
  },
  {
    id: 'p2',
    name: 'Cholesterol Treatment',
    status: 'active',
    items: ['Atorvastatin 20mg'],
    issueDate: '15/05/2023',
    expiryDate: '15/08/2023',
    issuedBy: 'Dr. Michael Chen',
  },
  {
    id: 'p3',
    name: 'Diabetes Medication',
    status: 'pending',
    items: ['Metformin 500mg', 'Test strips'],
    issueDate: '10/06/2023',
    expiryDate: '10/09/2023',
    issuedBy: 'Dr. Sarah Johnson',
  },
  {
    id: 'p4',
    name: 'Pain Relief',
    status: 'completed',
    items: ['Ibuprofen 400mg', 'Paracetamol 500mg'],
    issueDate: '02/04/2023',
    expiryDate: '02/05/2023',
    issuedBy: 'Dr. Michael Chen',
  },
];
