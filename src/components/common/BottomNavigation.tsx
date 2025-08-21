import React from "react";
import { Home, Calendar, FileText, User, Phone } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "appointments", icon: Calendar, label: "Appointments" },
    { id: "reports", icon: FileText, label: "Reports" },
    { id: "emergency", icon: Phone, label: "Emergency" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 sm:px-4 py-1 sm:py-2 z-40">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-1 sm:py-2 px-2 sm:px-3 rounded-lg transition-colors min-w-0 flex-1 ${
                isActive
                  ? "text-[#ff6a00] bg-orange-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 mb-1 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-center truncate max-w-full">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};