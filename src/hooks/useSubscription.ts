import { useState, useEffect } from 'react';
import { getSubscriptionStatus } from '../lib/stripe';

interface SubscriptionStatus {
  isActive: boolean;
  plan: 'free' | 'basic' | 'premium';
  isLoading: boolean;
  error: Error | null;
}

export function useSubscription(): SubscriptionStatus {
  const [status, setStatus] = useState<SubscriptionStatus>({
    isActive: false,
    plan: 'free',
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function checkSubscription() {
      try {
        const data = await getSubscriptionStatus();
        setStatus({
          isActive: data.isActive,
          plan: data.plan,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setStatus({
          isActive: false,
          plan: 'free',
          isLoading: false,
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    }

    checkSubscription();
  }, []);

  return status;
}