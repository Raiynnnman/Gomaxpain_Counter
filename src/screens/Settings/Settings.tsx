import React from "react";
import { ArrowLeft, Bell, Shield, Globe, Moon, Smartphone, HelpCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Header } from "../../components/common/Header";
import { Switch } from "../../components/ui/switch";

export const Settings = (): JSX.Element => {
  const settingsGroups = [
    {
      title: "Notifications",
      items: [
        { icon: Bell, label: "Push Notifications", type: "toggle", enabled: true },
        { icon: Bell, label: "Email Notifications", type: "toggle", enabled: false },
        { icon: Bell, label: "SMS Alerts", type: "toggle", enabled: true },
      ]
    },
    {
      title: "Privacy & Security",
      items: [
        { icon: Shield, label: "Two-Factor Authentication", type: "toggle", enabled: false },
        { icon: Shield, label: "Biometric Login", type: "toggle", enabled: true },
        { icon: Shield, label: "Data Sharing", type: "toggle", enabled: false },
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: Globe, label: "Language", type: "select", value: "English" },
        { icon: Moon, label: "Dark Mode", type: "toggle", enabled: false },
        { icon: Smartphone, label: "Auto-Lock", type: "select", value: "5 minutes" },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Settings" showBack />

      <main className="flex-1 px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="space-y-4 sm:space-y-6">
          {settingsGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="bg-white rounded-lg shadow-sm">
              <div className="p-3 sm:p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">{group.title}</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <div key={itemIndex} className="p-3 sm:p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        <span className="font-medium text-gray-900 text-sm sm:text-base lg:text-lg">{item.label}</span>
                      </div>
                      
                      {item.type === 'toggle' ? (
                        <Switch defaultChecked={item.enabled} />
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm lg:text-base text-gray-600">{item.value}</span>
                          <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {/* Additional Options */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-3 sm:p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">Support</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              <button className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-2 sm:gap-3">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <span className="font-medium text-gray-900 text-sm sm:text-base lg:text-lg">Help Center</span>
                </div>
                <ArrowLeft className="w-4 h-4 rotate-180 text-gray-400" />
              </button>
              
              <button 
                className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-gray-50"
                onClick={() => onScreenChange("contact-support")}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:w-5 text-gray-600" />
                  <span className="font-medium text-gray-900 text-sm sm:text-base lg:text-lg">Contact Support</span>
                </div>
                <ArrowLeft className="w-4 h-4 rotate-180 text-gray-400" />
              </button>
              
              <button className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-2 sm:gap-3">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <span className="font-medium text-gray-900 text-sm sm:text-base lg:text-lg">Terms of Service</span>
                </div>
                <ArrowLeft className="w-4 h-4 rotate-180 text-gray-400" />
              </button>
              
              <button className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-2 sm:gap-3">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <span className="font-medium text-gray-900 text-sm sm:text-base lg:text-lg">Privacy Policy</span>
                </div>
                <ArrowLeft className="w-4 h-4 rotate-180 text-gray-400" />
              </button>
            </div>
          </div>
          
          {/* App Info */}
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 text-center">
            <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#ff6a00] text-lg sm:text-xl lg:text-2xl mb-2">
              GoMAXPAIN
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600">Version 1.0.0</p>
            <p className="text-xs text-gray-500 mt-1">© 2024 GoMAXPAIN. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
};