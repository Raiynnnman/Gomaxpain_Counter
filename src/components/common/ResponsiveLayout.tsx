import React from "react";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  className = "",
  maxWidth = "full",
  padding = "md",
}) => {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  };

  const paddingClasses = {
    none: "",
    sm: "px-3 sm:px-4 lg:px-6",
    md: "px-4 sm:px-6 lg:px-8",
    lg: "px-6 sm:px-8 lg:px-12",
  };

  return (
    <div className={`mx-auto w-full ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

// Responsive container with different behaviors for different screen sizes
export const ResponsiveContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div className={`container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 ${className}`}>
      {children}
    </div>
  );
};

// Responsive grid component
export const ResponsiveGrid: React.FC<{
  children: React.ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    wide?: number;
  };
  gap?: "sm" | "md" | "lg";
  className?: string;
}> = ({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
  gap = "md",
  className = "" 
}) => {
  const gridCols = {
    mobile: cols.mobile || 1,
    tablet: cols.tablet || cols.mobile || 1,
    desktop: cols.desktop || cols.tablet || cols.mobile || 1,
    wide: cols.wide || cols.desktop || cols.tablet || cols.mobile || 1,
  };

  const gapClasses = {
    sm: "gap-2 sm:gap-3",
    md: "gap-3 sm:gap-4 lg:gap-6",
    lg: "gap-4 sm:gap-6 lg:gap-8",
  };

  const gridClasses = `grid grid-cols-${gridCols.mobile} sm:grid-cols-${gridCols.tablet} lg:grid-cols-${gridCols.desktop} xl:grid-cols-${gridCols.wide} ${gapClasses[gap]}`;

  return (
    <div className={`${gridClasses} ${className}`}>
      {children}
    </div>
  );
};

// Responsive text component
export const ResponsiveText: React.FC<{
  children: React.ReactNode;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
}> = ({ 
  children, 
  size = "base", 
  weight = "normal",
  className = "" 
}) => {
  const sizeClasses = {
    xs: "text-xs sm:text-sm",
    sm: "text-sm sm:text-base",
    base: "text-sm sm:text-base lg:text-lg",
    lg: "text-base sm:text-lg lg:text-xl",
    xl: "text-lg sm:text-xl lg:text-2xl",
    "2xl": "text-xl sm:text-2xl lg:text-3xl",
    "3xl": "text-2xl sm:text-3xl lg:text-4xl",
    "4xl": "text-3xl sm:text-4xl lg:text-5xl",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  return (
    <div className={`${sizeClasses[size]} ${weightClasses[weight]} ${className}`}>
      {children}
    </div>
  );
}; 