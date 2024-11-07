import { Subscription } from '../stores/useCustomerStore';

export function hasActiveSubscription(subscriptions: Subscription[]): boolean {
  if (!subscriptions || subscriptions.length === 0) return false;

  const now = Math.floor(Date.now() / 1000);
  return subscriptions.some(sub => 
    sub.status === 'active' && 
    !sub.cancel_at_period_end &&
    !sub.canceled_at &&
    sub.current_period_end > now
  );
}

export function categorizeSubscriptions(subscriptions: Subscription[]) {
  if (!subscriptions || subscriptions.length === 0) {
    return {
      current: null,
      canceled: []
    };
  }

  const now = Math.floor(Date.now() / 1000);
  
  // Sort subscriptions by start date (newest first)
  const sortedSubscriptions = [...subscriptions].sort(
    (a, b) => b.current_period_start - a.current_period_start
  );

  // Get the most recent subscription
  const currentSubscription = sortedSubscriptions[0];
  
  // Filter out the current subscription and get canceled ones
  const canceledSubscriptions = sortedSubscriptions
    .slice(1)
    .filter(sub => sub.canceled_at || sub.cancel_at_period_end);

  if (!currentSubscription) {
    return {
      current: null,
      canceled: canceledSubscriptions
    };
  }

  const daysRemaining = Math.ceil(
    (currentSubscription.current_period_end - now) / (24 * 60 * 60)
  );

  let status: 'active' | 'canceling' | 'trial' | 'inactive' = 'inactive';
  let message = 'No active subscription';

  if (currentSubscription.status === 'active') {
    if (currentSubscription.trial_end && currentSubscription.trial_end > now) {
      status = 'trial';
      const trialDaysRemaining = Math.ceil(
        (currentSubscription.trial_end - now) / (24 * 60 * 60)
      );
      message = `Trial period - ${trialDaysRemaining} days remaining`;
    } else if (currentSubscription.cancel_at_period_end) {
      status = 'canceling';
      message = `Subscription will end in ${daysRemaining} days`;
    } else {
      status = 'active';
      message = `Subscription active - ${daysRemaining} days remaining`;
    }
  }

  return {
    current: {
      subscription: currentSubscription,
      status,
      message,
      daysRemaining,
      renewsAt: status === 'active' ? new Date(currentSubscription.current_period_end * 1000) : undefined,
      endsAt: status === 'canceling' ? new Date(currentSubscription.current_period_end * 1000) : undefined
    },
    canceled: canceledSubscriptions
  };
}