import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ confirmEmailSent: boolean }>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updatePremiumStatus: (isPremium: boolean) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      loading: false,
      error: null,
      initialized: false,

      updatePremiumStatus: async (isPremium: boolean) => {
        const currentUser = get().user;
        if (!currentUser) return;

        try {
          const { error } = await supabase
            .from('profiles')
            .update({ is_premium: isPremium })
            .eq('id', currentUser.id);

          if (error) throw error;

          set(state => ({
            user: state.user ? { ...state.user, isPremium } : null
          }));
        } catch (error) {
          console.error('Error updating premium status:', error);
        }
      },

      refreshProfile: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();

          console.log('isabella', session)

          if (!session?.user) {
            set({ user: null, session: null });
            return;
          }

          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
            set({ user: null, session: null });
            return;
          }

          if (profileData) {
            // Store email in localStorage for Stripe
            localStorage.setItem('sb-auth-email', session.user.email!);

            set({
              user: {
                id: session.user.id,
                email: session.user.email!,
                isPremium: profileData.is_premium || false,
                savedPatterns: 0,
                createdAt: session.user.created_at,
              },
              session,
              initialized: true,
            });
          }
        } catch (error) {
          console.error('Error in refreshProfile:', error);
          set({ user: null, session: null });
        }
      },

      checkAuth: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (!session?.user) {
            set({ user: null, session: null, initialized: true });
            return;
          }

          // Store email in localStorage for Stripe
          localStorage.setItem('sb-auth-email', session.user.email!);

          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) {
            throw error;
          }

          if (profileData) {
            set({
              user: {
                id: session.user.id,
                email: session.user.email!,
                isPremium: profileData.is_premium || false,
                savedPatterns: 0,
                createdAt: session.user.created_at,
              },
              session,
              initialized: true,
            });
          } else {
            // Create profile if it doesn't exist
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
              initialized: true,
            });
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          set({ user: null, session: null, initialized: true });
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

          // Store email in localStorage for Stripe
          localStorage.setItem('sb-auth-email', data.user.email!);

          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

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
            initialized: true,
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
          localStorage.removeItem('auth-storage');
          localStorage.removeItem('sb-auth-email');
          set({
            user: null,
            session: null,
            loading: false,
            error: null,
            initialized: true,
          });
          window.location.href = '/login';
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
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        session: state.session,
        initialized: state.initialized 
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.user) {
          state.refreshProfile();
        }
      },
    }
  )
);