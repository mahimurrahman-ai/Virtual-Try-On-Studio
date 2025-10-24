
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import { ImageFile } from './types';
import { runVirtualTryOn } from './services/geminiService';

const PersonIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const ClothingIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013 5.197m-3 0V21" />
    </svg>
);


const App: React.FC = () => {
  const [personImage, setPersonImage] = useState<ImageFile | null>(null);
  const [clothingImage, setClothingImage] = useState<ImageFile | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTryOn = useCallback(async () => {
    if (!personImage || !clothingImage) {
      setError("Please upload both a person and a clothing item.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const generatedImage = await runVirtualTryOn(personImage, clothingImage);
      setResultImage(generatedImage);
    } catch (e: any) {
      setError(e.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [personImage, clothingImage]);

  const canTryOn = personImage && clothingImage && !isLoading;

  return (
    <div className="min-h-screen bg-gray-900 font-sans p-4 sm:p-6">
      <Header />
      <main className="container mx-auto mt-8 flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-1/2 flex flex-col items-center gap-8">
          <div className="w-full max-w-md flex flex-col sm:flex-row gap-6">
            <ImageUploader id="person" label="Your Photo" icon={<PersonIcon />} onImageUpload={setPersonImage} />
            <ImageUploader id="clothing" label="Clothing Item" icon={<ClothingIcon />} onImageUpload={setClothingImage} />
          </div>
          <div className="w-full max-w-md sticky top-4">
            <button
              onClick={handleTryOn}
              disabled={!canTryOn}
              className={`w-full py-4 px-6 text-lg font-bold rounded-xl transition-all duration-300 transform
                ${canTryOn 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 shadow-lg shadow-purple-500/20' 
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
            >
              {isLoading ? 'Generating...' : 'Virtually Try On'}
            </button>
          </div>
        </div>
        <ResultDisplay resultImage={resultImage} isLoading={isLoading} error={error} />
      </main>
    </div>
  );
};

export default App;
