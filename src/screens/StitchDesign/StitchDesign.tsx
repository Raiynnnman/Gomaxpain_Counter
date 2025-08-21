import { HelpCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useAuth } from "../../contexts/AuthContext";

interface StitchDesignProps {
  onScreenChange: (screen: string) => void;
  onLoginSuccess: () => void;
}

export const StitchDesign: React.FC<StitchDesignProps> = ({ onScreenChange, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      onLoginSuccess();
    } catch (error: any) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    onScreenChange("forgot-password");
  };

  const handleSignUp = () => {
    onScreenChange("signup");
  };

  return (
    <div className="flex flex-col items-start relative bg-[linear-gradient(180deg,rgba(85,85,85,1)_0%,rgba(0,0,0,1)_100%)] min-h-screen">
      <div className="flex flex-col items-start relative self-stretch w-full">
        <header className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 lg:py-4 relative self-stretch w-full">
          <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#ff6a00] text-lg sm:text-xl lg:text-2xl tracking-[0] leading-6">
            GoMAXPAIN
          </div>
          <HelpCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </header>

        <main className="flex flex-col items-center px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12 relative self-stretch w-full">
          <form onSubmit={handleLogin} className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl w-full">
            <div className="text-center">
              <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl tracking-[0] leading-tight sm:leading-snug lg:leading-normal mb-3 sm:mb-4 lg:mb-6">
                Welcome to GoMAXPAIN
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-sm sm:text-base lg:text-lg tracking-[0] leading-relaxed px-2 sm:px-0">
                Get connected with trusted doctors and lawyers in the immediate
                aftermath of an accident.
              </p>
            </div>

            {error && (
              <div className="w-full bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-3">
                <p className="text-red-200 text-sm text-center">{error}</p>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              <Input
                type="email"
                placeholder="Email or Phone"
                value={email}
                onChange={handleEmailChange}
                required
                className="h-12 sm:h-14 lg:h-16 bg-[#ffffff29] border-none text-white placeholder:text-white [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-sm sm:text-base lg:text-lg px-3 sm:px-4"
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="h-12 sm:h-14 lg:h-16 bg-[#ffffff29] border-none text-white placeholder:text-white [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-sm sm:text-base lg:text-lg px-3 sm:px-4"
              />
            </div>

            <div className="w-full text-left">
              <button 
                type="button"
                onClick={handleForgotPassword}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-xs sm:text-sm lg:text-base tracking-[0] leading-relaxed bg-transparent border-none p-0 cursor-pointer hover:text-orange-200 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-12 sm:h-14 lg:h-16 bg-[#ff6a00] hover:bg-[#e55a00] disabled:bg-gray-500 text-white [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-sm sm:text-base lg:text-lg tracking-[0] leading-6 rounded-lg sm:rounded-xl"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            <div className="text-center">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-xs sm:text-sm lg:text-base tracking-[0] leading-relaxed mb-2">
                Don't have an account?
              </p>
              <button 
                type="button"
                onClick={handleSignUp}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-xs sm:text-sm lg:text-base tracking-[0] leading-relaxed bg-transparent border-none p-0 cursor-pointer hover:text-orange-200 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};
