import { User, AuthResponse, AuthTokenResponse } from '@supabase/supabase-js';
import type { Pattern } from '../types/pattern';

// In-memory storage
const users = new Map<string, User>();
const profiles = new Map<string, any>();
const patterns = new Map<string, Pattern>();
let currentUser: User | null = null;

// Mock user authentication
const mockAuth = {
  getSession: async () => {
    return {
      data: {
        session: currentUser ? {
          user: currentUser,
          access_token: 'mock_token',
          refresh_token: 'mock_refresh_token',
        } : null,
      },
      error: null,
    };
  },

  signUp: async ({ email, password, options }: any): Promise<AuthResponse> => {
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      created_at: new Date().toISOString(),
      user_metadata: options?.data || {},
      app_metadata: {},
      aud: 'authenticated',
      role: 'authenticated',
    };

    users.set(email, newUser);
    currentUser = newUser;

    // Create profile
    profiles.set(newUser.id, {
      id: newUser.id,
      email: newUser.email,
      full_name: newUser.user_metadata.full_name || email.split('@')[0],
      is_premium: false,
      created_at: new Date().toISOString(),
    });

    return {
      data: { user: newUser, session: null },
      error: null,
    };
  },

  signInWithPassword: async ({ email, password }: any): Promise<AuthResponse> => {
    const user = users.get(email);
    
    if (!user) {
      return {
        data: { user: null, session: null },
        error: { message: 'Invalid credentials', status: 401 },
      };
    }

    currentUser = user;
    return {
      data: {
        user,
        session: {
          access_token: 'mock_token',
          refresh_token: 'mock_refresh_token',
          user,
        },
      },
      error: null,
    };
  },

  signOut: async () => {
    currentUser = null;
    return { error: null };
  },

  onAuthStateChange: (callback: Function) => {
    // Simple mock implementation
    return { data: { subscription: { unsubscribe: () => {} } }, error: null };
  },

  verifyOtp: async ({ token_hash, type }: any): Promise<AuthTokenResponse> => {
    return { data: { user: null, session: null }, error: null };
  },
};

// Mock database operations
const mockDb = {
  from: (table: string) => ({
    select: (query?: string) => ({
      eq: (column: string, value: any) => ({
        single: async () => {
          if (table === 'profiles') {
            const profile = Array.from(profiles.values()).find(p => p[column] === value);
            return { data: profile || null, error: null };
          } else if (table === 'patterns') {
            const pattern = Array.from(patterns.values()).find(p => p[column as keyof Pattern] === value);
            return { data: pattern || null, error: null };
          }
          return { data: null, error: null };
        },
        async execute() {
          if (table === 'profiles') {
            const matchingProfiles = Array.from(profiles.values())
              .filter(p => p[column] === value);
            return { data: matchingProfiles, error: null };
          } else if (table === 'patterns') {
            const matchingPatterns = Array.from(patterns.values())
              .filter(p => p[column as keyof Pattern] === value);
            return { data: matchingPatterns, error: null };
          }
          return { data: [], error: null };
        }
      }),
      async execute() {
        if (table === 'profiles') {
          return { data: Array.from(profiles.values()), error: null };
        } else if (table === 'patterns') {
          return { data: Array.from(patterns.values()), error: null };
        }
        return { data: [], error: null };
      }
    }),
    insert: (records: any[]) => ({
      async execute() {
        if (table === 'profiles') {
          records.forEach(record => {
            profiles.set(record.id, record);
          });
          return { data: records, error: null };
        } else if (table === 'patterns') {
          records.forEach(record => {
            const id = record.id || crypto.randomUUID();
            patterns.set(id, { ...record, id });
          });
          return { data: records, error: null };
        }
        return { data: null, error: null };
      }
    }),
    update: (updates: any) => ({
      eq: (column: string, value: any) => ({
        async execute() {
          if (table === 'profiles') {
            const profile = Array.from(profiles.values()).find(p => p[column] === value);
            if (profile) {
              const updatedProfile = { ...profile, ...updates };
              profiles.set(profile.id, updatedProfile);
              return { data: updatedProfile, error: null };
            }
          } else if (table === 'patterns') {
            const pattern = Array.from(patterns.values()).find(p => p[column as keyof Pattern] === value);
            if (pattern) {
              const updatedPattern = { ...pattern, ...updates };
              patterns.set(pattern.id, updatedPattern);
              return { data: updatedPattern, error: null };
            }
          }
          return { data: null, error: null };
        }
      })
    }),
    delete: () => ({
      eq: (column: string, value: any) => ({
        async execute() {
          if (table === 'profiles') {
            const profile = Array.from(profiles.values()).find(p => p[column] === value);
            if (profile) {
              profiles.delete(profile.id);
              return { data: null, error: null };
            }
          } else if (table === 'patterns') {
            const pattern = Array.from(patterns.values()).find(p => p[column as keyof Pattern] === value);
            if (pattern) {
              patterns.delete(pattern.id);
              return { data: null, error: null };
            }
          }
          return { data: null, error: null };
        }
      })
    })
  })
};

export const mockSupabase = {
  auth: mockAuth,
  ...mockDb,
};

// Helper function to get all mock profiles (for development/testing)
export function getMockProfiles() {
  return Array.from(profiles.values());
}

// Helper function to get all mock patterns (for development/testing)
export function getMockPatterns() {
  return Array.from(patterns.values());
}