import React, { useState, useEffect } from 'react';
import { PiCookie, PiX } from 'react-icons/pi';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('cookieConsent', 'true');
      // Set cookie preferences
      document.cookie = "cookieConsent=true; max-age=31536000; path=/"; // 1 year
    }, 300);
  };

  const handleDecline = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('cookieConsent', 'false');
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transform ${
        isExiting ? 'translate-y-full' : 'translate-y-0'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <PiCookie className="w-6 h-6 text-primary-500" />
            <p className="text-sm text-gray-600">
              We use cookies to enhance your experience and keep you signed in. 
              By continuing to use this site, you agree to our use of cookies.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDecline}
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Accept All Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}