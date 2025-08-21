import React from "react";
import { ArrowLeft, Menu, Bell, Search } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
  showNotifications?: boolean;
  showSearch?: boolean;
  onBack?: () => void;
  onMenu?: () => void;
  onNotifications?: () => void;
  onSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showMenu = false,
  showNotifications = false,
  showSearch = false,
  onBack,
  onMenu,
  onNotifications,
  onSearch,
}) => {
  return (
    <header className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 bg-white border-b border-gray-200">
      <div className="flex items-center min-w-0 flex-1">
        {showBack && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack} 
            className="mr-2 p-1.5 sm:p-2 flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        )}
        {showMenu && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMenu} 
            className="mr-2 p-1.5 sm:p-2 flex-shrink-0"
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        )}
        {title && (
          <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 truncate">
            {title}
          </h1>
        )}
      </div>
      
      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
        {showSearch && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSearch}
            className="p-1.5 sm:p-2"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        )}
        {showNotifications && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onNotifications}
            className="p-1.5 sm:p-2"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        )}
      </div>
    </header>
  );
};