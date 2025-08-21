import React from "react";
import { ArrowLeft, Star, MapPin, Clock, Phone, MessageCircle, Calendar } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Header } from "../../components/common/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

export const DoctorProfile = (): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header showBack />

      <main className="flex-1">
        {/* Doctor Header */}
        <div className="bg-white px-4 py-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-bold text-lg">SJ</span>
            </div>
            
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 mb-1">Dr. Sarah Johnson</h1>
              <p className="text-gray-600 mb-2">Emergency Medicine Specialist</p>
              
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">4.9</span>
                  <span className="text-sm text-gray-500">(127 reviews)</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">0.5 miles away</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm text-green-600 font-medium">Available Now</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-[#ff6a00] hover:bg-[#e55a00]">
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-4 space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Dr. Sarah Johnson is a board-certified emergency medicine physician with over 10 years of experience. 
                  She specializes in trauma care, critical care medicine, and emergency procedures. Dr. Johnson is 
                  committed to providing compassionate, high-quality care to all her patients.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Education & Certifications</h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-gray-900">MD - Harvard Medical School</p>
                    <p className="text-sm text-gray-600">2010</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Emergency Medicine Residency</p>
                    <p className="text-sm text-gray-600">Johns Hopkins Hospital, 2014</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Board Certified</p>
                    <p className="text-sm text-gray-600">American Board of Emergency Medicine</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Hospital Affiliations</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">• City General Hospital</p>
                  <p className="text-gray-600">• Metropolitan Medical Center</p>
                  <p className="text-gray-600">• Regional Trauma Center</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-4 space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Patient Reviews</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-bold">4.9</span>
                    <span className="text-gray-500">(127 reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Dr. Johnson was incredibly professional and caring. She took the time to explain 
                      everything and made me feel comfortable during a very stressful situation."
                    </p>
                    <p className="text-xs text-gray-500 mt-1">- Anonymous Patient</p>
                  </div>
                  
                  <div className="border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Excellent care and very knowledgeable. The wait time was minimal and the staff 
                      was very helpful. Highly recommend!"
                    </p>
                    <p className="text-xs text-gray-500 mt-1">- Anonymous Patient</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  View All Reviews
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="availability" className="mt-4 space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">This Week</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Today</p>
                      <p className="text-sm text-gray-600">March 15, 2024</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-green-600 font-medium">Available</span>
                      </div>
                      <p className="text-xs text-gray-500">Next: 2:30 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Tomorrow</p>
                      <p className="text-sm text-gray-600">March 16, 2024</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-green-600 font-medium">Available</span>
                      </div>
                      <p className="text-xs text-gray-500">From: 9:00 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Sunday</p>
                      <p className="text-sm text-gray-600">March 17, 2024</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span className="text-sm text-red-600 font-medium">Unavailable</span>
                      </div>
                      <p className="text-xs text-gray-500">Day off</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};