import React, { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useAuth } from "../../contexts/AuthContext";

interface VerifyEmailProps {
  onScreenChange: (screen: string) => void;
  onEmailVerified: () => void;
}

export const VerifyEmail: React.FC<VerifyEmailProps> = ({ onScreenChange, onEmailVerified }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  
  const { verifyEmail, user } = useAuth();

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerifyEmail = async () => {
    const verificationCode = code.join("");
    
    if (verificationCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await verifyEmail(verificationCode);
      setSuccess("Email verified successfully!");
      setTimeout(() => {
        onEmailVerified();
      }, 1500);
    } catch (error: any) {
      setError(error.message || "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!user?.email) {
      setError("No email found. Please go back to signup.");
      return;
    }

    setResendLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend verification code');
      }

      if (data.emailSent) {
        setSuccess("Verification code resent successfully! Please check your email.");
      } else {
        setSuccess(`Verification code generated! Email delivery failed, but here's your code: ${data.verificationCode}`);
        // Auto-fill the verification code
        const codeArray = data.verificationCode.split('');
        setCode(codeArray);
      }
      
      // Clear any previous error
      setError("");
      
    } catch (error: any) {
      setError(error.message || "Failed to resend verification code. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleBack = () => {
    onScreenChange("login");
  };

  return (
    <div className="flex flex-col items-start relative bg-[linear-gradient(180deg,rgba(85,85,85,1)_0%,rgba(0,0,0,1)_100%)] min-h-screen">
      <div className="flex flex-col items-start relative self-stretch w-full">
        <header className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 lg:py-4 relative self-stretch w-full">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white p-2 sm:p-2.5"
            onClick={handleBack}
          >
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
                Verify Your Email
              </h1>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-sm sm:text-base lg:text-lg tracking-[0] leading-relaxed px-2 sm:px-0">
                We've sent a 6-digit verification code to <strong>{user?.email}</strong>. Please enter it below.
              </p>
            </div>

            {error && (
              <div className="w-full bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-3">
                <p className="text-red-200 text-sm text-center">{error}</p>
              </div>
            )}

            {success && (
              <div className="w-full bg-green-500/20 border border-green-500/50 rounded-lg px-4 py-3">
                <p className="text-green-200 text-sm text-center">{success}</p>
              </div>
            )}

            {/* Verification code inputs - Responsive sizing */}
            <div className="flex gap-2 sm:gap-3 lg:gap-4 w-full justify-center">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  data-index={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-10 h-12 sm:w-12 sm:h-14 lg:w-14 lg:h-16 text-center bg-[#ffffff29] border-none text-white text-lg sm:text-xl lg:text-2xl font-bold rounded-lg sm:rounded-xl"
                  disabled={isLoading}
                />
              ))}
            </div>

            <Button 
              onClick={handleVerifyEmail}
              disabled={isLoading || code.join("").length !== 6}
              className="w-full h-12 sm:h-14 lg:h-16 bg-[#ff6a00] hover:bg-[#e55a00] disabled:bg-gray-500 text-white [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-sm sm:text-base lg:text-lg tracking-[0] leading-6 rounded-lg sm:rounded-xl"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>

            <div className="text-center">
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-xs sm:text-sm lg:text-base tracking-[0] leading-relaxed mb-2">
                Didn't receive the code?
              </p>
              <button 
                onClick={handleResendCode}
                disabled={resendLoading}
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#ff6a00] text-xs sm:text-sm lg:text-base tracking-[0] leading-relaxed bg-transparent border-none p-0 cursor-pointer hover:text-orange-200 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {resendLoading ? "Sending..." : "Resend Code"}
              </button>
            </div>

            {/* Development info */}
            <div className="w-full bg-blue-500/20 border border-blue-500/50 rounded-lg px-4 py-3">
              <p className="text-blue-200 text-xs text-center">
                💡 Development Mode: If email delivery fails, click "Resend Code" to get the verification code directly
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};