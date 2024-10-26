import { create } from 'zustand';

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
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Mock users for development
const mockUsers = {
  'premium@example.com': {
    id: 'premium-123',
    email: 'premium@example.com',
    isPremium: true,
    savedPatterns: 45,
    createdAt: '2023-12-01'
  },
  'free@example.com': {
    id: 'free-456',
    email: 'free@example.com',
    isPremium: false,
    savedPatterns: 3,
    createdAt: '2024-02-15'
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: false,
  signIn: async (email: string, password: string) => {
    set({ loading: true });
    try {
      // Mock authentication
      if (mockUsers[email] && password === 'password123') {
        set({ user: mockUsers[email], session: { token: 'mock-token' } });
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      set({ loading: false });
    }
  },
  signUp: async (email: string, password: string) => {
    set({ loading: true });
    try {
      // Mock sign up
      const newUser = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        email,
        isPremium: false,
        savedPatterns: 0,
        createdAt: new Date().toISOString()
      };
      set({ user: newUser, session: { token: 'mock-token' } });
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    set({ user: null, session: null });
  },
}));