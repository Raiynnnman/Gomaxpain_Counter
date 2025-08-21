import React, { useState } from "react";
import { Calendar, Clock, MapPin, Phone, MessageCircle, MoreVertical } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Header } from "../../components/common/Header";
import { BottomNavigation } from "../../components/common/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

export const AppointmentList = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("appointments");

  const upcomingAppointments = [
    {
      id: "1",
      type: "doctor",
      providerName: "Dr. Sarah Johnson",
      specialty: "Emergency Medicine",
      date: "Today",
      time: "2:30 PM",
      status: "confirmed",
      location: "City General Hospital"
    },
    {
      id: "2",
      type: "lawyer",
      providerName: "Michael Davis",
      specialty: "Personal Injury",
      date: "Tomorrow",
      time: "10:00 AM",
      status: "scheduled",
      location: "Davis Law Office"
    }
  ];

  const pastAppointments = [
    {
      id: "3",
      type: "doctor",
      providerName: "Dr. Emily Chen",
      specialty: "Orthopedic Surgery",
      date: "March 10, 2024",
      time: "3:00 PM",
      status: "completed",
      location: "Metropolitan Medical Center"
    }
  ];

  const AppointmentCard = ({ appointment }: { appointment: any }) => (
    <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-3">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
            appointment.type === 'doctor' ? 'bg-blue-100' : 'bg-green-100'
          }`}>
            <span className={`text-xs sm:text-sm lg:text-base ${
              appointment.type === 'doctor' ? 'text-blue-600' : 'text-green-600'
            }`}>
              {appointment.type === 'doctor' ? '🩺' : '⚖️'}
            </span>
          </div>
          
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg truncate">{appointment.providerName}</h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 truncate">{appointment.specialty}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500 truncate">{appointment.location}</span>
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="self-end sm:self-start">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            <span className="text-xs sm:text-sm lg:text-base text-gray-600">{appointment.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            <span className="text-xs sm:text-sm lg:text-base text-gray-600">{appointment.time}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </span>
        </div>
      </div>
      
      {appointment.status !== 'completed' && (
        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm lg:text-base h-8 sm:h-9">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Call
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm lg:text-base h-8 sm:h-9">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Message
          </Button>
          <Button size="sm" className="flex-1 bg-[#ff6a00] hover:bg-[#e55a00] text-xs sm:text-sm lg:text-base h-8 sm:h-9">
            Reschedule
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Appointments" showBack />

      <main className="flex-1 px-3 sm:px-4 lg:px-6 py-4 sm:py-6 pb-20">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
            <TabsTrigger value="upcoming" className="text-xs sm:text-sm lg:text-base">Upcoming</TabsTrigger>
            <TabsTrigger value="past" className="text-xs sm:text-sm lg:text-base">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-3 sm:space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-8 sm:py-12">
                <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4">Schedule your first appointment with a professional</p>
                <Button className="bg-[#ff6a00] hover:bg-[#e55a00] text-xs sm:text-sm lg:text-base h-10 sm:h-12">
                  Book Appointment
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-3 sm:space-y-4">
            {pastAppointments.length > 0 ? (
              pastAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-8 sm:py-12">
                <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-900 mb-2">No past appointments</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600">Your appointment history will appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};