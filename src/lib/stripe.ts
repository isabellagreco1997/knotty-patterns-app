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
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ 
        priceId,
        successUrl: `${window.location.origin}/account/subscription?success=true`,
        cancelUrl: `${window.location.origin}/pricing?canceled=true`,
      }),
    });

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
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

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
  plan: 'free' | 'basic' | 'premium';
}> {
  try {
    const response = await fetch('/api/subscription-status', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Subscription status error:', error);
    return { isActive: false, plan: 'free' };
  }
}