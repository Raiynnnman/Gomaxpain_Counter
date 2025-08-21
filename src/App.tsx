import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { StitchDesign } from "./screens/StitchDesign";
import { SignUp } from "./screens/Auth/SignUp";
import { ForgotPassword } from "./screens/Auth/ForgotPassword";
import { ResetPassword } from "./screens/Auth/ResetPassword";
import { VerifyEmail } from "./screens/Auth/VerifyEmail";
import { Welcome } from "./screens/Onboarding/Welcome";
import { Features } from "./screens/Onboarding/Features";
import { Permissions } from "./screens/Onboarding/Permissions";
import { Dashboard } from "./screens/Main/Dashboard";
import { EmergencyReport } from "./screens/Main/EmergencyReport";
import { ContactSupport } from "./screens/Support/ContactSupport";
import { LandingPage } from "./screens/Landing/LandingPage";
import { DoctorList } from "./screens/Doctors/DoctorList";
import { LawyerList } from "./screens/Lawyers/LawyerList";
import { AppointmentList } from "./screens/Appointments/AppointmentList";
import { UserProfile } from "./screens/Profile/UserProfile";
import { Settings } from "./screens/Settings/Settings";
import { SearchResults } from "./screens/Main/SearchResults";
import { Notifications } from "./screens/Main/Notifications";
import { ProfessionalDetails } from "./screens/Main/ProfessionalDetails";
import { Reports } from "./screens/Main/Reports";

// Main App Router Component
const AppRouter: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<string>("login");

  // Set initial screen based on user state
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        setCurrentScreen("login");
      } else if (!user.isEmailVerified) {
        setCurrentScreen("verify-email");
      } else if (!user.onboardingCompleted) {
        setCurrentScreen("onboarding");
      } else {
        setCurrentScreen("dashboard");
      }
    }
  }, [user, isLoading]);

  // Handle screen navigation
  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen);
  };

  // Handle onboarding completion
  const handleOnboardingComplete = (permissions?: any) => {
    console.log('Onboarding completed with permissions:', permissions);
    setCurrentScreen("dashboard");
  };

  // Handle email verification
  const handleEmailVerified = () => {
    setCurrentScreen("onboarding");
  };

  // Handle successful signup
  const handleSignupSuccess = () => {
    setCurrentScreen("verify-email");
  };

  // Handle successful login
  const handleLoginSuccess = () => {
    if (user?.isEmailVerified) {
      if (user?.onboardingCompleted) {
        setCurrentScreen("dashboard");
      } else {
        setCurrentScreen("onboarding");
      }
    } else {
      setCurrentScreen("verify-email");
    }
  };

  // Check if user should see landing page or dashboard
  useEffect(() => {
    if (!isLoading && user) {
      if (user.isEmailVerified && user.onboardingCompleted) {
        setCurrentScreen("dashboard");
      } else if (user.isEmailVerified) {
        setCurrentScreen("onboarding");
      } else {
        setCurrentScreen("verify-email");
      }
    } else if (!isLoading && !user) {
      setCurrentScreen("landing");
    }
  }, [isLoading, user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6a00] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading GoMAXPAIN...</p>
        </div>
      </div>
    );
  }

  // Render appropriate screen based on current state
  switch (currentScreen) {
    case "login":
      return <StitchDesign onScreenChange={handleScreenChange} onLoginSuccess={handleLoginSuccess} />;
    
    case "signup":
      return <SignUp onScreenChange={handleScreenChange} onSignupSuccess={handleSignupSuccess} />;
    
    case "forgot-password":
      return <ForgotPassword onScreenChange={handleScreenChange} />;
    
    case "reset-password":
      return <ResetPassword onScreenChange={handleScreenChange} />;
    
    case "verify-email":
      return <VerifyEmail onScreenChange={handleScreenChange} onEmailVerified={handleEmailVerified} />;
    
    case "onboarding":
      return <OnboardingFlow onScreenChange={handleScreenChange} onComplete={handleOnboardingComplete} />;
    
    case "dashboard":
      return <Dashboard onScreenChange={handleScreenChange} />;
    
    case "emergency-report":
      return <EmergencyReport onScreenChange={handleScreenChange} />;
    
    case "doctors":
      return <DoctorList onScreenChange={handleScreenChange} />;
    
    case "lawyers":
      return <LawyerList onScreenChange={handleScreenChange} />;
    
    case "appointments":
      return <AppointmentList onScreenChange={handleScreenChange} />;
    
    case "profile":
      return <UserProfile onScreenChange={handleScreenChange} />;
    
    case "settings":
      return <Settings onScreenChange={handleScreenChange} />;
    
    case "search":
      return <SearchResults onScreenChange={handleScreenChange} />;
    
    case "notifications":
      return <Notifications onScreenChange={handleScreenChange} />;
    
    case "professionals":
      return <ProfessionalDetails onScreenChange={handleScreenChange} />;
    
    case "reports":
      return <Reports onScreenChange={handleScreenChange} />;
    
    case "contact-support": // Added contact support route
      return <ContactSupport onScreenChange={handleScreenChange} />;
    
    case "landing": // Added landing page route
      return <LandingPage onScreenChange={handleScreenChange} />;
    
    default:
      return <LandingPage onScreenChange={handleScreenChange} />;
  }
};

// Onboarding Flow Component
const OnboardingFlow: React.FC<{
  onScreenChange: (screen: string) => void;
  onComplete: (permissions?: any) => void;
}> = ({ onScreenChange, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { completeOnboarding } = useAuth();

  const steps = [
    { component: Welcome, title: "Welcome" },
    { component: Features, title: "Features" },
    { component: Permissions, title: "Permissions" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePermissionsComplete = async (permissions: any) => {
    console.log('handlePermissionsComplete called with permissions:', permissions);
    try {
      console.log('Calling completeOnboarding with permissions:', permissions);
      await completeOnboarding(permissions);
      console.log('completeOnboarding successful, calling onComplete...');
      onComplete();
      console.log('onComplete called successfully!');
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <CurrentStepComponent
      onNext={handleNext}
      onBack={handleBack}
      onComplete={handlePermissionsComplete}
      currentStep={currentStep}
      totalSteps={steps.length}
    />
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;