import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/useAuthStore';
import { getCustomerDetails } from '../lib/stripe';

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

interface CacheEntry {
  status: 'active' | 'inactive';
  timestamp: number;
}

// In-memory cache
const statusCache = new Map<string, CacheEntry>();

export function useSubscriptionStatus() {
  const [status, setStatus] = useState<'active' | 'inactive' | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, updatePremiumStatus } = useAuthStore();
  const checkTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    async function checkSubscriptionStatus() {
      if (!user) {
        setStatus(null);
        setLoading(false);
        return;
      }

      // Check cache first
      const cachedStatus = statusCache.get(user.id);
      const now = Date.now();
      
      if (cachedStatus && (now - cachedStatus.timestamp) < CACHE_DURATION) {
        setStatus(cachedStatus.status);
        setLoading(false);
        return;
      }

      try {
        const customerData = await getCustomerDetails();
        const hasActiveSubscription = customerData.subscriptions.some(
          sub => sub.status === 'active' && !sub.cancel_at_period_end
        );

        // Update the premium status in the database
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ is_premium: hasActiveSubscription })
          .eq('id', user.id);

        if (updateError) {
          console.error('Error updating premium status:', updateError);
        } else {
          // Update the local auth store
          await updatePremiumStatus(hasActiveSubscription);
        }

        // Update cache
        statusCache.set(user.id, {
          status: hasActiveSubscription ? 'active' : 'inactive',
          timestamp: now
        });

        setStatus(hasActiveSubscription ? 'active' : 'inactive');
      } catch (error) {
        console.error('Error checking subscription status:', error);
        setStatus('inactive');
      } finally {
        setLoading(false);
      }
    }

    // Clear any existing timeout
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }

    // Debounce the check by 1 second
    checkTimeoutRef.current = setTimeout(checkSubscriptionStatus, 1000);

    // Cleanup
    return () => {
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, [user, updatePremiumStatus]);

  return { status, loading };
}

// Function to manually clear the cache (useful for testing or forced updates)
export function clearSubscriptionCache(userId?: string) {
  if (userId) {
    statusCache.delete(userId);
  } else {
    statusCache.clear();
  }
}

export default useSubscriptionStatus;