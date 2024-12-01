import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiCheck, PiSpinner, PiSparkle } from 'react-icons/pi';
import { useAuthStore } from '../stores/useAuthStore';
import { createCheckoutSession } from '../lib/stripe';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';

const features = [
  { name: 'Create unlimited patterns', included: true },
  { name: 'AI pattern generation', included: true },
  { name: 'Pattern version history', included: true },
  { name: 'Export as PDF', included: true },
  { name: 'Custom stitch creation', included: true },
  { name: 'Priority AI processing', included: true },
  { name: 'Priority support', included: true },
  { name: 'Early access to new features', included: true },
];

export default function PricingCards() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isDevelopment = process.env.NODE_ENV === 'development';
  const { status: subscriptionStatus } = useSubscriptionStatus();

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

  const isPremium = subscriptionStatus === 'active';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-12 sm:p-12 lg:p-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 mb-4">
              <PiSparkle className="w-5 h-5 mr-2" />
              Most Popular
            </div>
            <h3 className="text-3xl font-bold text-gray-900">Premium Plan</h3>
            <div className="mt-4">
              <span className="text-5xl font-bold text-gray-900">$8</span>
              <span className="text-xl text-gray-500">/month</span>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to create amazing crochet patterns
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center">
                <PiCheck className="w-5 h-5 text-primary-600" />
                <span className="ml-3 text-gray-600">{feature.name}</span>
              </div>
            ))}
          </div>

          {isPremium ? (
            <button
              disabled
              className="mt-8 w-full px-6 py-4 bg-gray-100 text-gray-600 rounded-xl cursor-not-allowed"
            >
              Current Plan
            </button>
          ) : (
            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="mt-8 w-full px-6 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <PiSpinner className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </span>
              ) : (
                'Get Started Now'
              )}
            </button>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
          )}

          {isDevelopment && !isPremium && (
            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>Test Card: 4242 4242 4242 4242</p>
              <p>Exp: Any future date, CVC: Any 3 digits</p>
            </div>
          )}

          <p className="mt-6 text-sm text-center text-gray-500">
            30-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}