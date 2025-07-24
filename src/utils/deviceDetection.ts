export const isMobileDevice = (): boolean => {
  // Check for screen size
  return window.innerWidth <= 768;
};