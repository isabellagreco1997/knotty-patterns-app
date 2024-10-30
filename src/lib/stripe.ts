import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

export async function createCheckoutSession(): Promise<void> {
  try {
    const userEmail = localStorage.getItem('sb-auth-email');
    if (!userEmail) {
      throw new Error('User email not found');
    }

    const baseUrl = import.meta.env.PROD 
      ? window.location.origin
      : 'http://localhost:8888';

    const response = await fetch(`${baseUrl}/.netlify/functions/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ customerEmail: userEmail }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { sessionId } = await response.json();

    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }
    
    const { error } = await stripe.redirectToCheckout({ sessionId });
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
    const userEmail = localStorage.getItem('sb-auth-email');
    if (!userEmail) {
      throw new Error('User email not found');
    }

    const baseUrl = import.meta.env.PROD 
      ? window.location.origin
      : 'http://localhost:8888';

    const response = await fetch(`${baseUrl}/.netlify/functions/create-portal-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ customerEmail: userEmail }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create portal session');
    }

    const { url } = await response.json();
    window.location.href = url;
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
    const userEmail = localStorage.getItem('sb-auth-email');
    if (!userEmail) {
      return { isActive: false, plan: 'free' };
    }

    const baseUrl = import.meta.env.PROD 
      ? window.location.origin
      : 'http://localhost:8888';

    const response = await fetch(`${baseUrl}/.netlify/functions/get-subscription-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ customerEmail: userEmail }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch subscription status');
    }

    const data = await response.json();
    return {
      isActive: data.isActive,
      plan: data.isPremium ? 'premium' : 'free'
    };
  } catch (error) {
    console.error('Subscription status error:', error);
    return { isActive: false, plan: 'free' };
  }
}

export async function handlePaymentSuccess(): Promise<void> {
  try {
    const userEmail = localStorage.getItem('sb-auth-email');
    if (!userEmail) {
      throw new Error('User email not found');
    }

    const baseUrl = import.meta.env.PROD 
      ? window.location.origin
      : 'http://localhost:8888';

    const response = await fetch(`${baseUrl}/.netlify/functions/handle-payment-success`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ customerEmail: userEmail }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to handle payment success');
    }
  } catch (error) {
    console.error('Handle payment success error:', error);
    throw error;
  }
}
