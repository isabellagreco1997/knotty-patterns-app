import { createClient } from '@supabase/supabase-js';
import { mockSupabase } from './mockSupabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isDevelopment = process.env.NODE_ENV === 'development';

// Create Supabase client with persistent storage and request monitoring
export const supabase = (!isDevelopment || (supabaseUrl && supabaseAnonKey))
  ? createClient(supabaseUrl || '', supabaseAnonKey || '', {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: localStorage,
        storageKey: 'sb-auth-token',
        flowType: 'pkce'
      },
      global: {
        // Add request monitoring
        fetch: (url, options) => {
          const startTime = Date.now();
          console.log(`🌐 Supabase Request: ${options?.method || 'GET'} ${url}`);

          return fetch(url, options)
            .then(async (response) => {
              const endTime = Date.now();
              const duration = endTime - startTime;

              if (!response.ok) {
                console.error(`❌ Supabase Request Failed: ${options?.method || 'GET'} ${url}`, {
                  status: response.status,
                  statusText: response.statusText,
                  duration: `${duration}ms`,
                });
                // Clone the response before reading it
                const clone = response.clone();
                const errorBody = await clone.text();
                console.error('Error response:', errorBody);
              } else {
                console.log(`✅ Supabase Request Complete: ${options?.method || 'GET'} ${url}`, {
                  status: response.status,
                  duration: `${duration}ms`,
                });
              }

              return response;
            })
            .catch((error) => {
              console.error(`🔥 Supabase Request Failed: ${options?.method || 'GET'} ${url}`, error);
              throw error;
            });
        }
      }
    })
  : mockSupabase;

export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('profiles').select('count');
    if (error) {
      console.error('Database connection failed:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

export async function verifyEmail(token: string) {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email'
    });
    return { data, error };
  } catch (error) {
    console.error('Email verification failed:', error);
    return { data: null, error };
  }
}

export async function savePattern(pattern: any) {
  const { data, error } = await supabase
    .from('patterns')
    .insert([pattern])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePattern(pattern: any) {
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