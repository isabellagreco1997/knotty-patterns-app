import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const isDevelopment = process.env.NODE_ENV === 'development';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
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

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

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

    // Get user profile from Supabase
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', customerEmail)
      .single();

    if (!profile) {
      return {
        statusCode: 404,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'User profile not found' }),
      };
    }

    // Check if customer already exists in Stripe
    let customer;
    if (profile.stripe_customer_id) {
      try {
        customer = await stripe.customers.retrieve(profile.stripe_customer_id);

        // Check if the customer has active subscriptions
        const subscriptions = await stripe.subscriptions.list({
          customer: customer.id,
          status: 'all', // You can filter for 'active', 'past_due', etc.
        });

        const hasActiveSubscription = subscriptions.data.some(subscription => 
          subscription.status === 'active'
        );

        // Proceed with the existing customer for checkout if they have an active subscription
        if (hasActiveSubscription) {
          const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            customer: customer.id,
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
              supabase_user_id: profile.id
            },
          });

          return {
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ sessionId: session.id }),
          };
        } else {
          console.log(`Customer ${customer.id} has no active subscriptions.`);
        }
      } catch (error) {
        // If customer doesn't exist in Stripe, we'll create a new one
        customer = null;
      }
    }

    // Create new customer if doesn't exist
    if (!customer) {
      customer = await stripe.customers.create({
        email: customerEmail,
        metadata: {
          supabase_user_id: profile.id
        }
      });

      // Update profile with new Stripe customer ID
      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({ stripe_customer_id: customer.id })
        .eq('id', profile.id);

      if (updateError) {
        throw new Error(`Failed to update profile with Stripe customer ID: ${updateError.message}`);
      }
    }

    // Create checkout session for the new customer
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1QIUf8GUn4PvA8d7nBH6O0pG',
          quantity: 1,
        },
      ],
      success_url: `${process.env.URL}/account?success=true`,
      cancel_url: `${process.env.URL}/pricing?canceled=true`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      metadata: {
        customerEmail,
        supabase_user_id: profile.id
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
