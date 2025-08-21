import React, { useState } from "react";
import { ArrowLeft, Mail, Phone, MessageCircle, Clock, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Header } from "../../components/common/Header";

interface ContactSupportProps {
  onScreenChange: (screen: string) => void;
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export const ContactSupport = ({ onScreenChange }: ContactSupportProps): JSX.Element => {
  const [contactMethod, setContactMethod] = useState<'form' | 'phone' | 'email'>('form');
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const contactMethods = [
    {
      id: 'form',
      title: 'Contact Form',
      description: 'Send us a detailed message',
      icon: MessageCircle,
      color: 'bg-blue-500',
      action: () => setContactMethod('form')
    },
    {
      id: 'phone',
      title: 'Call Us',
      description: 'Speak directly with support',
      icon: Phone,
      color: 'bg-green-500',
      action: () => setContactMethod('phone')
    },
    {
      id: 'email',
      title: 'Email Us',
      description: 'Send us an email directly',
      icon: Mail,
      color: 'bg-purple-500',
      action: () => setContactMethod('email')
    }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-green-600 bg-green-100' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600 bg-yellow-100' },
    { value: 'high', label: 'High', color: 'text-orange-600 bg-orange-100' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-600 bg-red-100' }
  ];

  const supportInfo = {
    phone: '+1 (555) 123-4567',
    email: 'support@gomaxpain.com',
    hours: 'Monday - Friday: 9:00 AM - 6:00 PM EST',
    address: '123 Support Street, Help City, HC 12345'
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Contact form submitted:', formData);
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: 'medium'
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCallSupport = () => {
    window.location.href = `tel:${supportInfo.phone}`;
  };

  const handleEmailSupport = () => {
    window.location.href = `mailto:${supportInfo.email}?subject=Support Request`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Contact Support" showBack onBack={() => onScreenChange("dashboard")} />

      <main className="flex-1 px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-4 sm:mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <h3 className="font-medium text-green-800">Message Sent Successfully!</h3>
              <p className="text-sm text-green-600">We'll get back to you within 24 hours.</p>
            </div>
          </div>
        )}

        {/* Contact Methods */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-4">How can we help you?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={method.action}
                  className={`p-4 sm:p-6 rounded-lg border-2 transition-all duration-200 ${
                    contactMethod === method.id
                      ? 'border-[#ff6a00] bg-orange-50'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${method.color} rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto`}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">{method.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{method.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact Form */}
        {contactMethod === 'form' && (
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                    className={errors.name ? 'border-red-300 focus:border-red-500' : ''}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    className={errors.email ? 'border-red-300 focus:border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <Input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Brief description of your issue"
                  className={errors.subject ? 'border-red-300 focus:border-red-500' : ''}
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <div className="flex flex-wrap gap-2">
                  {priorityOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, priority: option.value as any }))}
                      className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                        formData.priority === option.value
                          ? option.color
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Please describe your issue in detail..."
                  rows={5}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6a00] focus:border-transparent resize-none ${
                    errors.message ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                <p className="text-gray-500 text-xs mt-1">
                  {formData.message.length}/1000 characters
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ff6a00] hover:bg-[#e55a00] text-white"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </div>
        )}

        {/* Phone Support */}
        {contactMethod === 'phone' && (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Our Support Team</h3>
            <p className="text-gray-600 mb-4">Speak directly with our support representatives</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-2xl font-bold text-[#ff6a00]">{supportInfo.phone}</p>
              <p className="text-sm text-gray-600 mt-1">Available {supportInfo.hours}</p>
            </div>
            
            <Button
              onClick={handleCallSupport}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </div>
        )}

        {/* Email Support */}
        {contactMethod === 'email' && (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Our Support Team</h3>
            <p className="text-gray-600 mb-4">Send us an email and we'll respond within 24 hours</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-xl font-semibold text-[#ff6a00]">{supportInfo.email}</p>
              <p className="text-sm text-gray-600 mt-1">Response time: 24 hours</p>
            </div>
            
            <Button
              onClick={handleEmailSupport}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-3"
            >
              <Mail className="w-5 h-5 mr-2" />
              Send Email
            </Button>
          </div>
        )}

        {/* Support Information */}
        <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Information</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Business Hours</p>
                <p className="text-sm text-gray-600">{supportInfo.hours}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Office Address</p>
                <p className="text-sm text-gray-600">{supportInfo.address}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">General Inquiries</p>
                <p className="text-sm text-gray-600">info@gomaxpain.com</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 