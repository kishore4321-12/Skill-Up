
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-blue-600 rounded-lg text-white p-8 md:p-12 mb-12 shadow-lg">
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Unlock Your Potential.
        </h1>
        <p className="text-lg md:text-xl mb-6 text-blue-100">
          Gain new skills with expert-led courses. Learn anytime, anywhere.
        </p>
        <div className="relative max-w-lg">
          <input
            type="search"
            placeholder="What do you want to learn?"
            className="w-full p-4 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow"
          />
          <button className="absolute inset-y-0 right-0 flex items-center pr-4">
            <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
