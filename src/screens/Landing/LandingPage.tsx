import React from "react";
import { ArrowRight, Shield, Users, Clock, Star, CheckCircle, Phone, Mail, MapPin, Globe } from "lucide-react";
import { Button } from "../../components/ui/button";

interface LandingPageProps {
  onScreenChange: (screen: string) => void;
}

const howItWorksData = {
  mainStep: {
    number: 1,
    title: 'Accident Occurs',
    description: 'Real-time accident detected by GoMAXPAIN engine. Data pulled from 1000s of API platforms.',
    imageUrl: '../../images/accdentsideimage.avif'
  },
  timelineSteps: [
    { number: 2, text: 'Injured Patient\nIdentified', position: 'bottom' },
    { number: 3, text: 'Targeted digital\noutreach', position: 'top' },
    { number: 4, text: 'Instantly matched with\ndoctor + attorney', position: 'bottom' },
    { number: 5, text: 'Doctors & attorneys receive\nmatch alert', position: 'top' },
    { number: 6, text: '5-minute window\nto accept', position: 'bottom' },
    { number: 7, text: 'Services begin\n(medical/legal)', position: 'top' },
  ]
};

export const LandingPage = ({ onScreenChange }: LandingPageProps): JSX.Element => {
  const features = [
    {
      icon: Shield,
      title: "24/7 Emergency Support",
      description: "Get immediate assistance for any emergency situation"
    },
    {
      icon: Users,
      title: "Expert Professionals",
      description: "Connect with qualified doctors and lawyers"
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Fast response times when you need help most"
    },
    {
      icon: Star,
      title: "Trusted Platform",
      description: "Reliable and secure emergency reporting system"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Medical Professional",
      content: "GoMAXPAIN has revolutionized how we handle emergency situations. The response time is incredible!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Legal Advisor",
      content: "The platform makes it easy to connect with clients in urgent need of legal assistance.",
      rating: 5
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Emergency Physician",
      content: "This app has significantly improved our emergency response coordination. Highly recommended!",
      rating: 5
    }
  ];

  const stats = [
    { number: "10K+", label: "Users Helped" },
    { number: "500+", label: "Professionals" },
    { number: "24/7", label: "Support" },
    { number: "2min", label: "Response Time" }
  ];

  const contactInfo = {
    phone: "+1 (555) 123-4567",
    email: "info@gomaxpain.com",
    address: "123 Emergency Lane, Response City, RC 12345"
  };

  const howItWorksData = {
    mainStep: {
      number: "1",
      title: "Accident Occurs",
      description: "Real-time accident detected by GoMAXPAIN engine. Data pulled from 1000s of API platforms.",
      imageUrl: "/smartphone-videocall.jpg"
    },
    timelineSteps: [
      { number: "2", text: "Injured Patient Identified", position: "above" },
      { number: "3", text: "Targeted digital outreach", position: "above" },
      { number: "4", text: "Instantly matched with doctor + attorney", position: "below" },
      { number: "5", text: "Doctors & attorneys receive match alert", position: "above" },
      { number: "6", text: "5-minute window to accept", position: "below" },
      { number: "7", text: "Services begin (medical/legal)", position: "above" }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                    MAX<span className="text-red-500">P</span>AIN
                  </span>
                </div>
              </div>
            </div>
            
            {/* Center Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button className="text-white hover:text-gray-300 transition-colors">Friends</button>
              <button className="text-white hover:text-gray-300 transition-colors">Providers</button>
              <button className="text-white hover:text-gray-300 transition-colors">Attorneys</button>
              <button className="text-white hover:text-gray-300 transition-colors">About</button>
              <button className="text-white hover:text-gray-300 transition-colors">Careers</button>
            </div>
            
            {/* Right Side - Language, Help, Login, Join Button */}
            <div className="flex items-center space-x-6">
              {/* Language Selector */}
              <div className="flex items-center space-x-2 text-white">
                <Globe className="w-4 h-4" />
                <span className="text-sm">English</span>
              </div>
              
              {/* Help Link */}
              <button 
                className="text-white hover:text-gray-300 transition-colors text-sm"
                onClick={() => onScreenChange("contact-support")}
              >
                help
              </button>
              
              {/* Login Link */}
              <button 
                className="text-white hover:text-gray-300 transition-colors text-sm"
                onClick={() => onScreenChange("login")}
              >
                Log In
              </button>
              
              {/* Join MAX Button */}
              <Button
                onClick={() => onScreenChange("signup")}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-lg font-medium"
              >
                Join MAX
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Highway Scene */}
      <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black overflow-hidden">
        {/* Highway Background with Cars */}
        <div className="absolute inset-0">
          {/* Highway Lanes */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gray-800">
            <div className="flex space-x-8 justify-center items-center h-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1 h-16 bg-white border-dashed border-white"></div>
              ))}
            </div>
          </div>
          
          {/* Cars on Highway */}
          <div className="absolute bottom-8 left-10 w-16 h-8 bg-gray-700 rounded-lg transform rotate-12"></div>
          <div className="absolute bottom-12 left-32 w-20 h-10 bg-gray-600 rounded-lg transform -rotate-6"></div>
          <div className="absolute bottom-16 left-56 w-18 h-9 bg-gray-500 rounded-lg transform rotate-3"></div>
          <div className="absolute bottom-20 left-80 w-16 h-8 bg-gray-400 rounded-lg transform -rotate-12"></div>
          <div className="absolute bottom-24 right-32 w-20 h-10 bg-gray-300 rounded-lg transform rotate-6"></div>
          <div className="absolute bottom-28 right-16 w-18 h-9 bg-gray-200 rounded-lg transform -rotate-3"></div>
          
          {/* Glowing Data Lines and Circles */}
          <div className="absolute top-20 left-20 w-32 h-32 border border-cyan-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-blue-400 rounded-full opacity-40 animate-ping"></div>
          <div className="absolute bottom-40 left-1/4 w-16 h-16 border border-teal-400 rounded-full opacity-50 animate-pulse"></div>
          
          {/* Data Flow Lines */}
          <div className="absolute top-32 left-16 w-1 h-20 bg-gradient-to-b from-cyan-400 to-transparent opacity-60"></div>
          <div className="absolute top-48 right-24 w-1 h-16 bg-gradient-to-b from-blue-400 to-transparent opacity-60"></div>
          <div className="absolute bottom-32 left-1/3 w-1 h-24 bg-gradient-to-b from-teal-400 to-transparent opacity-60"></div>
          
          {/* Buildings and Trees Silhouette */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-800 to-transparent">
            <div className="flex justify-between px-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-4 h-16 bg-gray-700 rounded-t-lg"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Central Content Box */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            {/* GoMAXPAIN Logo Box */}
            <div className="bg-blue-900 bg-opacity-80 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-blue-700 shadow-2xl">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none">
                <span className="text-red-500">Go</span>
                <span className="text-orange-500">MAX</span>
                <span className="text-orange-400">PAIN</span>
              </h1>
            </div>
            
            {/* Tagline */}
            <p className="text-white text-xl sm:text-2xl lg:text-3xl font-medium mb-12 max-w-4xl mx-auto leading-relaxed">
              America's First Real-Time Accident detector and Matchmaker for Patients, Doctors & Lawyers
            </p>
            
            {/* Scroll Down Arrow */}
            <div className="flex justify-center mb-8">
              <button 
                onClick={() => document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-12 h-12 border-2 border-orange-500 rounded-full flex items-center justify-center animate-bounce hover:bg-orange-500 hover:border-orange-400 transition-all duration-300 cursor-pointer group"
              >
                <ArrowRight className="w-6 h-6 text-orange-500 transform rotate-90 group-hover:text-white transition-colors duration-300" />
              </button>
            </div>
            
            {/* Company Credit */}
            <p className="text-white text-sm opacity-80">
              By Pound Pain Technology
            </p>
          </div>
        </div>
      </section>

      {/* Problems & Statistics Section */}
      <section className="py-20 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Left Column - Problems (65% width) */}
            <div className="lg:w-[65%] bg-gray-50 p-6 lg:p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <div className="w-2 h-2 bg-orange-500 transform rotate-45 mr-3"></div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">PROBLEMS</h2>
              </div>
              
              <div className="mb-6">
                <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                  No 'Uber or even Zocdoc for accidents'.{' '}
                  <span className="text-orange-500 font-semibold">5.1M</span> U.S. accidents with injuries annually, 
                  most without coordinated support and{' '}
                  <span className="text-orange-500 font-semibold">40%</span> never seek legal advice. 
                  No guidance through the fragmented Personal Injury process.
                </p>
              </div>
              
              {/* 2x2 Grid Layout for Problems */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {/* Accidents/Patients */}
                <div className="bg-white p-4 lg:p-5 rounded-xl shadow-sm">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-5 h-5 border-2 border-orange-500 rounded-full relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-sm lg:text-base font-semibold text-gray-800">Accidents/Patients</h3>
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                     Stressful, predatory, uncoordinated recovery experience. Low trust. Poor communication, 
                     organization, no smart app, not patient care centered.
                  </p>
                </div>
                
                {/* Doctors */}
                <div className="bg-white p-4 lg:p-5 rounded-xl shadow-sm">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-5 h-5 border-2 border-orange-500 rounded-full flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
                      </div>
                    </div>
                    <h3 className="text-sm lg:text-base font-semibold text-gray-800">Doctors</h3>
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                     No coordination of patient recovery, high marketing & patient acquisition costs, 
                     industry shift away from referrals to chiropractors. Low trust in peer referral reciprocation.
                  </p>
                </div>
                
                {/* Lawyers */}
                <div className="bg-white p-4 lg:p-5 rounded-xl shadow-sm">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-5 h-5 border-2 border-orange-500 rounded-lg flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm lg:text-base font-semibold text-gray-800">Lawyers</h3>
                    </div>
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                     High <span className="font-semibold">$2,000 CAC</span>, dominated by illegal risky pay-per-leads, 
                     shady marketers, referrals and Google ad wars. Poor client communication, management. 
                     No coordination with doctors or patients.
                  </p>
                </div>
                
                {/* End Users */}
                <div className="bg-white p-4 lg:p-5 rounded-xl shadow-sm">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-5 h-5 border-2 border-orange-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mx-0.5"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full mx-0.5"></div>
                      </div>
                    </div>
                    <h3 className="text-sm lg:text-base font-semibold text-gray-800">End Users</h3>
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                     No central integration, monetization for crowdsourcing participation while using safety, 
                     travel or social apps. Longer, stressful commutes.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Statistics Banner (35% width) */}
            <div className="lg:w-[35%] bg-gradient-to-br from-orange-500 to-red-500 p-6 lg:p-8 rounded-2xl text-white min-h-[450px] flex flex-col">
              <div className="text-right mb-8">
                <div className="inline-block bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                  <span className="text-sm font-semibold">GOMAXPAIN</span>
                </div>
              </div>
              
              <div className="space-y-8 flex-1 flex flex-col justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-3">$57.3B</div>
                  <div className="text-base opacity-90">U.S. Personal Injury Revenue 2024</div>
                </div>
                
                <div className="text-center">
                  <div className="text-5xl font-bold mb-3">5.1M</div>
                  <div className="text-base opacity-90">U.S. Accidents with Injury 2024</div>
                </div>
                
                <div className="text-center">
                  <div className="text-5xl font-bold mb-3">40%</div>
                  <div className="text-base opacity-90">Of accident victims never seek legal advice</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-gray-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          {/* City Skyline Silhouettes */}
          <div className="absolute left-0 bottom-0 w-full h-64">
            <div className="w-16 h-32 bg-gray-400 absolute left-8 bottom-0 rounded-t-lg"></div>
            <div className="w-12 h-40 bg-gray-400 absolute left-32 bottom-0 rounded-t-lg"></div>
            <div className="w-20 h-28 bg-gray-400 absolute left-52 bottom-0 rounded-t-lg"></div>
            <div className="w-14 h-36 bg-gray-400 absolute left-80 bottom-0 rounded-t-lg"></div>
            <div className="w-18 h-24 bg-gray-400 absolute left-96 bottom-0 rounded-t-lg"></div>
            <div className="w-16 h-44 bg-gray-400 absolute right-32 bottom-0 rounded-t-lg"></div>
            <div className="w-12 h-32 bg-gray-400 absolute right-16 bottom-0 rounded-t-lg"></div>
            <div className="w-20 h-36 bg-gray-400 absolute right-4 bottom-0 rounded-t-lg"></div>
          </div>
          
          {/* Orange Concentric Circles */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <div className="w-64 h-64 border border-orange-300 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2"></div>
            <div className="w-48 h-48 border border-orange-300 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2"></div>
            <div className="w-32 h-32 border border-orange-300 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2"></div>
          </div>
        </div>



        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Side - Solutions Text */}
            <div className="lg:w-1/2">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-orange-500 transform rotate-45 mr-4"></div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">SOLUTIONS</h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                  GoMAXPAIN is the first national platform that uses smart technology to detect accidents anywhere anytime and then match accident victims with vetted doctors and lawyers-in minutes.
                </p>
                
                <p className="text-xl lg:text-2xl font-bold text-gray-800">
                  We bring Uber-speed and Zocdoc-ease to the{' '}
                  <span className="text-orange-500">$57B</span> personal injury market.
                </p>
              </div>
            </div>
            
            {/* Right Side - Smartphone Image */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                {/* GOMAXPAIN Button */}
                <div className="text-center mb-6">
                  {/* <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-300 shadow-lg">
                    GOMAXPAIN
                  </button> */}
                </div>
                
                                {/* Smartphone Image */}
                <div className="relative">
                  <img 
                    src="/smartphone-videocall.jpg" 
                    className="w-96 h-auto rounded-3xl shadow-2xl"
                  />
                  
                  {/* GoMAXPAIN Logo overlay */}
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">G</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - COMMENTED OUT */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section - COMMENTED OUT */}
      {/* <section id="features-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MAXPAIN?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides comprehensive emergency response solutions with cutting-edge technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* How GoMAXPAIN Works Section */}
      <section id="how-it-works-section" className="py-20 bg-white relative overflow-hidden" aria-labelledby="how-it-works-title">
        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Top Bar */}
          {/* <div className="absolute top-0 right-0 w-1/3 h-2 bg-orange-500"></div> */}
          
          {/* GOMAXPAIN Logo Pill */}
          {/* <div className="absolute top-8 right-8 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold z-10">
            GOMAXPAIN
          </div> */}
          
          {/* Section Header */}
          <h2 id="how-it-works-title" className="text-4xl font-bold text-gray-800 mb-16 ml-16 relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-3 border-l-orange-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
            HOW GOMAXPAIN WORKS
          </h2>
          
          {/* Content Container */}
          <div className="flex flex-col lg:flex-row items-center gap-8 relative">
            {/* Main Step */}
            <div className="flex-shrink-0 relative">
              <div 
                className="w-64 h-64 rounded-full bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${howItWorksData.mainStep.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                  <div className="absolute top-4 right-4 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold">
                    {howItWorksData.mainStep.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{howItWorksData.mainStep.title}</h3>
                  <p className="text-sm leading-tight opacity-90">{howItWorksData.mainStep.description}</p>
                </div>
              </div>
              {/* Arrow pointing right */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full w-0 h-0 border-l-4 border-l-orange-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
            </div>

            {/* Timeline Steps */}
            <div className="flex-1 flex flex-row items-center gap-8 relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-orange-500 transform -translate-y-1/2 z-0"></div>
              
              {howItWorksData.timelineSteps.map((step) => (
                <div className={`flex flex-col items-center gap-3 relative z-10 ${step.position === 'top' ? 'flex-col-reverse' : ''}`} key={step.number}>
                  <p className="text-sm font-semibold text-gray-800 text-center whitespace-pre-line max-w-36">
                    {step.text}
                  </p>
                  {/* Dotted line connecting text to circle */}
                  <div className="w-px h-6 border-l border-dotted border-gray-400"></div>
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                    {step.number}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center">
              <div className="w-0 h-0 border-l-3 border-l-orange-500 border-t-2 border-t-transparent border-b-2 border-b-transparent mr-4"></div>
              <h2 className="text-4xl font-bold text-gray-800">MEET OUR TEAM</h2>
            </div>
            <div className="bg-orange-500 text-white px-6 py-3 rounded-lg text-sm font-semibold">
              GoMAXPAIN
            </div>
          </div>
          
          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Sean Ranier "RAIN" Anthony */}
            <div className="text-center bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative mb-6">
                <img 
                  src="/public/cofunder1.jpg" 
                  alt="Sean Ranier 'RAIN' Anthony - Founder/CEO"
                  className="w-56 h-56 rounded-full mx-auto object-cover shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Sean Ranier "RAIN" Anthony</h3>
              <p className="text-orange-500 font-semibold text-lg mb-4">Founder/CEO</p>
              <div className="w-20 h-0.5 bg-orange-500 mx-auto mb-6"></div>
              <p className="text-gray-600 text-base leading-relaxed max-w-64 mx-auto">
                Rain is a streetwise, eccentric visionary with Wall Street experience, Columbia brains, and a pilot's license at 17. From creating Konami's RapStar to building biotech wearables, he builds bold ventures that fuse culture, chaos, and radical human uplift.
              </p>
            </div>
            
            {/* Winson "WIN" Burse */}
            <div className="text-center bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative mb-6">
                <img 
                  src="/public/patner2.jpg" 
                  alt="Winson 'WIN' Burse - President/Partner"
                  className="w-56 h-56 rounded-full mx-auto object-cover shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Winson "WIN" Burse</h3>
              <p className="text-orange-500 font-semibold text-lg mb-4">President/Partner</p>
              <div className="w-20 h-0.5 bg-orange-500 mx-auto mb-6"></div>
              <p className="text-gray-600 text-base leading-relaxed max-w-64 mx-auto">
                Harlem-born renaissance man, Win made his first million and circled the globe by 19. A real estate investor turned process architect, he fuses jazz, grit, and soul into GoMAXPAIN's grassroots growth—scaling impact with precision, purpose, and unapologetic swagger.
              </p>
            </div>
            
            {/* Samantha "SAMMIE" Diaz */}
            <div className="text-center bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative mb-6">
                <img 
                  src="/public/head3.jpg" 
                  alt="Samantha 'SAMMIE' Diaz - Head of Intake/Client Success"
                  className="w-56 h-56 rounded-full mx-auto object-cover shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Samantha "SAMMIE" Diaz</h3>
              <p className="text-orange-500 font-semibold text-lg mb-4">Head of Intake/Client Success</p>
              <div className="w-20 h-0.5 bg-orange-500 mx-auto mb-6"></div>
              <p className="text-gray-600 text-base leading-relaxed max-w-64 mx-auto">
                Chicago-born, bilingual, and relentless, Sammie brings 18 years of legal ops fire to GoMAXPAIN. A master paralegal and two-time law firm builder, she runs intake, client success, and call center ops—fusing grit, empathy, and precision into a national growth engine.
              </p>
            </div>
            
            {/* Dr. Joel Manion, D.C., M.D. */}
            <div className="text-center bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative mb-6">
                <img 
                  src="/public/advser4.jpg" 
                  alt="Dr. Joel Manion, D.C., M.D. - Advisor"
                  className="w-56 h-56 rounded-full mx-auto object-cover shadow-lg"
                />
                {/* Orange arrow icon */}
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-orange-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Dr. Joel Manion, D.C., M.D.</h3>
              <p className="text-orange-500 font-semibold text-lg mb-4">Advisor</p>
              <div className="w-20 h-0.5 bg-orange-500 mx-auto mb-6"></div>
              <p className="text-gray-600 text-base leading-relaxed max-w-64 mx-auto">
                Dr. Joel is a dual-licensed D.C./M.D. and former Path Medical COO who helped scale 1-800-411-PAIN into a household name. A strategic powerhouse, ex-FCA President, and provider-first advocate, he guides GoMAXPAIN's national growth with surgical precision and bold vision.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of users and professionals nationwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust MAXPAIN for their emergency response needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onScreenChange("signup")}
              className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-4"
            >
              Create Free Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onScreenChange("login")}
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4"
            >
              Sign In
            </Button>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  MAXPAIN
                </span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for emergency response and professional assistance.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => onScreenChange("signup")} className="hover:text-white">Sign Up</button></li>
                <li><button onClick={() => onScreenChange("login")} className="hover:text-white">Sign In</button></li>
                <li><button onClick={() => onScreenChange("contact-support")} className="hover:text-white">Support</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Emergency Reports</li>
                <li>Medical Assistance</li>
                <li>Legal Support</li>
                <li>24/7 Help</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {contactInfo.phone}
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {contactInfo.email}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {contactInfo.address}
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MAXPAIN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}; 