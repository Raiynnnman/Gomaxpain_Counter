export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  profileImage?: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  distance: string;
  image: string;
  isAvailable: boolean;
  nextAvailable?: string;
}

export interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  distance: string;
  image: string;
  isAvailable: boolean;
  experience: number;
}

export interface Accident {
  id: string;
  type: string;
  date: Date;
  location: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe';
  status: 'reported' | 'in-progress' | 'resolved';
  photos: string[];
  documents: string[];
}

export interface Appointment {
  id: string;
  type: 'doctor' | 'lawyer';
  providerId: string;
  providerName: string;
  date: Date;
  time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}