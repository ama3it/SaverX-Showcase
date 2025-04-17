import React from 'react';

const MobileBlocker: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center p-5 text-center bg-white">
      <svg 
        className="w-16 h-16 mb-4 text-gray-500" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
        />
      </svg>
      <h1 className="text-3xl font-bold mb-4">Desktop Experience Only</h1>
      <p className="text-gray-600 max-w-md mb-4">
        This application requires a larger screen for the optimal experience. 
        Please switch to a desktop or laptop computer to access all features.
      </p>
      <div className="mt-2 p-3 bg-gray-100 rounded-lg text-sm text-gray-500">
        If you believe this is an error, please refresh the page or try rotating your device.
      </div>
    </div>
  );
};

export default MobileBlocker;