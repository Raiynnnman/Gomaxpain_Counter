import React from "react";
import { ArrowLeft, ArrowRight, Stethoscope, Scale, Phone } from "lucide-react";
import { Button } from "../../components/ui/button";

interface FeaturesProps {
  onNext: () => void;
  onBack: () => void;
  onComplete?: () => void;
  currentStep?: number;
  totalSteps?: number;
}

export const Features = ({ onNext, onBack }: FeaturesProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center relative bg-[linear-gradient(180deg,rgba(85,85,85,1)_0%,rgba(0,0,0,1)_100%)] min-h-screen px-3 sm:px-4 lg:px-6">
      <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl w-full">
        <div className="text-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-[#ffffff29] rounded-full flex items-center justify-center mb-6 sm:mb-8 mx-auto">
            <div className="flex gap-1 sm:gap-2">
              <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff6a00]" />
              <Scale className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff6a00]" />
            </div>
          </div>

          <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl tracking-[0] leading-tight sm:leading-snug lg:leading-normal mb-3 sm:mb-4 lg:mb-6">
            Comprehensive Care
          </h1>
          
          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-sm sm:text-base lg:text-lg xl:text-xl tracking-[0] leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
            Access to trusted doctors, experienced lawyers, and emergency services all in one place.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 w-full">
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6 bg-[#ffffff29] rounded-lg">
            <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff6a00] flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg">Medical Professionals</h3>
              <p className="text-white/70 text-xs sm:text-sm lg:text-base">Connect with verified doctors</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6 bg-[#ffffff29] rounded-lg">
            <Scale className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff6a00] flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg">Legal Experts</h3>
              <p className="text-white/70 text-xs sm:text-sm lg:text-base">Get legal guidance when needed</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6 bg-[#ffffff29] rounded-lg">
            <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff6a00] flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg">Emergency Support</h3>
              <p className="text-white/70 text-xs sm:text-sm lg:text-base">24/7 emergency assistance</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-full mt-6 sm:mt-8">
          <Button 
            variant="ghost" 
            className="text-white text-xs sm:text-sm lg:text-base"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            Back
          </Button>
          
          <Button 
            className="bg-[#ff6a00] hover:bg-[#e55a00] text-white text-xs sm:text-sm lg:text-base"
            onClick={onNext}
          >
            Next
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:mr-2" />
          </Button>
        </div>

        <div className="flex gap-2">
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="w-2 h-2 bg-[#ff6a00] rounded-full"></div>
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
