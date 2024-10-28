import { createClient } from '@supabase/supabase-js';
import { mockSupabase } from './mockSupabase';
import type { Pattern } from '../types/pattern';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isDevelopment = import.meta.env.DEV;

// Use mock client in development if environment variables are not set
export const supabase = (!isDevelopment || (supabaseUrl && supabaseAnonKey))
  ? createClient(supabaseUrl || '', supabaseAnonKey || '', {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : mockSupabase;

// Initialize auth state from local storage
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    // Check if profile exists
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    // If no profile exists, create one
    if (!profile && !error) {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata.full_name || session.user.email?.split('@')[0],
            is_premium: false
          },
        ]);

      if (insertError) {
        console.error('Error creating profile:', insertError);
      }
    }
  }
});

// Helper function to check if Supabase is properly configured
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('profiles').select('count');
    if (error) throw error;
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
}

// Helper function to verify email confirmation token
export async function verifyEmail(token: string) {
  const { error } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: 'email'
  });
  return { error };
}

// Pattern management functions
export async function savePattern(pattern: Pattern) {
  const { data, error } = await supabase
    .from('patterns')
    .insert([pattern])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePattern(pattern: Pattern) {
  const { data, error } = await supabase
    .from('patterns')
    .update(pattern)
    .eq('id', pattern.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePattern(id: string) {
  const { error } = await supabase
    .from('patterns')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getUserPatterns(userId: string) {
  const { data, error } = await supabase
    .from('patterns')
    .select('*')
    .eq('userId', userId);

  if (error) throw error;
  return data;
}

export async function getPattern(id: string) {
  const { data, error } = await supabase
    .from('patterns')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}