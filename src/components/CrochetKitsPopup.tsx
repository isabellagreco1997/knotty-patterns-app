import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PiX, PiPackage, PiArrowRight, PiSparkle, PiStar, PiShoppingCart, PiCreditCard } from 'react-icons/pi';

export default function CrochetKitsPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenCrochetKitsPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsExiting(true);
    localStorage.setItem('hasSeenCrochetKitsPopup', 'true');
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className={`bg-gradient-to-br from-white to-primary-50 rounded-3xl shadow-2xl max-w-2xl w-full transform transition-all duration-300 ${
          isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 p-2 bg-white rounded-full shadow-lg text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close popup"
        >
          <PiX className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full mb-4">
              <PiStar className="w-5 h-5 mr-2" />
              Perfect for Beginners!
            </div>
            <h2 className="text-3xl font-bold mb-2">
              Start Your Crochet Journey Today! 🧶
            </h2>
            <p className="text-lg text-gray-600">
              Get everything you need in one magical box
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://m.media-amazon.com/images/I/71JLFoxPKBL._AC_SX679_.jpg"
                  alt="Crochet Starter Kit"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Price Badge */}
              <div className="absolute -top-4 -right-4 bg-primary-600 text-white rounded-full px-4 py-2 shadow-lg">
                <span className="text-sm">From</span>
                <div className="text-xl font-bold">$34.95</div>
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 bg-white p-3 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <PiPackage className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Complete Kit</h3>
                    <p className="text-sm text-gray-600">All materials included</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white p-3 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <PiSparkle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Video Tutorials</h3>
                    <p className="text-sm text-gray-600">Step-by-step guidance</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white p-3 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <PiCreditCard className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Money-Back Guarantee</h3>
                    <p className="text-sm text-gray-600">30-day return policy</p>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center text-amber-400 mb-2">
                  <PiStar className="w-5 h-5 fill-current" />
                  <PiStar className="w-5 h-5 fill-current" />
                  <PiStar className="w-5 h-5 fill-current" />
                  <PiStar className="w-5 h-5 fill-current" />
                  <PiStar className="w-5 h-5 fill-current" />
                  <span className="ml-2 text-gray-600 text-sm">(2,234 reviews)</span>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "Perfect for beginners! The video tutorials are amazing!"
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/crochet-kits"
              onClick={handleDismiss}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg group"
            >
              <PiShoppingCart className="w-5 h-5 mr-2" />
              View Starter Kits
              <PiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={handleDismiss}
              className="px-8 py-4 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Maybe Later
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <PiShoppingCart className="w-4 h-4 mr-1" />
              Free Shipping
            </div>
            <div className="flex items-center">
              <PiCreditCard className="w-4 h-4 mr-1" />
              Secure Payment
            </div>
            <div className="flex items-center">
              <PiStar className="w-4 h-4 mr-1" />
              Satisfaction Guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}