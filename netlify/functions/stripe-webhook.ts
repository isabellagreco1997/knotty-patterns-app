import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const isDevelopment = process.env.NODE_ENV === 'development';

// Use test keys in development, production keys in production
const stripeSecretKey = isDevelopment 
  ? process.env.VITE_TEST_STRIPE_SECRET_KEY
  : process.env.VITE_STRIPE_SECRET_KEY;


if (!stripeSecretKey) {
  throw new Error('Stripe secret key is not set');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

// Premium product ID
const TARGET_PRODUCT_ID = isDevelopment ? 'prod_R8Z5PYPDqIq9oy' : 'prod_R7nigZSxOR53fL';

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


    if (eventData.type === 'checkout.session.completed' || isInternalCall) {
      const session = eventData.data.object;
      const customerEmail = session.customer_details?.email;
      const supabaseUserId = session.metadata?.supabase_user_id;

  

      if (!customerEmail) {
        throw new Error('Missing customer email');
      }

      let hasPurchasedTargetProduct = false;
      let purchasedItems = [];

      // Get user profile from Supabase
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', customerEmail)
        .single();

      if (!profile) {
        throw new Error('User profile not found');
      }

      try {
        // Get or create Stripe customer
        let customer;
        if (profile.stripe_customer_id) {
          try {
            customer = await stripe.customers.retrieve(profile.stripe_customer_id);
          } catch (error) {
            // If customer doesn't exist in Stripe, create a new one
            customer = await stripe.customers.create({
              email: customerEmail,
              metadata: {
                supabase_user_id: profile.id
              }
            });

            // Update profile with new Stripe customer ID
            await supabase
              .from('profiles')
              .update({ stripe_customer_id: customer.id })
              .eq('id', profile.id);
          }
        } else {
          // Create new customer in Stripe
          customer = await stripe.customers.create({
            email: customerEmail,
            metadata: {
              supabase_user_id: profile.id
            }
          });

          // Update profile with Stripe customer ID
          await supabase
            .from('profiles')
            .update({ stripe_customer_id: customer.id })
            .eq('id', profile.id);
        }

        // Get customer's payment history
        const charges = await stripe.charges.list({
          customer: customer.id,
          limit: 100
        });

        // Get all the customer's invoices
        const invoices = await stripe.invoices.list({
          customer: customer.id,
          limit: 100
        });

        // Combine payment data
        const allPayments = [
          ...charges.data.map(charge => ({
            id: charge.id,
            amount: charge.amount,
            currency: charge.currency,
            date: new Date(charge.created * 1000).toISOString(),
            description: charge.description
          })),
          ...invoices.data.map(invoice => ({
            id: invoice.id,
            amount: invoice.amount_paid,
            currency: invoice.currency,
            date: new Date(invoice.created * 1000).toISOString(),
            description: invoice.description
          }))
        ];

        purchasedItems = allPayments;

        // Check if the customer has purchased the premium product
        const checkoutSessions = await stripe.checkout.sessions.list({
          customer: customer.id,
          limit: 100
        });

        for (const checkoutSession of checkoutSessions.data) {
          if (checkoutSession.payment_status === 'paid') {
            const lineItems = await stripe.checkout.sessions.listLineItems(checkoutSession.id);
            
            for (const item of lineItems.data) {
              if (item.price?.id) {
                const price = await stripe.prices.retrieve(item.price.id, {
                  expand: ['product']
                });
                
                if ((price.product as Stripe.Product).id === TARGET_PRODUCT_ID) {
                  hasPurchasedTargetProduct = true;
                  break;
                }
              }
            }
            
            if (hasPurchasedTargetProduct) break;
          }
        }

        // Update Supabase profile
        await supabase
          .from('profiles')
          .update({ 
            is_premium: hasPurchasedTargetProduct,
            stripe_customer_id: customer.id 
          })
          .eq('id', profile.id);

      } catch (error) {
        console.error('Error processing purchase:', error);
        // Fallback to profile status
        hasPurchasedTargetProduct = profile.is_premium || false;
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          received: true,
          hasPurchasedTargetProduct,
          purchasedItems,
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