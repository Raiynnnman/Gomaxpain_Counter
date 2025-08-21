import React, { useState, useEffect } from "react";
import { Bell, Search, Plus, MapPin, Clock, Star, Menu, User, LogOut, MessageCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { BottomNavigation } from "../../components/common/BottomNavigation";
import { Sidebar } from "../../components/common/Sidebar";
import { useAuth } from "../../contexts/AuthContext";
import { appointmentsApi, doctorsApi, lawyersApi, emergencyReportsApi } from "../../services/api";

interface Appointment {
  id: string;
  type: 'doctor' | 'lawyer';
  professionalName: string;
  specialty: string;
  status: string;
  date: string;
  time: string;
  rating?: number;
}

interface Professional {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  available: boolean;
  distance: string;
  avatar?: string;
}

interface DashboardProps {
  onScreenChange: (screen: string) => void;
}

export const Dashboard = ({ onScreenChange }: DashboardProps): JSX.Element => {
  const { user, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);
  const [nearbyProfessionals, setNearbyProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(3); // Mock notification count

  // Debug logging
  console.log('Dashboard render - user:', user);
  console.log('Dashboard render - token:', token);
  console.log('Dashboard render - loading:', loading);

  // Fetch dashboard data
  useEffect(() => {
    console.log('Dashboard useEffect triggered - user:', user, 'token:', token);
    
    // Add timeout fallback to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log('Dashboard timeout fallback - forcing loading to false');
      setLoading(false);
    }, 5000); // 5 second timeout
    
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Only try to fetch real data if we have a token
        if (token) {
          try {
            // Fetch recent appointments
            const appointmentsData = await appointmentsApi.getUserAppointments(token);
            const formattedAppointments = appointmentsData.appointments?.slice(0, 3).map((apt: any) => ({
              id: apt.id,
              type: apt.professionalType || 'doctor',
              professionalName: apt.professionalName || 'Unknown',
              specialty: apt.specialty || 'General',
              status: apt.status || 'scheduled',
              date: apt.date || new Date().toISOString(),
              time: apt.time || 'TBD',
              rating: apt.rating
            })) || [];

            // Fetch nearby professionals
            const [doctorsData, lawyersData] = await Promise.all([
              doctorsApi.getDoctors(token, { available: true }),
              lawyersApi.getLawyers(token, { available: true })
            ]);

            const allProfessionals = [
              ...(doctorsData.doctors || []).map((doc: any) => ({
                id: doc.id,
                name: doc.name,
                specialty: doc.specialty,
                rating: doc.rating || 4.5,
                available: doc.available,
                distance: doc.distance || '0.5 miles away',
                avatar: doc.avatar
              })),
              ...(lawyersData.lawyers || []).map((law: any) => ({
                id: law.id,
                name: law.name,
                specialty: law.specialty,
                rating: law.rating || 4.5,
                available: law.available,
                distance: law.distance || '0.5 miles away',
                avatar: law.avatar
              }))
            ];

            setRecentAppointments(formattedAppointments);
            setNearbyProfessionals(allProfessionals.slice(0, 3));
          } catch (apiError) {
            console.error('Error fetching real data:', apiError);
            // Fall through to mock data
          }
        }
        
        // If no token or API failed, use mock data
        if (!token || recentAppointments.length === 0) {
          setRecentAppointments([
            {
              id: '1',
              type: 'doctor',
              professionalName: 'Dr. Sarah Johnson',
              specialty: 'Cardiology',
              status: 'completed',
              date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
              time: '2:00 PM',
              rating: 4.8
            },
            {
              id: '2',
              type: 'lawyer',
              professionalName: 'Law Office of Mike Davis',
              specialty: 'Personal Injury',
              status: 'scheduled',
              date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
              time: '2:00 PM'
            }
          ]);
        }
        
        if (!token || nearbyProfessionals.length === 0) {
          setNearbyProfessionals([
            {
              id: '1',
              name: 'Dr. Emily Chen',
              specialty: 'Emergency Medicine',
              rating: 4.9,
              available: true,
              distance: '0.5 miles away'
            }
          ]);
        }
      } catch (error) {
        console.error('Error in fetchDashboardData:', error);
        // Set mock data as fallback
        setRecentAppointments([
          {
            id: '1',
            type: 'doctor',
            professionalName: 'Dr. Sarah Johnson',
            specialty: 'Cardiology',
            status: 'completed',
            date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            time: '2:00 PM',
            rating: 4.8
          },
          {
            id: '2',
            type: 'lawyer',
            professionalName: 'Law Office of Mike Davis',
            specialty: 'Personal Injury',
            status: 'scheduled',
            date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            time: '2:00 PM'
          }
        ]);
        setNearbyProfessionals([
          {
            id: '1',
            name: 'Dr. Emily Chen',
            specialty: 'Emergency Medicine',
            rating: 4.9,
            available: true,
            distance: '0.5 miles away'
          }
        ]);
      } finally {
        setLoading(false);
        clearTimeout(timeoutId); // Clear timeout since we're done
      }
    };

    fetchDashboardData();
    
    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [user, token]); // Changed to include both user and token

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Navigate to search results
      onScreenChange("search");
    }
  };

  // Handle emergency report
  const handleEmergencyReport = () => {
    onScreenChange("emergency-report");
  };

  // Handle quick actions
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'find-doctor':
        onScreenChange("doctors");
        break;
      case 'find-lawyer':
        onScreenChange("lawyers");
        break;
      case 'reports':
        onScreenChange("reports");
        break;
      case 'emergency':
        onScreenChange("emergency-report");
        break;
      default:
        break;
    }
  };

  // Handle professional selection
  const handleProfessionalSelect = (professional: Professional) => {
    onScreenChange("professionals");
  };

  // Handle appointment view
  const handleAppointmentView = (appointment: Appointment) => {
    onScreenChange("appointments");
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      onScreenChange("login");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6a00] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        {/* Header */}
        <header className="bg-white px-3 sm:px-4 lg:px-6 py-3 lg:py-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2"
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {getGreeting()}, {user?.firstName || 'User'}
                </h1>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 truncate">
                  How can we help you today?
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 ml-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 sm:p-2.5 relative"
                onClick={() => onScreenChange("search")}
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 sm:p-2.5 relative"
                onClick={() => onScreenChange("contact-support")}
                title="Contact Support"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 sm:p-2.5 relative"
                onClick={() => onScreenChange("notifications")}
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications > 9 ? '9+' : notifications}
                  </span>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 sm:p-2.5"
                onClick={() => onScreenChange("profile")}
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 sm:p-2.5 text-red-600 hover:text-red-700"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search doctors, lawyers, or services..."
              className="pl-10 h-10 sm:h-12 bg-gray-100 border-none text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-3 sm:px-4 lg:px-6 py-4 sm:py-6 pb-20 lg:pb-6">
          {/* Emergency Button */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <Button 
              className="w-full h-14 sm:h-16 lg:h-20 bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg lg:text-xl font-bold rounded-xl"
              onClick={handleEmergencyReport}
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Report Emergency
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              <Button 
                variant="outline" 
                className="h-16 sm:h-20 lg:h-24 flex-col gap-1 sm:gap-2 p-2 sm:p-3 hover:bg-blue-50 hover:border-blue-300"
                onClick={() => handleQuickAction('find-doctor')}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm sm:text-lg lg:text-xl">🩺</span>
                </div>
                <span className="text-xs sm:text-sm lg:text-base font-medium text-center">Find Doctor</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-16 sm:h-20 lg:h-24 flex-col gap-1 sm:gap-2 p-2 sm:p-3 hover:bg-green-50 hover:border-green-300"
                onClick={() => handleQuickAction('find-lawyer')}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm sm:text-lg lg:text-xl">⚖️</span>
                </div>
                <span className="text-xs sm:text-sm lg:text-base font-medium text-center">Find Lawyer</span>
              </Button>

              {/* Additional quick actions for larger screens */}
              <div className="hidden sm:block">
                <Button 
                  variant="outline" 
                  className="h-16 sm:h-20 lg:h-24 flex-col gap-1 sm:gap-2 p-2 sm:p-3 hover:bg-purple-50 hover:border-purple-300"
                  onClick={() => handleQuickAction('reports')}
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-sm sm:text-lg lg:text-xl">📋</span>
                  </div>
                  <span className="text-xs sm:text-sm lg:text-base font-medium text-center">Reports</span>
                </Button>
              </div>

              <div className="hidden lg:block">
                <Button 
                  variant="outline" 
                  className="h-16 sm:h-20 lg:h-24 flex-col gap-1 sm:gap-2 p-2 sm:p-3 hover:bg-yellow-50 hover:border-yellow-300"
                  onClick={() => handleQuickAction('emergency')}
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 text-sm sm:text-lg lg:text-xl">📞</span>
                  </div>
                  <span className="text-xs sm:text-sm lg:text-base font-medium text-center">Emergency</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">Recent Activity</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#ff6a00] text-xs sm:text-sm lg:text-base"
                onClick={() => onScreenChange("appointments")}
              >
                View All
              </Button>
            </div>
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              {recentAppointments.length > 0 ? (
                recentAppointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleAppointmentView(appointment)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          appointment.type === 'doctor' ? 'bg-blue-100' : 'bg-green-100'
                        }`}>
                          <span className={`text-xs sm:text-sm lg:text-base font-bold ${
                            appointment.type === 'doctor' ? 'text-blue-600' : 'text-green-600'
                          }`}>
                            {appointment.type === 'doctor' ? 'DR' : 'LW'}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base lg:text-lg truncate">
                            {appointment.professionalName}
                          </h3>
                          <p className="text-xs sm:text-sm lg:text-base text-gray-600 truncate">
                            {appointment.specialty} - {appointment.status}
                          </p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xs sm:text-sm lg:text-base text-gray-500">
                          {formatDate(appointment.date)}
                        </p>
                        {appointment.rating ? (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                            <span className="text-xs sm:text-sm lg:text-base text-gray-600">{appointment.rating}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                            <span className="text-xs sm:text-sm lg:text-base text-gray-600">{appointment.time}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <p className="text-gray-500">No recent activity</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => onScreenChange("doctors")}
                  >
                    Find a Professional
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Nearby Professionals */}
          <div>
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">Nearby Professionals</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#ff6a00] text-xs sm:text-sm lg:text-base"
                onClick={() => onScreenChange("professionals")}
              >
                View All
              </Button>
            </div>
            
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              {nearbyProfessionals.length > 0 ? (
                nearbyProfessionals.map((professional) => (
                  <div 
                    key={professional.id} 
                    className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleProfessionalSelect(professional)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
                          {professional.avatar ? (
                            <img src={professional.avatar} alt={professional.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <span className="text-gray-600 font-bold text-lg">
                              {professional.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base lg:text-lg truncate">
                            {professional.name}
                          </h3>
                          <p className="text-xs sm:text-sm lg:text-base text-gray-600 truncate">
                            {professional.specialty}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs sm:text-sm text-gray-500">{professional.distance}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                          <span className="text-sm sm:text-base lg:text-lg font-medium">{professional.rating}</span>
                        </div>
                        <span className={`text-xs sm:text-sm lg:text-base font-medium ${
                          professional.available ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {professional.available ? 'Available Now' : 'Unavailable'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <p className="text-gray-500">No nearby professionals found</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => onScreenChange("doctors")}
                  >
                    Search Professionals
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Contact Support Section */}
          <div className="mt-6 sm:mt-8">
            <div className="bg-gradient-to-r from-[#ff6a00] to-[#ff8533] rounded-lg p-4 sm:p-6 text-white">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Need Help?</h3>
                <p className="text-sm sm:text-base text-orange-100 mb-4">
                  Our support team is here to help you 24/7
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white text-[#ff6a00] hover:bg-orange-50 border-white hover:border-orange-100"
                  onClick={() => onScreenChange("contact-support")}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation - Hidden on larger screens */}
        <div className="lg:hidden">
          <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </div>
  );
};