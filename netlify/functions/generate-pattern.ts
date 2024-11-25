import { Handler } from '@netlify/functions';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const systemPrompt = `Create a concise amigurumi pattern with these rules:
1. Use standard abbreviations (sc, dc, inc, dec)
2. Include stitch counts per round
3. Max 3 sections (e.g., Body, Head, Arms)
4. Keep it beginner-friendly
5. Focus on essential details only
6. Total pattern should be under 500 words`;

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { prompt, imageUrl } = JSON.parse(event.body || '{}');

    if (!prompt || !imageUrl) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required parameters' }),
      };
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Create a simple amigurumi pattern for: ${prompt}. Be concise.` }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const pattern = completion.choices[0].message.content;

    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ pattern }),
    };
  } catch (error) {
    console.error('Error generating pattern:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to generate pattern',
      }),
    };
  }
};