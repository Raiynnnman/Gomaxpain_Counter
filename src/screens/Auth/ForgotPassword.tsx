import React from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export const ForgotPassword = (): JSX.Element => {
  return (
    <div className="flex flex-col items-start relative bg-[linear-gradient(180deg,rgba(85,85,85,1)_0%,rgba(0,0,0,1)_100%)] min-h-screen">
      <div className="flex flex-col items-start relative self-stretch w-full">
        <header className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 lg:py-4 relative self-stretch w-full">
          <Button variant="ghost" size="sm" className="text-white p-2 sm:p-2.5">
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#ff6a00] text-lg sm:text-xl lg:text-2xl tracking-[0] leading-6">
            GoMAXPAIN
          </div>
          <div className="w-6" />
        </header>

        <main className="flex flex-col items-center px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12 relative self-stretch w-full">
          <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl w-full">
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#ffffff29] rounded-full mb-3 sm:mb-4 lg:mb-6">
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
            </div>

            <div className="text-center">
              <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl tracking-[0] leading-tight sm:leading-snug lg:leading-normal mb-3 sm:mb-4 lg:mb-6">
                Forgot Password?
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-sm sm:text-base lg:text-lg tracking-[0] leading-relaxed px-2 sm:px-0">
                Don't worry! Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              <Input
                placeholder="Email Address"
                type="email"
                className="h-12 sm:h-14 lg:h-16 bg-[#ffffff29] border-none text-white placeholder:text-white [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-sm sm:text-base lg:text-lg px-3 sm:px-4"
              />
            </div>

            <Button className="w-full h-12 sm:h-14 lg:h-16 bg-[#ff6a00] hover:bg-[#e55a00] text-white [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-sm sm:text-base lg:text-lg tracking-[0] leading-6 rounded-lg sm:rounded-xl">
              Send Reset Link
            </Button>

            <div className="text-center">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-xs sm:text-sm lg:text-base tracking-[0] leading-relaxed mb-2">
                Remember your password?
              </p>
              <button className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-xs sm:text-sm lg:text-base tracking-[0] leading-relaxed bg-transparent border-none p-0 cursor-pointer hover:text-orange-200 transition-colors">
                Back to Sign In
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};