import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import { PiSpinner } from 'react-icons/pi';

interface PaywallGuardProps {
  children: React.ReactNode;
}

export default function PaywallGuard({ children }: PaywallGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { status, loading } = useSubscriptionStatus();
  const isPremium = status === 'active';

  useEffect(() => {
    if (!loading && !isPremium) {
      // Store the attempted URL to redirect back after upgrading
      navigate(`/pricing?redirect=${encodeURIComponent(location.pathname)}`);
    }
  }, [isPremium, loading, navigate, location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <PiSpinner className="w-6 h-6 animate-spin text-primary-600" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!isPremium) {
    return null;
  }

  return <>{children}</>;
}