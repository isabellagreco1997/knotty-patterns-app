import React from 'react';
import { PiSparkle, PiStar } from 'react-icons/pi';

export default function Hero() {
  return (
    <div className="pt-20 pb-16 bg-gradient-to-b from-primary-50 to-white overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-4xl animate-bounce">✨</div>
      <div className="absolute top-40 right-10 text-4xl animate-bounce delay-150">🧶</div>
      <div className="absolute bottom-10 left-1/4 text-4xl animate-bounce delay-300">🎨</div>

      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex items-center px-6 py-3 bg-primary-100 text-primary-800 rounded-full mb-8 animate-pulse">
          <PiStar className="w-5 h-5 mr-2" />
          Special Launch Pricing! 🎉
        </div>
        
        <h1 className="text-6xl font-bold mb-6">
          Create Amazing Patterns 
          <span className="block mt-2 bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">
            For Just $8/month! 🌟
          </span>
        </h1>

        <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
          That's less than a fancy lunch! Join thousands of happy crocheters who are creating magical patterns with our AI-powered tools! ✨
        </p>

        <div className="flex justify-center space-x-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform">
            <div className="text-4xl mb-2">💫</div>
            <div className="font-bold text-2xl text-primary-600">Save Time</div>
            <div className="text-gray-600">Create in minutes, not hours!</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform">
            <div className="text-4xl mb-2">💰</div>
            <div className="font-bold text-2xl text-primary-600">Earn More</div>
            <div className="text-gray-600">Sell your patterns online!</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform">
            <div className="text-4xl mb-2">🎯</div>
            <div className="font-bold text-2xl text-primary-600">Stay Organized</div>
            <div className="text-gray-600">All patterns in one place!</div>
          </div>
        </div>

        <div className="mt-12 inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl text-primary-800">
          <span className="text-2xl mr-2">🎁</span>
          <span className="font-medium">30-day money-back guarantee!</span>
        </div>
      </div>
    </div>
  );
}