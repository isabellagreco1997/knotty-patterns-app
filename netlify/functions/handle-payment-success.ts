import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { customerEmail } = JSON.parse(event.body || '{}');

    if (!customerEmail) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Customer email is required' })
      };
    }

    // Update user profile in Supabase
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ is_premium: true })
      .eq('email', customerEmail);

    if (updateError) {
      throw updateError;
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error handling payment success:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error'
      })
    };
  }
};