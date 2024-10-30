import React from 'react';
import { Link } from 'react-router-dom';
import { PiCheck, PiX, PiStar, PiSparkle } from 'react-icons/pi';
import { useAuthStore } from '../stores/useAuthStore';

interface PricingFeature {
  name: string;
  free: boolean;
  premium: boolean;
}

const features: PricingFeature[] = [
  { name: 'Create basic patterns', free: true, premium: true },
  { name: 'Basic stitch library', free: true, premium: true },
  { name: 'Export as Text', free: true, premium: true },
  { name: 'Save up to 3 patterns', free: true, premium: true },
  { name: 'Pattern version history', free: false, premium: true },
  { name: 'Export as PDF', free: false, premium: true },
  { name: 'Unlimited pattern saves', free: false, premium: true },
  { name: 'Custom stitch creation', free: false, premium: true },
];

// Stripe payment link with custom data
const createPaymentLink = (email: string) => {
  const baseLink = 'https://buy.stripe.com/3cseV56sVc1S4SI6oo';
  const prefillData = encodeURIComponent(JSON.stringify({
    email: email,
    client_reference_id: email // This helps track the payment in webhooks
  }));
  return `${baseLink}?prefilled_email=${email}&client_reference_id=${email}`;
};

const PricingCards: React.FC = () => {
  const { user } = useAuthStore();

  const handleUpgrade = () => {
    if (!user) {
      window.location.href = '/login?redirect=pricing';
      return;
    }
    
    // Create payment link with user's email
    const paymentLink = createPaymentLink(user.email);
    window.location.href = paymentLink;
  };

  const renderFeatureList = (planType: 'free' | 'premium') => (
    <ul className="space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-sm">
          {feature[planType] ? (
            <PiCheck className="h-4 w-4 text-primary-500 mr-3" />
          ) : (
            <PiX className="h-4 w-4 text-neutral-300 mr-3" />
          )}
          <span className={feature[planType] ? 'text-neutral-700' : 'text-neutral-400'}>
            {feature.name}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Free Plan */}
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-neutral-800">Free</h3>
            <span className="inline-flex items-center rounded-full bg-secondary-50 px-2 py-1">
              <PiStar className="w-4 h-4 text-secondary-500 mr-1" />
              <span className="text-sm text-secondary-600">Basic</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-neutral-600">Perfect for getting started with pattern creation</p>
          <p className="mt-6">
            <span className="text-4xl font-bold text-neutral-800">$0</span>
            <span className="text-sm text-neutral-500">/forever</span>
          </p>
          {!user ? (
            <Link
              to="/login"
              className="mt-8 block w-full rounded-lg bg-secondary-50 px-4 py-2 text-center text-sm font-semibold text-secondary-600 hover:bg-secondary-100 transition-colors"
            >
              Get Started
            </Link>
          ) : (
            <button
              disabled
              className="mt-8 block w-full rounded-lg bg-secondary-50 px-4 py-2 text-center text-sm font-semibold text-secondary-600 cursor-default"
            >
              Current Plan
            </button>
          )}
        </div>
        <div className="px-8 pb-8">
          {renderFeatureList('free')}
        </div>
      </div>

      {/* Premium Plan */}
      <div className="rounded-2xl border border-primary-200 bg-white shadow-md hover:shadow-lg transition-shadow">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-neutral-800">Premium</h3>
            <span className="inline-flex items-center rounded-full bg-primary-50 px-2 py-1">
              <PiSparkle className="w-4 h-4 text-primary-500 mr-1" />
              <span className="text-sm text-primary-600">Lifetime</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-neutral-600">All features unlocked forever</p>
          <p className="mt-6">
            <span className="text-4xl font-bold text-neutral-800">$8</span>
            <span className="text-sm text-neutral-500">/one-time</span>
          </p>
          <button
            onClick={handleUpgrade}
            className="mt-8 block w-full rounded-lg bg-primary-500 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
          >
            Upgrade to Premium
          </button>
        </div>
        <div className="px-8 pb-8">
          {renderFeatureList('premium')}
        </div>
      </div>
    </div>
  );
};

export default PricingCards;