import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  }
);