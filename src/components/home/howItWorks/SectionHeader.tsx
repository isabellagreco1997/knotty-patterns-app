import React from 'react';
import { PiSparkle } from 'react-icons/pi';

export default function SectionHeader() {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center px-6 py-3 bg-primary-100 text-primary-800 rounded-full mb-6">
        <PiSparkle className="w-5 h-5 mr-2" />
        Easy as 1-2-3! ✨
      </div>
      <h2 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
        Create in Three Simple Steps
        <span className="block mt-2 bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">
          Let's Make Magic Together! 🌟
        </span>
      </h2>
      <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
        From AI-generated ideas to finished patterns, we make it fun and easy to bring your crochet designs to life! 🎨
      </p>
    </div>
  );
}