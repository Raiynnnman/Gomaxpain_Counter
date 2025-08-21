import React, { useState } from "react";
import { Bell, Check, X, Clock, AlertTriangle, Info } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Header } from "../../components/common/Header";

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const Notifications = ({ onScreenChange }: { onScreenChange: (screen: string) => void }): JSX.Element => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Appointment Confirmed',
      message: 'Your appointment with Dr. Sarah Johnson has been confirmed for tomorrow at 2:00 PM.',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'New Message',
      message: 'You have a new message from your lawyer regarding your case.',
      timestamp: '4 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: 'Payment Due',
      message: 'Your payment for the recent consultation is due in 3 days.',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: '4',
      type: 'error',
      title: 'Appointment Cancelled',
      message: 'Your appointment with Dr. Emily Chen has been cancelled due to an emergency.',
      timestamp: '2 days ago',
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'error':
        return 'border-l-red-500 bg-red-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleBack = () => {
    onScreenChange('dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Notifications" showBack onBack={handleBack} />
      
      <main className="flex-1 px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="text-lg font-semibold text-gray-900">
              Notifications ({notifications.length})
            </span>
          </div>
          
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={markAllAsRead}
            >
              Mark All as Read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border-l-4 ${getNotificationColor(notification.type)} ${
                  notification.read ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className={`font-medium text-gray-900 ${notification.read ? '' : 'font-semibold'}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center gap-2 ml-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{notification.timestamp}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    
                    <div className="flex items-center gap-2 mt-3">
                      {!notification.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up! Check back later for new updates.</p>
          </div>
        )}
      </main>
    </div>
  );
}; 