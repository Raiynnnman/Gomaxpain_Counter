import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { useAuth } from "../../contexts/AuthContext";

interface SignUpProps {
  onScreenChange: (screen: string) => void;
  onSignupSuccess: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onScreenChange, onSignupSuccess }) => {
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      
      onSignupSuccess();
    } catch (error: any) {
      setError(error.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start relative bg-[linear-gradient(180deg,rgba(85,85,85,1)_0%,rgba(0,0,0,1)_100%)] min-h-screen">
      <div className="flex flex-col items-start relative self-stretch w-full">
        <header className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 lg:py-4 relative self-stretch w-full">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white p-2 sm:p-2.5"
            onClick={() => onScreenChange("login")}
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#ff6a00] text-lg sm:text-xl lg:text-2xl tracking-[0] leading-6">
            GoMAXPAIN
          </div>
          <div className="w-6" />
        </header>

        <main className="flex flex-col items-center px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12 relative self-stretch w-full">
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl w-full">
            <div className="text-center">
              <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl tracking-[0] leading-tight sm:leading-snug lg:leading-normal mb-3 sm:mb-4 lg:mb-6">
                Create Account
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-sm sm:text-base lg:text-lg tracking-[0] leading-relaxed px-2 sm:px-0">
                Join GoMAXPAIN to get connected with trusted professionals
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="w-full bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              {/* Name fields - Stack on mobile, side by side on larger screens */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Input
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                  className="h-12 sm:h-14 lg:h-16 bg-[#ffffff29] border-none text-white placeholder:text-white [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-sm sm:text-base lg:text-lg px-3 sm:px-4"
                />
                <Input
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                  className="h-12 sm:h-14 lg:h-16 bg-[#ffffff29] border-none text-white placeholder:text-white [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-sm sm:text-base lg:text-lg px-3 sm:px-4"
                />
              </div>

              <Input
                placeholder="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="h-12 sm:h-14 lg:h-16 bg-[#ffffff29] border-none text-white placeholder:text-white [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-sm sm:text-base lg:text-lg px-3 sm:px-4"
              />

              <Input
                placeholder="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                className="h-12 sm:h-14 lg:h-16 bg-[#ffffff29] border-none text-white placeholder:text-white [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-sm sm:text-base lg:text-lg px-3 sm:px-4"
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
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
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
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

            <div className="flex items-start space-x-2 sm:space-x-3 w-full">
              <Checkbox 
                id="terms" 
                className="mt-1 flex-shrink-0"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
              />
              <label htmlFor="terms" className="text-xs sm:text-sm lg:text-base text-white leading-relaxed">
                I agree to the{" "}
                <button type="button" className="text-[#ff6a00] underline hover:text-orange-200 transition-colors">Terms of Service</button>{" "}
                and{" "}
                <button type="button" className="text-[#ff6a00] underline hover:text-orange-200 transition-colors">Privacy Policy</button>
              </label>
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-12 sm:h-14 lg:h-16 bg-[#ff6a00] hover:bg-[#e55a00] text-white [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-sm sm:text-base lg:text-lg tracking-[0] leading-6 rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-xs sm:text-sm lg:text-base tracking-[0] leading-relaxed mb-2">
                Already have an account?
              </p>
              <button 
                type="button"
                onClick={() => onScreenChange("login")}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-xs sm:text-sm lg:text-base tracking-[0] leading-relaxed bg-transparent border-none p-0 cursor-pointer hover:text-orange-200 transition-colors"
              >
                Sign In
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};