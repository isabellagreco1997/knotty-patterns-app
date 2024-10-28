import React from 'react';
import { Link } from 'react-router-dom';
import { PiCrown, PiX } from 'react-icons/pi';
import { useSubscription } from '../hooks/useSubscription';

export default function SubscriptionBanner() {
  const { plan, isActive } = useSubscription();
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible || plan === 'premium' || !isActive) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <PiCrown className="w-5 h-5" />
          <span>
            {plan === 'free' ? (
              'Upgrade to unlock premium features!'
            ) : (
              'Upgrade to Premium for unlimited patterns and features!'
            )}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/pricing"
            className="text-sm bg-white text-primary-600 px-3 py-1 rounded-md hover:bg-primary-50 transition-colors"
          >
            Upgrade Now
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white"
          >
            <PiX className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}