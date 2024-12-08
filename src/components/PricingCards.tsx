import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiCheck, PiSpinner, PiSparkle, PiCrown, PiStar } from 'react-icons/pi';
import { useAuthStore } from '../stores/useAuthStore';
import { createCheckoutSession } from '../lib/stripe';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';

const features = [
  // Pattern Creation
  { name: "Create & sell unlimited patterns 💰", included: true },
  { name: "AI pattern generation & inspiration 🤖", included: true },
  { name: "Professional PDF exports 📄", included: true },
  { name: "Custom stitch creation 🧶", included: true },
  { name: "Pattern version history 📝", included: true },
  { name: "Automatic stitch counting ✨", included: true },
  { name: "Round-by-round instructions 📋", included: true },
  { name: "Multiple pattern sections 📑", included: true },
  
  // AI Features
  { name: "AI design visualization 🎨", included: true },
  { name: "Priority AI processing ⚡️", included: true },
  { name: "Unlimited AI generations 🌟", included: true },
  { name: "Smart pattern suggestions 🧠", included: true },
  
  // Organization
  { name: "Pattern organization system 📁", included: true },
  { name: "Cloud backup & sync ☁️", included: true },
  { name: "Pattern notes & comments 📝", included: true },
  { name: "Tags and categories 🏷️", included: true },
  
  // Business Features
  { name: "Sell on Etsy & Ravelry 🛍️", included: true },
  { name: "Pattern analytics 📊", included: true },
  { name: "Priority support 🎯", included: true },
  { name: "Early access to new features 🚀", included: true },
];

export default function PricingCards() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isDevelopment = process.env.NODE_ENV === 'development';

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/login?redirect=/pricing');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await createCheckoutSession();
    } catch (error) {
      console.error('Payment error:', error);
      setError(isDevelopment 
        ? 'Development mode: Make sure your local Netlify functions server is running (netlify dev)'
        : 'Failed to start payment process. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-16 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce delay-100">🎨</div>
      <div className="absolute top-20 right-10 text-4xl animate-bounce delay-200">✨</div>
      <div className="absolute bottom-10 left-1/4 text-4xl animate-bounce delay-300">🧶</div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-primary-100 transform hover:scale-[1.02] transition-all duration-300">
          <div className="p-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-white mb-6 animate-pulse">
              <PiSparkle className="w-5 h-5 mr-2" />
              Turn Your Patterns Into Profit! 💫
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Full Access Pass</h3>
            <div className="flex items-center justify-center mb-4">
              <span className="text-6xl font-bold text-primary-600">$8</span>
              <span className="text-xl text-gray-500 ml-2">/month</span>
            </div>
            
            <p className="text-xl text-gray-600 mb-8">
              Create, sell, and grow your pattern business! 🚀
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-2 text-gray-700 transform hover:-translate-x-2 transition-transform"
                >
                  <PiCheck className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium group relative overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <PiSparkle className="w-5 h-5 animate-spin" />
              </div>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <PiSpinner className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Start Creating & Earning ✨
                </span>
              )}
            </button>

            {error && (
              <p className="mt-4 text-sm text-red-600">{error}</p>
            )}

            {isDevelopment && (
              <div className="mt-4 p-4 bg-primary-50 rounded-xl text-sm">
                <p className="font-medium text-primary-700">Development Mode:</p>
                <p className="text-primary-600">
                  Test Card: 4242 4242 4242 4242<br />
                  Exp: Any future date, CVC: Any 3 digits
                </p>
              </div>
            )}

            <p className="mt-6 text-sm text-gray-500 flex items-center justify-center space-x-2">
              <PiStar className="w-4 h-4 text-yellow-400" />
              <span>30-day money-back guarantee • Cancel anytime</span>
              <PiStar className="w-4 h-4 text-yellow-400" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}