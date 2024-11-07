// Import the getCustomerDetails function
import { getCustomerDetails } from '../lib/stripe';

// Define the Subscription interface
interface Subscription {
  cancel_at_period_end: boolean;
  canceled_at: number | null;
  current_period_end: number;
  current_period_start: number;
  id: string;
  status: string;
  trial_end: number | null;
  trial_start: number | null;
}

// Helper function to check for active subscriptions
function hasActiveSubscriptions(subscriptions: Subscription[]): boolean {
  const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  return subscriptions.some(
    (sub) =>
      sub.status === 'active' &&
      sub.current_period_end > now &&
      !sub.cancel_at_period_end
  );
}

// Function to get the user's subscription status
export async function getUserSubscriptionStatus(): Promise<string | null> {
  try {
    const customerData = await getCustomerDetails();

    // Adjust this line based on the actual structure of your data
    const subscriptions = customerData.subscriptions as Subscription[];
    console.log(customerData, 'customerData')

    if (subscriptions && subscriptions.length > 0) {
      const isActive = hasActiveSubscriptions(subscriptions);
      return isActive ? 'active' : null;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching customer details:', error);
    return null;
  }
}

getUserSubscriptionStatus().then((status) => {
 return status
});

export const userSubscriptionStatusPromise = getUserSubscriptionStatus();
