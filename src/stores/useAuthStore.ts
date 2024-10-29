import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  isPremium: boolean;
  savedPatterns: number;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ confirmEmailSent: boolean }>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: false,
  error: null,

  checkAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // First check if profile exists
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        // If no profile exists, create one
        if (!profileData) {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([{
              id: session.user.id,
              email: session.user.email,
              full_name: session.user.user_metadata.full_name || session.user.email?.split('@')[0],
              is_premium: false
            }])
            .select()
            .single();

          if (createError) throw createError;
          
          set({
            user: {
              id: session.user.id,
              email: session.user.email!,
              isPremium: false,
              savedPatterns: 0,
              createdAt: session.user.created_at,
            },
            session,
          });
        } else {
          set({
            user: {
              id: session.user.id,
              email: session.user.email!,
              isPremium: profileData.is_premium || false,
              savedPatterns: 0,
              createdAt: session.user.created_at,
            },
            session,
          });
        }
      } else {
        set({ user: null, session: null });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      set({ user: null, session: null });
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    
    // First, ensure we're starting with a clean state
    await supabase.auth.signOut();
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (!data.user) {
        throw new Error('No user data returned');
      }

      // Ensure profile exists
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (!profileData) {
        // Create profile if it doesn't exist
        const { error: createError } = await supabase
          .from('profiles')
          .insert([{
            id: data.user.id,
            email: data.user.email,
            full_name: data.user.user_metadata.full_name || data.user.email?.split('@')[0],
            is_premium: false
          }]);

        if (createError) throw createError;
      }

      set({
        user: {
          id: data.user.id,
          email: data.user.email!,
          isPremium: profileData?.is_premium || false,
          savedPatterns: 0,
          createdAt: data.user.created_at,
        },
        session: data.session,
        loading: false,
        error: null,
      });
    } catch (error) {
      let message = 'Failed to sign in';
      if (error instanceof Error) {
        if (error.message.includes('Invalid login credentials')) {
          message = 'Invalid email or password';
        } else if (error.message.includes('Email not confirmed')) {
          message = 'Please confirm your email address before signing in';
        }
      }
      set({ error: message, loading: false, user: null, session: null });
      throw error;
    }
  },

  signUp: async (email: string, password: string) => {
    set({ loading: true, error: null });
    
    // First, ensure we're starting with a clean state
    await supabase.auth.signOut();
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: email.split('@')[0],
          },
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });

      if (error) {
        if (error.message.includes('email_address_not_authorized')) {
          throw new Error('Please use a valid email address');
        }
        throw error;
      }

      if (data.user) {
        // Create profile immediately
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: data.user.id,
            email: data.user.email,
            full_name: data.user.user_metadata.full_name || data.user.email?.split('@')[0],
            is_premium: false
          }]);

        if (profileError) throw profileError;
      }

      set({ loading: false, error: null });
      return { confirmEmailSent: true };
    } catch (error) {
      let message = 'Failed to sign up';
      if (error instanceof Error) {
        message = error.message;
      }
      set({ error: message, loading: false, user: null, session: null });
      throw error;
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    try {
      await supabase.auth.signOut();
      set({
        user: null,
        session: null,
        loading: false,
        error: null,
      });
      // Reload the page to ensure a clean state
      window.location.reload();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to sign out',
        loading: false,
        user: null,
        session: null,
      });
      throw error;
    }
  },
}));