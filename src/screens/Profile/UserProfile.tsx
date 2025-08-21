import React, { useState } from "react";
import { Edit, Settings, Bell, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Header } from "../../components/common/Header";
import { BottomNavigation } from "../../components/common/BottomNavigation";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

export const UserProfile = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("profile");

  const menuItems = [
    { icon: Edit, label: "Edit Profile", action: "edit-profile" },
    { icon: Bell, label: "Notifications", action: "notifications" },
    { icon: Settings, label: "Settings", action: "settings" },
    { icon: HelpCircle, label: "Help & Support", action: "help" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Profile" />

      <main className="flex-1 px-3 sm:px-4 lg:px-6 py-4 sm:py-6 pb-20">
        {/* Profile Header */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
              <AvatarImage src="" />
              <AvatarFallback className="bg-[#ff6a00] text-white text-lg sm:text-xl lg:text-2xl font-bold">
                JD
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">John Doe</h1>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 truncate">john.doe@email.com</p>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 truncate">+1 (555) 123-4567</p>
              
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs sm:text-sm lg:text-base text-green-600 font-medium">Verified Account</span>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="self-start sm:self-center">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600">Appointments</p>
            </div>
            <div className="text-center">
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">3</p>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600">Reports</p>
            </div>
            <div className="text-center">
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600">Rating</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.action}
                className={`w-full flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <span className="font-medium text-gray-900 text-sm sm:text-base lg:text-lg">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </button>
            );
          })}
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6">
          <div className="p-3 sm:p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">Emergency Contacts</h2>
          </div>
          
          <div className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2 sm:gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 text-sm sm:text-base lg:text-lg">Jane Doe</p>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600">Spouse • +1 (555) 987-6543</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm lg:text-base w-full sm:w-auto">
                Edit
              </Button>
            </div>
            
            <Button variant="outline" className="w-full text-xs sm:text-sm lg:text-base h-10 sm:h-12">
              Add Emergency Contact
            </Button>
          </div>
        </div>

        {/* Logout */}
        <Button 
          variant="outline" 
          className="w-full text-red-600 border-red-200 hover:bg-red-50 text-xs sm:text-sm lg:text-base h-10 sm:h-12"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};