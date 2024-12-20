import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PiX, PiPackage, PiArrowRight, PiSparkle, PiStar, PiShoppingCart } from 'react-icons/pi';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className={`relative bg-white rounded-xl shadow-xl w-full max-w-[280px] transform transition-all duration-300 ${
          isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md text-gray-400 hover:text-gray-600 z-10"
          aria-label="Close popup"
        >
          <PiX className="w-3 h-3" />
        </button>

        <div className="p-3">
          {/* Header */}
          <div className="text-center mb-2">
            <div className="inline-flex items-center px-2 py-0.5 bg-primary-100 text-primary-800 rounded-full text-xs mb-1">
              <PiStar className="w-3 h-3 mr-1" />
              Perfect for Beginners!
            </div>
            <h2 className="text-base font-bold">
              New to Crochet? 🧶
            </h2>
          </div>

          {/* Main Content */}
          <div className="space-y-2 mb-3">
            <div className="aspect-square w-32 mx-auto rounded-lg overflow-hidden bg-gray-100">
              <img
                src="https://m.media-amazon.com/images/I/71JLFoxPKBL._AC_SX679_.jpg"
                alt="Crochet Starter Kit"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Features */}
            <div className="flex space-x-1 text-xs">
              <div className="flex-1 bg-gray-50 p-1.5 rounded-lg text-center">
                <div className="flex items-center justify-center">
                  <PiPackage className="w-3 h-3 text-primary-600 mr-1" />
                  <span>Complete Kit</span>
                </div>
              </div>
              <div className="flex-1 bg-gray-50 p-1.5 rounded-lg text-center">
                <div className="flex items-center justify-center">
                  <PiSparkle className="w-3 h-3 text-primary-600 mr-1" />
                  <span>Video Tutorials</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="text-center">
              <span className="text-xs text-gray-600">From</span>
              <div className="text-base font-bold text-primary-600">$34.95</div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-1">
            <Link
              to="/crochet-kits"
              onClick={handleDismiss}
              className="flex items-center justify-center px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs w-full"
            >
              <PiShoppingCart className="w-3 h-3 mr-1" />
              View Starter Kits
              <PiArrowRight className="w-3 h-3 ml-1" />
            </Link>
            <button
              onClick={handleDismiss}
              className="w-full px-3 py-1.5 text-gray-600 hover:text-gray-800 text-xs"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}