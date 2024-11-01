import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const isDevelopment = process.env.NODE_ENV === 'development';

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
// Get the appropriate keys based on environment
const stripeSecretKey = isDevelopment
  ? process.env.VITE_TEST_STRIPE_SECRET_KEY
  : process.env.VITE_STRIPE_SECRET_KEY;

const stripePriceId = isDevelopment
  ? process.env.STRIPE_TEST_PREMIUM_PRICE_ID
  : process.env.STRIPE_PREMIUM_PRICE_ID;

if (!stripeSecretKey) {
  throw new Error(
    isDevelopment
      ? 'VITE_STRIPE_TEST_SECRET_KEY is required in development'
      : 'VITE_STRIPE_SECRET_KEY is required in production'
  );
}

if (!stripePriceId) {
  throw new Error(
    isDevelopment
      ? 'STRIPE_TEST_PREMIUM_PRICE_ID is required in development'
      : 'STRIPE_PREMIUM_PRICE_ID is required in production'
  );
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

export const handler: Handler = async (event) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { customerEmail } = JSON.parse(event.body || '{}');

    if (!customerEmail) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Customer email is required' }),
      };
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: customerEmail,
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.URL}/account?success=true`,
      cancel_url: `${process.env.URL}/pricing?canceled=true`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      metadata: {
        customerEmail,
      },
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    console.error('Checkout session error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
    };
  }
};