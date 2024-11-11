import { Handler } from '@netlify/functions';
import { Resend } from 'resend';

// Initialize Resend with configuration
const resend = new Resend(process.env.RESEND_API_KEY, {
  headers: {
    'Content-Type': 'application/json'
  }
});

export const handler: Handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin || 'http://localhost:5173';

  const corsHeaders = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message, email, name } = JSON.parse(event.body || '{}');

    if (!message || !email) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Message and email are required' })
      };
    }

    const { data, error } = await resend.emails.send({
      from: 'KnottyPatterns <feedback@knottypatterns.com>',
      to: ['support@knottypatterns.com'],
      reply_to: email,
      subject: 'New Feedback from KnottyPatterns',
      html: `
        <h2>New Feedback Received</h2>
        <p><strong>From:</strong> ${name || 'Anonymous'} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    if (error) {
      throw error;
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Feedback sent successfully', data })
    };
  } catch (error) {
    console.error('Error sending feedback:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to send feedback' })
    };
  }
};