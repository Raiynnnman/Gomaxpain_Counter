import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export const ResetPassword = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
              <Lock className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
            </div>

            <div className="text-center">
              <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl tracking-[0] leading-tight sm:leading-snug lg:leading-normal mb-3 sm:mb-4 lg:mb-6">
                Reset Password
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-sm sm:text-base lg:text-lg tracking-[0] leading-relaxed px-2 sm:px-0">
                Create a new password for your account
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="h-12 sm:h-14 lg:h-16 bg-[#ffffff29] border-none text-white placeholder:text-white [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-sm sm:text-base lg:text-lg px-3 sm:px-4 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-white p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  className="h-12 sm:h-14 lg:h-16 bg-[#ffffff29] border-none text-white placeholder:text-white [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-sm sm:text-base lg:text-lg px-3 sm:px-4 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-white p-1"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>

            <div className="w-full text-left">
              <p className="text-xs sm:text-sm lg:text-base text-white/70 mb-2">Password must contain:</p>
              <ul className="text-xs sm:text-sm lg:text-base text-white/70 space-y-1">
                <li>• At least 8 characters</li>
                <li>• One uppercase letter</li>
                <li>• One lowercase letter</li>
                <li>• One number</li>
              </ul>
            </div>

            <Button className="w-full h-12 sm:h-14 lg:h-16 bg-[#ff6a00] hover:bg-[#e55a00] text-white [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-sm sm:text-base lg:text-lg tracking-[0] leading-6 rounded-lg sm:rounded-xl">
              Reset Password
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};