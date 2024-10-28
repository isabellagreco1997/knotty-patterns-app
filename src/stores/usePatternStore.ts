import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pattern } from '../types/pattern';
import { savePattern, getUserPatterns, deletePattern, duplicatePattern } from '../lib/supabase';

interface PatternState {
  patterns: Pattern[];
  loading: boolean;
  error: string | null;
  fetchPatterns: (userId: string) => Promise<void>;
  addPattern: (pattern: Pattern) => Promise<void>;
  updatePattern: (id: string, pattern: Pattern) => Promise<void>;
  deletePattern: (id: string) => Promise<void>;
  duplicatePattern: (id: string, userId: string) => Promise<void>;
}

export const usePatternStore = create<PatternState>()(
  persist(
    (set, get) => ({
      patterns: [],
      loading: false,
      error: null,

      fetchPatterns: async (userId: string) => {
        set({ loading: true, error: null });
        try {
          const patterns = await getUserPatterns(userId);
          set({ patterns, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch patterns',
            loading: false 
          });
        }
      },

      addPattern: async (pattern: Pattern) => {
        set({ loading: true, error: null });
        try {
          const savedPattern = await savePattern(pattern);
          set(state => ({
            patterns: [...state.patterns, savedPattern],
            loading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to save pattern',
            loading: false 
          });
        }
      },

      updatePattern: async (id: string, pattern: Pattern) => {
        set({ loading: true, error: null });
        try {
          const updatedPattern = await savePattern({ ...pattern, id });
          set(state => ({
            patterns: state.patterns.map(p => 
              p.id === id ? updatedPattern : p
            ),
            loading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update pattern',
            loading: false 
          });
        }
      },

      deletePattern: async (id: string) => {
        set({ loading: true, error: null });
        try {
          await deletePattern(id);
          set(state => ({
            patterns: state.patterns.filter(p => p.id !== id),
            loading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to delete pattern',
            loading: false 
          });
        }
      },

      duplicatePattern: async (id: string, userId: string) => {
        set({ loading: true, error: null });
        try {
          const newPattern = await duplicatePattern(id, userId);
          set(state => ({
            patterns: [...state.patterns, newPattern],
            loading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to duplicate pattern',
            loading: false 
          });
        }
      }
    }),
    {
      name: 'pattern-storage',
      partialize: (state) => ({ patterns: state.patterns })
    }
  )
);