import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const isDevelopment = process.env.NODE_ENV === 'development';

const stripeSecretKey = isDevelopment
  ? process.env.VITE_TEST_STRIPE_SECRET_KEY
  : process.env.VITE_STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error(
    isDevelopment
      ? 'VITE_TEST_STRIPE_SECRET_KEY is required in development'
      : 'VITE_STRIPE_SECRET_KEY is required in production'
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
  const origin = event.headers.origin || event.headers.Origin || 'http://localhost:5173';

  const headers = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'Content-Type',
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
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { customerEmail } = JSON.parse(event.body || '{}');

    if (!customerEmail) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Customer email is required' })
      };
    }

    // Get user profile from Supabase
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', customerEmail)
      .single();


    if (!profile?.stripe_customer_id) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Customer not found' })
      };
    }

    // Get customer details from Stripe
    const customer = await stripe.customers.retrieve(profile.stripe_customer_id);
    // Get customer's payment methods
    const paymentMethods = await stripe.paymentMethods.list({
      customer: profile.stripe_customer_id,
      type: 'card'
    });


    // Get customer's invoices
    const invoices = await stripe.invoices.list({
      customer: profile.stripe_customer_id,
      limit: 10
    });



    // Get customer's upcoming invoice if exists
    let upcomingInvoice = null;
    try {
      upcomingInvoice = await stripe.invoices.retrieveUpcoming({
        customer: profile.stripe_customer_id
      });
    } catch (error) {
      // No upcoming invoice, ignore error
    }

    // Get customer's subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: profile.stripe_customer_id,
      status: 'active',
      expand: ['data.default_payment_method']
    });


const responseData = {
    customer: {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      created: customer.created,
      currency: customer.currency,
      delinquent: customer.delinquent,
      description: customer.description,
      discount: customer.discount,
      preferred_locales: customer.preferred_locales,
    },
    paymentMethods: paymentMethods.data.map((pm) => ({
      id: pm.id,
      brand: pm.card?.brand,
      last4: pm.card?.last4,
      expMonth: pm.card?.exp_month,
      expYear: pm.card?.exp_year,
    })),
    invoices: invoices.data.map((invoice) => ({
      id: invoice.id,
      number: invoice.number,
      amount_paid: invoice.amount_paid,
      status: invoice.status,
      created: invoice.created,
      due_date: invoice.due_date,
      currency: invoice.currency,
    })),
    upcomingInvoice: upcomingInvoice
      ? {
          amount_due: upcomingInvoice.amount_due,
          currency: upcomingInvoice.currency,
          due_date: upcomingInvoice.due_date,
        }
      : null,
    subscriptions: subscriptions.data.map((sub) => ({
      id: sub.id,
      status: sub.status,
      current_period_end: sub.current_period_end,
      current_period_start: sub.current_period_start,
      cancel_at_period_end: sub.cancel_at_period_end,
      canceled_at: sub.canceled_at,
      trial_end: sub.trial_end,
      trial_start: sub.trial_start,
    })),
  };

  console.log('isa',responseData )


  // Return the response
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(responseData),
  };
} catch (error) {
  console.error('Error in handler:', error);
  return {
    statusCode: 500,
    headers,
    body: JSON.stringify({
      error: error instanceof Error ? error.message : 'Internal server error',
    }),
  };
}
};

