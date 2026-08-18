import React from 'react';

function LoadingDb() {
  return (
    <div className="h-[calc(100vh-160px)] w-full bg-white right-0 flex items-center justify-center">
      <div className="text-center">
        {/* Main sleeping icon */}

        {/* Main message */}
        <h1 className="text-xl med-livvic  text-gray-800 mb-2">
          Almost there…
        </h1>
        
        <p className="text-gray-600 mb-6">
          Preparing your items, sit tight!
        </p>

        {/* Simple loading dots */}
        <div className="w-8 m-auto h-8 border-4 border-gray-200 border-t-orange-600 rounded-full animate-spin"></div>
        {/* <span className="loader size-20"></span> */}
      </div>
    </div>
  );
}

export default LoadingDb;