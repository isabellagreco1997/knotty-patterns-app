import { loadStripe } from '@stripe/stripe-js';

const isDevelopment = process.env.NODE_ENV === 'development';

// Get the appropriate keys based on environment
const stripePublishableKey = isDevelopment
  ? import.meta.env.VITE_STRIPE_TEST_PUBLISHABLE_KEY
  : import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Validate required environment variables
if (!stripePublishableKey) {
  throw new Error(
    isDevelopment
      ? 'VITE_STRIPE_TEST_PUBLISHABLE_KEY is required in development'
      : 'VITE_STRIPE_PUBLISHABLE_KEY is required in production'
  );
}

// Initialize Stripe with validated key
const stripePromise = loadStripe(stripePublishableKey);

export async function createCheckoutSession(): Promise<void> {
  try {
    const userEmail = localStorage.getItem('sb-auth-email');
    if (!userEmail) {
      throw new Error('User email not found');
    }

    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Failed to initialize Stripe');
    }

    const baseUrl = isDevelopment ? 'http://localhost:8888' : '';
    
    const response = await fetch(`${baseUrl}/.netlify/functions/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        customerEmail: userEmail,
        mode: isDevelopment ? 'test' : 'live'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { sessionId } = await response.json();
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

    const baseUrl = isDevelopment ? 'http://localhost:8888' : '';
    
    const response = await fetch(`${baseUrl}/.netlify/functions/create-portal-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        customerEmail: userEmail,
        mode: isDevelopment ? 'test' : 'live'
      }),
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

    const baseUrl = isDevelopment ? 'http://localhost:8888' : '';
    
    const response = await fetch(`${baseUrl}/.netlify/functions/get-subscription-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        customerEmail: userEmail,
        mode: isDevelopment ? 'test' : 'live'
      }),
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

    const baseUrl = isDevelopment ? 'http://localhost:8888' : '';
    
    const response = await fetch(`${baseUrl}/.netlify/functions/handle-payment-success`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        customerEmail: userEmail,
        mode: isDevelopment ? 'test' : 'live'
      }),
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

export async function getCustomerDetails() {
  
    const userEmail = localStorage.getItem('sb-auth-email');
    try {
      const response = await fetch('/.netlify/functions/get-customer-details', {
        method: 'POST', // Ensure the method is POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerEmail: userEmail }),
      });
  
      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch customer details');
      }
  
      const data = await response.json();
      console.log('Customer Details:', data);
      return data;
    } catch (error) {
      console.error('Error fetching customer details:', error.message);
      // Handle or re-throw the error as needed
      throw error;
    }
}
