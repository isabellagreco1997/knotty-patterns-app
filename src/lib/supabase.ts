import { createClient } from '@supabase/supabase-js';
import { mockSupabase } from './mockSupabase';
import type { Pattern } from '../types/pattern';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isDevelopment = import.meta.env.DEV;

// Custom storage implementation
const customStorage = {
  getItem: (key: string) => {
    const hasConsent = localStorage.getItem('cookieConsent') === 'true';
    // Always try localStorage first for existing sessions
    const localValue = localStorage.getItem(key);
    if (localValue) return localValue;
    
    // If no consent, use sessionStorage as fallback
    return hasConsent ? null : sessionStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    const hasConsent = localStorage.getItem('cookieConsent') === 'true';
    if (hasConsent) {
      localStorage.setItem(key, value);
    } else {
      sessionStorage.setItem(key, value);
    }
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },
};

// Use mock client in development if environment variables are not set
export const supabase = (!isDevelopment || (supabaseUrl && supabaseAnonKey))
  ? createClient(supabaseUrl || '', supabaseAnonKey || '', {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: customStorage,
      }
    })
  : mockSupabase;

// Initialize auth state from storage
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

export async function verifyEmail(token: string) {
  const { error } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: 'email'
  });
  return { error };
}

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