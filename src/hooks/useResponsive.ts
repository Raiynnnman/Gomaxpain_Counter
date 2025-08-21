import { useState, useEffect } from 'react';

export interface ResponsiveBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop' | 'wide';
}

export const useResponsive = (): ResponsiveBreakpoints => {
  const [breakpoints, setBreakpoints] = useState<ResponsiveBreakpoints>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isWide: false,
    screenSize: 'mobile',
  });

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      
      const newBreakpoints: ResponsiveBreakpoints = {
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024 && width < 1280,
        isWide: width >= 1280,
        screenSize: width < 640 ? 'mobile' : width < 1024 ? 'tablet' : width < 1280 ? 'desktop' : 'wide',
      };
      
      setBreakpoints(newBreakpoints);
    };

    // Set initial breakpoints
    updateBreakpoints();

    // Add event listener for window resize
    window.addEventListener('resize', updateBreakpoints);

    // Cleanup
    return () => window.removeEventListener('resize', updateBreakpoints);
  }, []);

  return breakpoints;
};

// Hook for checking if a specific breakpoint is active
export const useBreakpoint = (breakpoint: 'mobile' | 'tablet' | 'desktop' | 'wide'): boolean => {
  const responsive = useResponsive();
  
  switch (breakpoint) {
    case 'mobile':
      return responsive.isMobile;
    case 'tablet':
      return responsive.isTablet;
    case 'desktop':
      return responsive.isDesktop;
    case 'wide':
      return responsive.isWide;
    default:
      return false;
  }
};

// Hook for checking if screen is above a certain breakpoint
export const useBreakpointUp = (breakpoint: 'mobile' | 'tablet' | 'desktop' | 'wide'): boolean => {
  const responsive = useResponsive();
  
  switch (breakpoint) {
    case 'mobile':
      return true; // Always true
    case 'tablet':
      return responsive.isTablet || responsive.isDesktop || responsive.isWide;
    case 'desktop':
      return responsive.isDesktop || responsive.isWide;
    case 'wide':
      return responsive.isWide;
    default:
      return false;
  }
};

// Hook for checking if screen is below a certain breakpoint
export const useBreakpointDown = (breakpoint: 'mobile' | 'tablet' | 'desktop' | 'wide'): boolean => {
  const responsive = useResponsive();
  
  switch (breakpoint) {
    case 'mobile':
      return responsive.isMobile;
    case 'tablet':
      return responsive.isMobile;
    case 'desktop':
      return responsive.isMobile || responsive.isTablet;
    case 'wide':
      return responsive.isMobile || responsive.isTablet || responsive.isDesktop;
    default:
      return false;
  }
};

// Hook for responsive values
export const useResponsiveValue = <T>(
  mobile: T,
  tablet: T,
  desktop: T,
  wide: T
): T => {
  const responsive = useResponsive();
  
  if (responsive.isMobile) return mobile;
  if (responsive.isTablet) return tablet;
  if (responsive.isDesktop) return desktop;
  return wide;
};

// Hook for responsive array values
export const useResponsiveArray = <T>(
  values: [T, T, T, T] // [mobile, tablet, desktop, wide]
): T => {
  const responsive = useResponsive();
  
  if (responsive.isMobile) return values[0];
  if (responsive.isTablet) return values[1];
  if (responsive.isDesktop) return values[2];
  return values[3];
}; 