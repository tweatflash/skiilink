import React from 'react';

function LoadingDb() {
  return (
    <div className="h-[calc(100vh-160px)] w-full bg-white right-0 flex items-center justify-center">
      <div className="text-center">
        {/* Main sleeping icon */}
        <div className="mb-6">
         
          <span className="text-2xl ml-2">😴</span>
        </div>

        {/* Main message */}
        <h1 className="text-xl font-medium text-gray-800 mb-2">
          Database Sleeping
        </h1>
        
        <p className="text-gray-600 mb-6">
          We are trying to wake him up...
        </p>

        {/* Simple loading dots */}
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingDb;