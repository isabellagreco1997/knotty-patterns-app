import React from 'react';
import { Link } from 'react-router-dom';
import { PiCheck, PiX, PiCrown, PiStar, PiSparkle } from 'react-icons/pi';

interface PricingFeature {
  name: string;
  free: boolean;
  basic: boolean;
  premium: boolean;
}

const features: PricingFeature[] = [
  { name: 'Create basic patterns', free: true, basic: true, premium: true },
  { name: 'Save up to 3 patterns', free: true, basic: true, premium: true },
  { name: 'Basic stitch library', free: true, basic: true, premium: true },
  { name: 'Export as Text', free: true, basic: true, premium: true },
  { name: 'Save up to 50 patterns', free: false, basic: true, premium: true },
  { name: 'Export as PDF', free: false, basic: true, premium: true },
  { name: 'Advanced stitch library', free: false, basic: true, premium: true },
  { name: 'Pattern version history', free: false, basic: true, premium: true },
  { name: 'Unlimited pattern saves', free: false, basic: false, premium: true },
  { name: 'Custom stitch creation', free: false, basic: false, premium: true },
  { name: 'Priority support', free: false, basic: false, premium: true },
  { name: 'Early access to new features', free: false, basic: false, premium: true },
];

const PricingCards: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
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
            <span className="text-sm text-neutral-500">/month</span>
          </p>
          <Link
            to="/login"
            className="mt-8 block w-full rounded-lg bg-secondary-50 px-4 py-2 text-center text-sm font-semibold text-secondary-600 hover:bg-secondary-100 transition-colors"
          >
            Get Started
          </Link>
        </div>
        <div className="px-8 pb-8">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                {feature.free ? (
                  <PiCheck className="h-4 w-4 text-secondary-500 mr-3" />
                ) : (
                  <PiX className="h-4 w-4 text-neutral-300 mr-3" />
                )}
                <span className={feature.free ? 'text-neutral-700' : 'text-neutral-400'}>
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Basic Plan */}
      <div className="rounded-2xl border border-accent-200 bg-white shadow-md hover:shadow-lg transition-shadow">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-neutral-800">Basic</h3>
            <span className="inline-flex items-center rounded-full bg-accent-50 px-2 py-1">
              <PiSparkle className="w-4 h-4 text-accent-500 mr-1" />
              <span className="text-sm text-accent-600">Popular</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-neutral-600">Everything you need for serious pattern creation</p>
          <p className="mt-6">
            <span className="text-4xl font-bold text-neutral-800">$5</span>
            <span className="text-sm text-neutral-500">/month</span>
          </p>
          <Link
            to="/login"
            className="mt-8 block w-full rounded-lg bg-accent-500 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
          >
            Subscribe Now
          </Link>
        </div>
        <div className="px-8 pb-8">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                {feature.basic ? (
                  <PiCheck className="h-4 w-4 text-accent-500 mr-3" />
                ) : (
                  <PiX className="h-4 w-4 text-neutral-300 mr-3" />
                )}
                <span className={feature.basic ? 'text-neutral-700' : 'text-neutral-400'}>
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Premium Plan */}
      <div className="rounded-2xl border border-primary-200 bg-white shadow-md hover:shadow-lg transition-shadow">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-neutral-800">Premium</h3>
            <span className="inline-flex items-center rounded-full bg-primary-50 px-2 py-1">
              <PiCrown className="w-4 h-4 text-primary-500 mr-1" />
              <span className="text-sm text-primary-600">Ultimate</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-neutral-600">Professional features for power users</p>
          <p className="mt-6">
            <span className="text-4xl font-bold text-neutral-800">$10</span>
            <span className="text-sm text-neutral-500">/month</span>
          </p>
          <Link
            to="/login"
            className="mt-8 block w-full rounded-lg bg-primary-500 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
          >
            Go Premium
          </Link>
        </div>
        <div className="px-8 pb-8">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                {feature.premium ? (
                  <PiCheck className="h-4 w-4 text-primary-500 mr-3" />
                ) : (
                  <PiX className="h-4 w-4 text-neutral-300 mr-3" />
                )}
                <span className={feature.premium ? 'text-neutral-700' : 'text-neutral-400'}>
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingCards;