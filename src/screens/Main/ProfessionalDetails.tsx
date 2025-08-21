import React, { useState, useEffect } from "react";
import { MapPin, Star, Phone, Calendar, Clock, Mail, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Header } from "../../components/common/Header";
import { useAuth } from "../../contexts/AuthContext";
import { doctorsApi, lawyersApi } from "../../services/api";

interface Professional {
  id: string;
  name: string;
  type: 'doctor' | 'lawyer';
  specialty: string;
  rating: number;
  available: boolean;
  distance: string;
  phone?: string;
  email?: string;
  address?: string;
  experience?: string;
  education?: string;
  description?: string;
  avatar?: string;
}

export const ProfessionalDetails = ({ onScreenChange }: { onScreenChange: (screen: string) => void }): JSX.Element => {
  const { user } = useAuth();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  useEffect(() => {
    // In a real app, you'd get the professional ID from URL params
    // For now, we'll use mock data
    const fetchProfessional = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setProfessional({
          id: '1',
          name: 'Dr. Emily Chen',
          type: 'doctor',
          specialty: 'Emergency Medicine',
          rating: 4.9,
          available: true,
          distance: '0.5 miles away',
          phone: '+1 (555) 123-4567',
          email: 'emily.chen@hospital.com',
          address: '123 Medical Center Dr, Suite 200, City, State 12345',
          experience: '15+ years in emergency medicine',
          education: 'MD from Harvard Medical School, Residency at Johns Hopkins',
          description: 'Dr. Chen is a board-certified emergency medicine physician with extensive experience in trauma care, cardiac emergencies, and critical care medicine. She has received multiple awards for excellence in patient care and is known for her compassionate approach to emergency situations.',
          avatar: undefined
        });
        setLoading(false);
      }, 1000);
    };

    fetchProfessional();
  }, []);

  const handleBack = () => {
    onScreenChange('dashboard');
  };

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      // In a real app, this would create an appointment
      alert(`Appointment booked with ${professional?.name} on ${selectedDate} at ${selectedTime}`);
      onScreenChange('appointments');
    } else {
      alert('Please select a date and time');
    }
  };

  const handleCall = () => {
    if (professional?.phone) {
      window.open(`tel:${professional.phone}`);
    }
  };

  const handleEmail = () => {
    if (professional?.email) {
      window.open(`mailto:${professional.email}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6a00] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading professional details...</p>
        </div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header title="Professional Details" showBack onBack={handleBack} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">Professional not found</p>
            <Button onClick={handleBack}>Back to Dashboard</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Professional Details" showBack onBack={handleBack} />
      
      <main className="flex-1 px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Professional Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              {professional.avatar ? (
                <img src={professional.avatar} alt={professional.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-gray-600 font-bold text-2xl">
                  {professional.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{professional.name}</h1>
              <p className="text-lg text-gray-600 mb-3">{professional.specialty}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{professional.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{professional.distance}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  professional.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {professional.available ? 'Available Now' : 'Unavailable'}
                </span>
              </div>
              
              <div className="flex gap-2">
                {professional.phone && (
                  <Button variant="outline" size="sm" onClick={handleCall}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                )}
                {professional.email && (
                  <Button variant="outline" size="sm" onClick={handleEmail}>
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
          <p className="text-gray-600 mb-4">{professional.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Experience</h3>
              <p className="text-gray-600">{professional.experience}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Education</h3>
              <p className="text-gray-600">{professional.education}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          <div className="space-y-3">
            {professional.address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <span className="text-gray-600">{professional.address}</span>
              </div>
            )}
            {professional.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">{professional.phone}</span>
              </div>
            )}
            {professional.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">{professional.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Book Appointment */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Book Appointment</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6a00] focus:border-transparent"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6a00] focus:border-transparent"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>
          </div>
          
          <Button 
            className="w-full h-12 text-lg"
            onClick={handleBookAppointment}
            disabled={!selectedDate || !selectedTime}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Appointment
          </Button>
        </div>
      </main>
    </div>
  );
}; 