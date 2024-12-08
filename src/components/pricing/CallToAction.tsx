import React from 'react';
import { Link } from 'react-router-dom';
import { PiSparkle, PiArrowRight } from 'react-icons/pi';

export default function CallToAction() {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <span className="text-5xl mb-6 block animate-bounce">🌟</span>
        <h2 className="text-4xl font-bold mb-6">
          Ready to Start Your Creative Journey? 
          <span className="block mt-2 bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">
            Let's Make Magic Together! ✨
          </span>
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join our amazing community of pattern creators and start bringing your ideas to life! 🎨
        </p>
        <Link
          to="/login"
          className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors text-lg font-medium group"
        >
          <PiSparkle className="w-5 h-5 mr-2" />
          Start Creating Now
          <PiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
        <p className="mt-6 text-gray-500">
          30-day money-back guarantee • Cancel anytime 💫
        </p>
      </div>
    </div>
  );
}