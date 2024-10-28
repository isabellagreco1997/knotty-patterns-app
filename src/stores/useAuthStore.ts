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
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        set({
          user: {
            id: session.user.id,
            email: session.user.email!,
            isPremium: profileData?.is_premium || false,
            savedPatterns: 0,
            createdAt: session.user.created_at,
          },
          session,
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (!data.user) {
        throw new Error('No user data returned');
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        // Don't throw here, use default values instead
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
    const isDevelopment = import.meta.env.DEV;
    const autoConfirm = import.meta.env.VITE_DEV_AUTO_CONFIRM === 'true';

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

      // In development with auto-confirm enabled, automatically sign in
      if (isDevelopment && autoConfirm && data.user) {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        if (signInData.user) {
          set({
            user: {
              id: signInData.user.id,
              email: signInData.user.email!,
              isPremium: false,
              savedPatterns: 0,
              createdAt: signInData.user.created_at,
            },
            session: signInData.session,
            loading: false,
            error: null,
          });
        }
        
        return { confirmEmailSent: false };
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
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({
        user: null,
        session: null,
        loading: false,
        error: null,
      });
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