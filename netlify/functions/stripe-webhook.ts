import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

// Premium product ID - replace or use dynamic productId from request
const TARGET_PRODUCT_ID = 'prod_R7nigZSxOR53fL';

export const handler: Handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin || 'http://localhost:5173';

  const headers = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'Content-Type, stripe-signature',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    let eventData;
    let isInternalCall = false;

    if (event.headers['stripe-signature'] === 'internal-call') {
      eventData = JSON.parse(event.body || '{}');
      isInternalCall = true;
    } else {
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      if (!webhookSecret) {
        return { 
          statusCode: 500, 
          headers,
          body: JSON.stringify({ error: 'Webhook secret not configured' })
        };
      }

      const signature = event.headers['stripe-signature']!;
      eventData = stripe.webhooks.constructEvent(
        event.body!,
        signature,
        webhookSecret
      );
    }

    console.log('Event type:', eventData.type);

    if (eventData.type === 'checkout.session.completed' || isInternalCall) {
      const customerEmail = eventData.data.object.customer_details?.email;

      if (!customerEmail) {
        throw new Error('No customer email found in session');
      }

      // Initialize as false, will check below
      let hasPurchasedTargetProduct = isInternalCall;

      if (!isInternalCall && eventData.data.object.id) {
        // Only check line items for actual Stripe webhook events
        const lineItems = await stripe.checkout.sessions.listLineItems(eventData.data.object.id);

        hasPurchasedTargetProduct = lineItems.data.some(item => {
          if (item.price?.product) {
            const productId = typeof item.price.product === 'string' 
              ? item.price.product 
              : item.price.product.id;
            
            return productId === TARGET_PRODUCT_ID;
          }
          return false;
        });
      }

      // If it’s an internal call, check Supabase for premium status if required
      if (isInternalCall) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_premium')
          .eq('email', customerEmail)
          .single();

        hasPurchasedTargetProduct = profile?.is_premium || false;
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          received: true,
          hasPurchasedTargetProduct,
          message: hasPurchasedTargetProduct
            ? 'User has purchased the target product'
            : 'User has not purchased the target product'
        })
      };
    }

    // Handle other event types
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        received: true,
        message: 'Event type not processed'
      })
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Webhook processing failed'
      })
    };
  }
};
