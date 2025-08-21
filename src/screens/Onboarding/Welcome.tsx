import React from "react";
import { Button } from "../../components/ui/button";

interface WelcomeProps {
  onNext: () => void;
  onBack?: () => void;
  onComplete?: () => void;
  currentStep?: number;
  totalSteps?: number;
}

export const Welcome = ({ onNext }: WelcomeProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center relative bg-[linear-gradient(180deg,rgba(85,85,85,1)_0%,rgba(0,0,0,1)_100%)] min-h-screen px-3 sm:px-4 lg:px-6">
      <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl w-full">
        <div className="text-center">
          <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#ff6a00] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-[0] leading-tight sm:leading-snug lg:leading-normal mb-6 sm:mb-8">
            GoMAXPAIN
          </div>
          
          <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-[#ffffff29] rounded-full flex items-center justify-center mb-6 sm:mb-8 mx-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-[#ff6a00] rounded-full flex items-center justify-center">
              <span className="text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">+</span>
            </div>
          </div>

          <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl tracking-[0] leading-tight sm:leading-snug lg:leading-normal mb-3 sm:mb-4 lg:mb-6">
            Welcome to GoMAXPAIN
          </h1>
          
          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-sm sm:text-base lg:text-lg xl:text-xl tracking-[0] leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
            Your trusted companion for connecting with medical professionals and legal experts in times of need.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 w-full">
          <Button 
            onClick={onNext}
            className="w-full h-12 sm:h-14 lg:h-16 bg-[#ff6a00] hover:bg-[#e55a00] text-white [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-sm sm:text-base lg:text-lg tracking-[0] leading-6 rounded-lg sm:rounded-xl"
          >
            Get Started
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-12 sm:h-14 lg:h-16 border-2 border-white text-white hover:bg-white hover:text-black [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-sm sm:text-base lg:text-lg tracking-[0] leading-6 rounded-lg sm:rounded-xl"
          >
            Learn More
          </Button>
        </div>

        <div className="flex gap-2 mt-4 sm:mt-6">
          <div className="w-2 h-2 bg-[#ff6a00] rounded-full"></div>
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
