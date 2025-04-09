import React from 'react';

const MobileBlocker: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center p-5 text-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Desktop Only</h1>
      <p className="text-gray-600 max-w-md">
        For Best experiene, please use a desktop browser. This application is not optimized for mobile devices.
      </p>
    </div>
  );
};

export default MobileBlocker;