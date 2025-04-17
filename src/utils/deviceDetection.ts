export const isMobileDevice = (): boolean => {
  // Check for touch capability
  const hasTouchCapability = 
    'ontouchstart' in window || 
    navigator.maxTouchPoints > 0 ||
    (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
  
  // Check for screen size
  const isSmallScreen = window.innerWidth <= 768;
  
  // Check user agent as a fallback
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isKnownMobileUA = mobileRegex.test(userAgent);
  
  // Consider a device mobile if it has touch capabilities AND small screen
  // OR if it has a known mobile user agent
  return (hasTouchCapability && isSmallScreen) || isKnownMobileUA;
};