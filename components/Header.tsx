
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 sm:py-6">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Virtual Try-On Studio
        </h1>
        <p className="mt-2 text-md sm:text-lg text-gray-300 max-w-2xl mx-auto">
          Upload your photo and a clothing item to see how it looks on you, powered by Gemini.
        </p>
      </div>
    </header>
  );
};

export default Header;
