
import React from 'react';
import Loader from './Loader';

interface ResultDisplayProps {
  resultImage: string | null;
  isLoading: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultImage, isLoading, error }) => {
  return (
    <div className="w-full lg:w-1/2 aspect-w-1 aspect-h-1 bg-gray-800/50 border-2 border-gray-700 rounded-xl flex items-center justify-center p-4">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="text-center text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-2 font-semibold">An Error Occurred</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : resultImage ? (
        <img src={resultImage} alt="Generated result" className="w-full h-full object-contain rounded-lg" />
      ) : (
        <div className="text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          <p className="mt-4 text-xl">Your result will appear here</p>
          <p className="text-sm">Upload both images and click "Try On" to begin.</p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
