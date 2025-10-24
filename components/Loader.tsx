
import React from 'react';

const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-400"></div>
    <p className="text-lg text-gray-300">Generating your new look...</p>
    <p className="text-sm text-gray-500">This may take a moment.</p>
  </div>
);

export default Loader;
