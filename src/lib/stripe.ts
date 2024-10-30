import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface CheckoutSessionResponse {
  sessionId: string;
  error?: string;
}

interface PortalSessionResponse {
  url: string;
  error?: string;
}

export async function createCheckoutSession(priceId: string): Promise<void> {
  try {
    // Get the current session from Supabase
    const token = localStorage.getItem('sb-auth-token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Create checkout session using Netlify Function
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        priceId,
        successUrl: `${window.location.origin}/account?success=true`,
        cancelUrl: `${window.location.origin}/pricing?canceled=true`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const data: CheckoutSessionResponse = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
}

export async function createPortalSession(): Promise<void> {
  try {
    const token = localStorage.getItem('sb-auth-token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch('/.netlify/functions/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create portal session');
    }

    const data: PortalSessionResponse = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    window.location.href = data.url;
  } catch (error) {
    console.error('Portal session error:', error);
    throw error;
  }
}

export async function getSubscriptionStatus(): Promise<{
  isActive: boolean;
  plan: 'free' | 'premium';
}> {
  try {
    const token = localStorage.getItem('sb-auth-token');
    if (!token) {
      return { isActive: false, plan: 'free' };
    }

    const response = await fetch('/.netlify/functions/get-subscription-status', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch subscription status');
    }

    const data = await response.json();
    return {
      isActive: data.isActive,
      plan: data.hasPurchased ? 'premium' : 'free'
    };
  } catch (error) {
    console.error('Subscription status error:', error);
    return { isActive: false, plan: 'free' };
  }
}