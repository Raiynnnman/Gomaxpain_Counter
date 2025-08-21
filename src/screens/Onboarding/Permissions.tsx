import React, { useState } from "react";
import { ArrowLeft, MapPin, Bell, Camera, Phone } from "lucide-react";
import { Button } from "../../components/ui/button";

interface PermissionsProps {
  onNext: () => void;
  onBack: () => void;
  onComplete?: (permissions: any) => void;
  currentStep?: number;
  totalSteps?: number;
}

export const Permissions = ({ onNext, onBack, onComplete }: PermissionsProps): JSX.Element => {
  const [permissions, setPermissions] = useState({
    location: false,
    notifications: false,
    camera: false,
    phone: false
  });

  const handlePermissionToggle = (permission: keyof typeof permissions) => {
    setPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };

  const handleContinue = () => {
    console.log("Continue button clicked, calling onComplete");
    console.log("Permissions state:", permissions);
    if (onComplete) {
      console.log("Calling onComplete with permissions:", permissions);
      onComplete(permissions);
    } else {
      console.log("onComplete not provided, falling back to onNext");
      onNext();
    }
  };

  const handleBack = () => {
    console.log("Back button clicked, calling onBack");
    onBack();
  };

  return (
    <div className="flex flex-col items-center justify-center relative bg-[linear-gradient(180deg,rgba(85,85,85,1)_0%,rgba(0,0,0,1)_100%)] min-h-screen px-3 sm:px-4 lg:px-6">
      <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl w-full">
        <div className="text-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-[#ffffff29] rounded-full flex items-center justify-center mb-6 sm:mb-8 mx-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-[#ff6a00] rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>

          <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl tracking-[0] leading-tight sm:leading-snug lg:leading-normal mb-3 sm:mb-4 lg:mb-6">
            Enable Permissions
          </h1>
          
          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-sm sm:text-base lg:text-lg xl:text-xl tracking-[0] leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
            To provide you with the best experience, we need access to some device features.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6 bg-[#ffffff29] rounded-lg">
            <div className="flex items-center gap-3 sm:gap-4">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff6a00] flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg">Location</h3>
                <p className="text-white/70 text-xs sm:text-sm lg:text-base">Find nearby professionals</p>
              </div>
            </div>
            <Button 
              size="sm" 
              className={`text-xs sm:text-sm lg:text-base w-full sm:w-auto ${permissions.location ? "bg-green-600 hover:bg-green-700" : "bg-[#ff6a00] hover:bg-[#e55a00]"}`}
              onClick={() => handlePermissionToggle("location")}
            >
              {permissions.location ? "Allowed" : "Allow"}
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6 bg-[#ffffff29] rounded-lg">
            <div className="flex items-center gap-3 sm:gap-4">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff6a00] flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg">Notifications</h3>
                <p className="text-white/70 text-xs sm:text-sm lg:text-base">Important updates & alerts</p>
              </div>
            </div>
            <Button 
              size="sm" 
              className={`text-xs sm:text-sm lg:text-base w-full sm:w-auto ${permissions.notifications ? "bg-green-600 hover:bg-green-700" : "bg-[#ff6a00] hover:bg-[#e55a00]"}`}
              onClick={() => handlePermissionToggle("notifications")}
            >
              {permissions.notifications ? "Allowed" : "Allow"}
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6 bg-[#ffffff29] rounded-lg">
            <div className="flex items-center gap-3 sm:gap-4">
              <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff6a00] flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg">Camera</h3>
                <p className="text-white/70 text-xs sm:text-sm lg:text-base">Document incidents</p>
              </div>
            </div>
            <Button 
              size="sm" 
              className={`text-xs sm:text-sm lg:text-base w-full sm:w-auto ${permissions.camera ? "bg-green-600 hover:bg-green-700" : "bg-[#ff6a00] hover:bg-[#e55a00]"}`}
              onClick={() => handlePermissionToggle("camera")}
            >
              {permissions.camera ? "Allowed" : "Allow"}
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6 bg-[#ffffff29] rounded-lg">
            <div className="flex items-center gap-3 sm:gap-4">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff6a00] flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg">Phone</h3>
                <p className="text-white/70 text-xs sm:text-sm lg:text-base">Emergency calling</p>
              </div>
            </div>
            <Button 
              size="sm" 
              className={`text-xs sm:text-sm lg:text-base w-full sm:w-auto ${permissions.phone ? "bg-green-600 hover:bg-green-700" : "bg-[#ff6a00] hover:bg-[#e55a00]"}`}
              onClick={() => handlePermissionToggle("phone")}
            >
              {permissions.phone ? "Allowed" : "Allow"}
            </Button>
          </div>
        </div>

        <div className="flex justify-between w-full mt-6 sm:mt-8">
          <Button 
            variant="ghost" 
            className="text-white text-xs sm:text-sm lg:text-base"
            onClick={handleBack}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            Back
          </Button>
          
          <Button 
            className="bg-[#ff6a00] hover:bg-[#e55a00] text-white text-xs sm:text-sm lg:text-base"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>

        <div className="flex gap-2">
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="w-2 h-2 bg-[#ff6a00] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
