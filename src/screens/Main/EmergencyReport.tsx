import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Camera, MapPin, Phone, AlertTriangle, X, Upload, CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Header } from "../../components/common/Header";
import { useAuth } from "../../contexts/AuthContext";

interface EmergencyReportProps {
  onScreenChange: (screen: string) => void;
}

interface EmergencyReportData {
  type: string;
  location: {
    address: string;
    coordinates?: { lat: number; lng: number };
    useCurrentLocation: boolean;
  };
  description: string;
  photos: File[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  status: 'draft' | 'submitted' | 'under_review' | 'resolved';
}

export const EmergencyReport = ({ onScreenChange }: EmergencyReportProps): JSX.Element => {
  const { user, token } = useAuth();
  const [selectedType, setSelectedType] = useState("");
  const [location, setLocation] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emergencyTypes = [
    { id: "car", label: "Car Accident", icon: "🚗", severity: 'high' },
    { id: "medical", label: "Medical Emergency", icon: "🏥", severity: 'critical' },
    { id: "workplace", label: "Workplace Injury", icon: "🏢", severity: 'medium' },
    { id: "slip", label: "Slip & Fall", icon: "⚠️", severity: 'medium' },
    { id: "other", label: "Other", icon: "📋", severity: 'low' },
  ];

  // Get current location
  const getCurrentLocation = () => {
    setIsLocationLoading(true);
    setErrors({});

    if (!navigator.geolocation) {
      setErrors({ location: "Geolocation is not supported by this browser." });
      setIsLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        setUseCurrentLocation(true);
        
        // Reverse geocode to get address
        reverseGeocode(latitude, longitude);
        setIsLocationLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setErrors({ location: "Unable to get your current location. Please enter address manually." });
        setIsLocationLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Reverse geocoding using OpenStreetMap Nominatim API
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      if (data.display_name) {
        setLocation(data.display_name);
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      setLocation(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setErrors({ photos: "Photos must be less than 10MB each." });
        return false;
      }
      if (!file.type.startsWith('image/')) {
        setErrors({ photos: "Only image files are allowed." });
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setPhotos(prev => [...prev, ...validFiles]);
      setErrors({ photos: "" });
    }
  };

  // Remove photo
  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!selectedType) {
      newErrors.type = "Please select an incident type.";
    }

    if (!location.trim()) {
      newErrors.location = "Please provide a location.";
    }

    if (!description.trim()) {
      newErrors.description = "Please describe what happened.";
    }

    if (description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit emergency report
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const reportData: EmergencyReportData = {
        type: selectedType,
        location: {
          address: location,
          coordinates: coordinates || undefined,
          useCurrentLocation
        },
        description,
        photos,
        severity: emergencyTypes.find(t => t.id === selectedType)?.severity || 'medium',
        timestamp: new Date(),
        status: 'submitted'
      };

      // If we have a token, submit to backend
      if (token) {
        const formData = new FormData();
        formData.append('type', reportData.type);
        formData.append('location', JSON.stringify(reportData.location));
        formData.append('description', reportData.description);
        formData.append('severity', reportData.severity);
        formData.append('timestamp', reportData.timestamp.toISOString());
        
        photos.forEach((photo, index) => {
          formData.append(`photos`, photo);
        });

        const response = await fetch('http://localhost:5000/api/emergency-reports', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (!response.ok) {
          throw new Error('Failed to submit report');
        }
      }

      // Show success message
      setShowSuccess(true);
      
      // Reset form after 3 seconds and go back to dashboard
      setTimeout(() => {
        onScreenChange("dashboard");
      }, 3000);

    } catch (error) {
      console.error('Error submitting report:', error);
      setErrors({ submit: "Failed to submit report. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update severity when type changes
  useEffect(() => {
    if (selectedType) {
      const type = emergencyTypes.find(t => t.id === selectedType);
      if (type) {
        setSeverity(type.severity);
      }
    }
  }, [selectedType]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Report Emergency" showBack onBack={() => onScreenChange("dashboard")} />

      <main className="flex-1 px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">Report Submitted Successfully!</h3>
                <p className="text-green-700">Redirecting to dashboard...</p>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Alert */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 lg:px-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-red-900 text-sm sm:text-base lg:text-lg">Emergency Situation?</h3>
              <p className="text-xs sm:text-sm lg:text-base text-red-700">If this is a life-threatening emergency, call 911 immediately</p>
            </div>
          </div>
          <Button 
            className="w-full mt-3 bg-red-600 hover:bg-red-700 text-xs sm:text-sm lg:text-base h-10 sm:h-12"
            onClick={() => window.open('tel:911')}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call 911
          </Button>
        </div>

        {/* Incident Type */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3">What happened?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {emergencyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-3 sm:p-4 lg:p-6 rounded-lg border-2 transition-colors ${
                  selectedType === type.id
                    ? "border-[#ff6a00] bg-orange-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="text-xl sm:text-2xl lg:text-3xl mb-2">{type.icon}</div>
                <div className="text-xs sm:text-sm lg:text-base font-medium text-gray-900">{type.label}</div>
                <div className={`text-xs px-2 py-1 rounded-full mt-2 ${
                  type.severity === 'critical' ? 'bg-red-100 text-red-800' :
                  type.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                  type.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {type.severity.charAt(0).toUpperCase() + type.severity.slice(1)} Priority
                </div>
              </button>
            ))}
          </div>
          {errors.type && <p className="text-red-600 text-sm mt-2">{errors.type}</p>}
        </div>

        {/* Location */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3">Location</h2>
          <div className="space-y-2 sm:space-y-3">
            <Button 
              variant="outline" 
              className="w-full h-10 sm:h-12 justify-start text-xs sm:text-sm lg:text-base"
              onClick={getCurrentLocation}
              disabled={isLocationLoading}
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-[#ff6a00]" />
              {isLocationLoading ? "Getting location..." : "Use Current Location"}
            </Button>
            <Input
              placeholder="Or enter address manually..."
              className="h-10 sm:h-12 text-xs sm:text-sm lg:text-base"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {useCurrentLocation && coordinates && (
              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                📍 Coordinates: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
              </div>
            )}
          </div>
          {errors.location && <p className="text-red-600 text-sm mt-2">{errors.location}</p>}
        </div>

        {/* Description */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3">Description</h2>
          <textarea
            placeholder="Please describe what happened in detail..."
            className="w-full h-24 sm:h-32 lg:h-40 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#ff6a00] focus:border-transparent text-xs sm:text-sm lg:text-base"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {description.length}/500 characters
            </span>
            {description.length < 20 && description.length > 0 && (
              <span className="text-xs text-orange-600">
                At least 20 characters required
              </span>
            )}
          </div>
          {errors.description && <p className="text-red-600 text-sm mt-2">{errors.description}</p>}
        </div>

        {/* Photos */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3">Photos (Optional)</h2>
          
          {/* Photo Grid */}
          {photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-24 sm:h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Button 
            variant="outline" 
            className="w-full h-16 sm:h-20 lg:h-24 border-dashed text-xs sm:text-sm lg:text-base"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            {photos.length > 0 ? `Add More Photos (${photos.length}/10)` : "Add Photos"}
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          
          <p className="text-xs text-gray-500 mt-2">
            Maximum 10 photos, 10MB each. Supported formats: JPG, PNG, GIF
          </p>
          {errors.photos && <p className="text-red-600 text-sm mt-2">{errors.photos}</p>}
        </div>

        {/* Submit */}
        <div className="space-y-2 sm:space-y-3">
          <Button 
            className="w-full h-10 sm:h-12 lg:h-14 bg-[#ff6a00] hover:bg-[#e55a00] text-xs sm:text-sm lg:text-base"
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedType || !location.trim() || !description.trim()}
          >
            {isSubmitting ? "Submitting Report..." : "Submit Report"}
          </Button>
          
          {errors.submit && <p className="text-red-600 text-sm text-center">{errors.submit}</p>}
          
          <p className="text-xs sm:text-sm text-gray-500 text-center">
            Your report will be reviewed and you'll be connected with appropriate professionals
          </p>
        </div>
      </main>
    </div>
  );
};