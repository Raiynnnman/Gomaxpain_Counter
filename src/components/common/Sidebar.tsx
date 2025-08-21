import React from "react";
import { Home, Calendar, FileText, User, Phone, X, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isOpen = false,
  onClose,
}) => {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "appointments", icon: Calendar, label: "Appointments" },
    { id: "reports", icon: FileText, label: "Reports" },
    { id: "emergency", icon: Phone, label: "Emergency" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "contact-support", icon: MessageCircle, label: "Support" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:z-auto
        w-64 lg:w-72 xl:w-80
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">GoMAXPAIN</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden p-1"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 lg:p-6">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    // Close sidebar on mobile after selection
                    if (onClose) onClose();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left
                    ${isActive
                      ? "text-[#ff6a00] bg-orange-50 border border-orange-200"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? "text-[#ff6a00]" : "text-gray-500"
                  }`} />
                  <span className="font-medium text-sm sm:text-base">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">Need help?</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => {
                onTabChange('contact-support');
                if (onClose) onClose();
              }}
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}; 