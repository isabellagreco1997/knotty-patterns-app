import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-09-30.acacia',
  });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Webhook secret not configured' })
    };
  }

  try {
    // Verify the webhook signature
    const signature = event.headers['stripe-signature']!;
    const payload = event.body!;
    const event_data = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );

    // Handle successful payments
    if (event_data.type === 'checkout.session.completed') {
      const session = event_data.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_details?.email;

      if (!customerEmail) {
        throw new Error('No customer email found in session');
      }

      // Get user by email
      const { data: users, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', customerEmail)
        .single();

      if (userError || !users) {
        throw new Error(`User not found for email: ${customerEmail}`);
      }

      // Update user to premium
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          is_premium: true,
          stripe_customer_id: session.customer,
          premium_since: new Date().toISOString()
        })
        .eq('id', users.id);

      if (updateError) {
        throw new Error(`Failed to update user premium status: ${updateError.message}`);
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ received: true })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Webhook processing failed'
      })
    };
  }
};