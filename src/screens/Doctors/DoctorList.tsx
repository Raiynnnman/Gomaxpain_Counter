import React, { useState } from "react";
import { Search, Filter, MapPin, Star, Clock } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Header } from "../../components/common/Header";
import { BottomNavigation } from "../../components/common/BottomNavigation";

export const DoctorList = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("home");

  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Emergency Medicine",
      rating: 4.9,
      reviews: 127,
      distance: "0.5 miles",
      image: "",
      isAvailable: true,
      nextAvailable: "Available now"
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Orthopedic Surgery",
      rating: 4.8,
      reviews: 89,
      distance: "1.2 miles",
      image: "",
      isAvailable: false,
      nextAvailable: "Next: Tomorrow 9:00 AM"
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "Internal Medicine",
      rating: 4.7,
      reviews: 156,
      distance: "2.1 miles",
      image: "",
      isAvailable: true,
      nextAvailable: "Available in 30 min"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Find Doctors" showBack showSearch />

      <main className="flex-1 px-3 sm:px-4 lg:px-6 py-4 sm:py-6 pb-20">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name or specialty..."
              className="pl-10 h-10 sm:h-12 text-xs sm:text-sm lg:text-base"
            />
          </div>
          <Button variant="outline" size="sm" className="h-10 sm:h-12 px-3 sm:px-4 text-xs sm:text-sm lg:text-base">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2">
          <Button variant="outline" size="sm" className="whitespace-nowrap text-xs sm:text-sm lg:text-base">
            All Specialties
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap text-xs sm:text-sm lg:text-base">
            Emergency
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap text-xs sm:text-sm lg:text-base">
            Orthopedic
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap text-xs sm:text-sm lg:text-base">
            Internal Medicine
          </Button>
        </div>

        {/* Doctor List */}
        <div className="space-y-3 sm:space-y-4">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-600 font-semibold text-xs sm:text-sm lg:text-base">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg truncate">{doctor.name}</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600 truncate">{doctor.specialty}</p>
                    </div>
                    <div className="text-left sm:text-right mt-2 sm:mt-0">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                        <span className="text-xs sm:text-sm lg:text-base font-medium">{doctor.rating}</span>
                        <span className="text-xs text-gray-500">({doctor.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{doctor.distance}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        doctor.isAvailable ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <span className="text-xs sm:text-sm lg:text-base text-gray-600">{doctor.nextAvailable}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm lg:text-base">
                        View Profile
                      </Button>
                      <Button size="sm" className="bg-[#ff6a00] hover:bg-[#e55a00] text-xs sm:text-sm lg:text-base">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-4 sm:mt-6 text-center">
          <Button variant="outline" className="w-full h-10 sm:h-12 text-xs sm:text-sm lg:text-base">
            Load More Doctors
          </Button>
        </div>
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};