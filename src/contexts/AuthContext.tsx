import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// This comment helps Vite's HMR system understand the module structure
// @refresh reset

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  onboardingCompleted: boolean;
  permissions?: {
    location: boolean;
    notifications: boolean;
    camera: boolean;
    phone: boolean;
  };
  emergencyContacts?: Array<{
    id: string;
    name: string;
    relationship: string;
    phone: string;
  }>;
  profile?: {
    avatar?: string;
    dateOfBirth?: string;
    address?: string;
    insurance?: string;
  };
  preferences?: {
    language: string;
    darkMode: boolean;
    autoLock: string;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  verifyEmail: (code: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  completeOnboarding: (permissions: any) => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  updatePreferences: (preferences: any) => Promise<void>;
  addEmergencyContact: (contact: any) => Promise<void>;
  updateEmergencyContact: (id: string, contact: any) => Promise<void>;
  deleteEmergencyContact: (id: string) => Promise<void>;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for using auth context
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:5000/api';

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (error) {
          console.error('Auth check error:', error);
          // Check if it's a connection error
          if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            console.warn('Backend server appears to be offline. Please ensure the backend is running.');
          }
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Login error:', error);
      // Check if it's a connection error
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to server. Please ensure the backend is running.');
      }
      throw error;
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Signup error:', error);
      // Check if it's a connection error
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to server. Please ensure the backend is running.');
      }
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const verifyEmail = async (code: string) => {
    if (!token) throw new Error('No authentication token');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Email verification failed');
      }

      setUser(data.user);
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset request failed');
      }

      return data.resetToken; // In production, this would be sent via email
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  };

  const resetPassword = async (resetToken: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: resetToken, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  };

  const completeOnboarding = async (permissions: any) => {
    console.log('completeOnboarding called with permissions:', permissions);
    if (!token) throw new Error('No authentication token');

    try {
      console.log('Making API call to complete onboarding...');
      const response = await fetch(`${API_BASE_URL}/user/complete-onboarding`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ permissions }),
      });

      const data = await response.json();
      console.log('API response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Onboarding completion failed');
      }

      console.log('Setting user data:', data.user);
      setUser(data.user);
      console.log('Onboarding completed successfully!');
    } catch (error) {
      console.error('Complete onboarding error:', error);
      throw error;
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    if (!token) throw new Error('No authentication token');

    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Profile update failed');
      }

      setUser(data.user);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const updatePreferences = async (preferences: any) => {
    if (!token) throw new Error('No authentication token');

    try {
      const response = await fetch(`${API_BASE_URL}/user/preferences`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Preferences update failed');
      }

      setUser(data.user);
    } catch (error) {
      console.error('Update preferences error:', error);
      throw error;
    }
  };

  const addEmergencyContact = async (contact: any) => {
    if (!token) throw new Error('No authentication token');

    try {
      const response = await fetch(`${API_BASE_URL}/user/emergency-contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add emergency contact');
      }

      setUser(prevUser => prevUser ? {
        ...prevUser,
        emergencyContacts: data.emergencyContacts
      } : null);
    } catch (error) {
      console.error('Add emergency contact error:', error);
      throw error;
    }
  };

  const updateEmergencyContact = async (id: string, contact: any) => {
    if (!token) throw new Error('No authentication token');

    try {
      const response = await fetch(`${API_BASE_URL}/user/emergency-contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update emergency contact');
      }

      setUser(prevUser => prevUser ? {
        ...prevUser,
        emergencyContacts: data.emergencyContacts
      } : null);
    } catch (error) {
      console.error('Update emergency contact error:', error);
      throw error;
    }
  };

  const deleteEmergencyContact = async (id: string) => {
    if (!token) throw new Error('No authentication token');

    try {
      const response = await fetch(`${API_BASE_URL}/user/emergency-contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete emergency contact');
      }

      setUser(prevUser => prevUser ? {
        ...prevUser,
        emergencyContacts: data.emergencyContacts
      } : null);
    } catch (error) {
      console.error('Delete emergency contact error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    signup,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    completeOnboarding,
    updateProfile,
    updatePreferences,
    addEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Export the hook and provider
export { useAuth, AuthProvider };
