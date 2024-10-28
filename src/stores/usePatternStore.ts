import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pattern } from '../types/pattern';
import { supabase } from '../lib/supabase';

interface PatternState {
  patterns: Pattern[];
  loading: boolean;
  error: string | null;
  fetchPatterns: (userId: string) => Promise<void>;
  addPattern: (pattern: Pattern) => Promise<void>;
  updatePattern: (pattern: Pattern) => Promise<void>;
  deletePattern: (id: string) => Promise<void>;
  duplicatePattern: (pattern: Pattern, userId: string) => Promise<void>;
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
          const { data, error } = await supabase
            .from('patterns')
            .select('*')
            .eq('user_id', userId);

          if (error) throw error;

          // Convert snake_case to camelCase for frontend use
          const formattedPatterns = (data || []).map(pattern => ({
            ...pattern,
            userId: pattern.user_id,
            hookSize: pattern.hook_size,
            yarnWeight: pattern.yarn_weight,
            createdAt: pattern.created_at,
            updatedAt: pattern.updated_at
          }));

          set({ patterns: formattedPatterns, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch patterns',
            loading: false 
          });
          throw error;
        }
      },

      addPattern: async (pattern: Pattern) => {
        set({ loading: true, error: null });
        try {
          // Convert camelCase to snake_case for database
          const patternToSave = {
            id: crypto.randomUUID(),
            user_id: pattern.userId,
            name: pattern.name,
            description: pattern.description,
            difficulty: pattern.difficulty,
            hook_size: pattern.hookSize,
            yarn_weight: pattern.yarnWeight,
            gauge: pattern.gauge,
            materials: pattern.materials,
            sections: pattern.sections,
            notes: pattern.notes,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };

          const { data, error } = await supabase
            .from('patterns')
            .insert([patternToSave])
            .select()
            .single();

          if (error) throw error;

          // Convert back to camelCase for frontend
          const savedPattern = {
            ...data,
            userId: data.user_id,
            hookSize: data.hook_size,
            yarnWeight: data.yarn_weight,
            createdAt: data.created_at,
            updatedAt: data.updated_at
          };

          set(state => ({
            patterns: [...state.patterns, savedPattern],
            loading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to save pattern',
            loading: false 
          });
          throw error;
        }
      },

      updatePattern: async (pattern: Pattern) => {
        set({ loading: true, error: null });
        try {
          const patternToUpdate = {
            id: pattern.id,
            user_id: pattern.userId,
            name: pattern.name,
            description: pattern.description,
            difficulty: pattern.difficulty,
            hook_size: pattern.hookSize,
            yarn_weight: pattern.yarnWeight,
            gauge: pattern.gauge,
            materials: pattern.materials,
            sections: pattern.sections,
            notes: pattern.notes,
            updated_at: new Date().toISOString()
          };

          const { data, error } = await supabase
            .from('patterns')
            .update(patternToUpdate)
            .eq('id', pattern.id)
            .select()
            .single();

          if (error) throw error;

          const updatedPattern = {
            ...data,
            userId: data.user_id,
            hookSize: data.hook_size,
            yarnWeight: data.yarn_weight,
            createdAt: data.created_at,
            updatedAt: data.updated_at
          };

          set(state => ({
            patterns: state.patterns.map(p => 
              p.id === pattern.id ? updatedPattern : p
            ),
            loading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update pattern',
            loading: false 
          });
          throw error;
        }
      },

      deletePattern: async (id: string) => {
        set({ loading: true, error: null });
        try {
          const { error } = await supabase
            .from('patterns')
            .delete()
            .eq('id', id);

          if (error) throw error;

          set(state => ({
            patterns: state.patterns.filter(p => p.id !== id),
            loading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to delete pattern',
            loading: false 
          });
          throw error;
        }
      },

      duplicatePattern: async (pattern: Pattern, userId: string) => {
        set({ loading: true, error: null });
        try {
          const patternToSave = {
            id: crypto.randomUUID(),
            user_id: userId,
            name: `${pattern.name} (Copy)`,
            description: pattern.description,
            difficulty: pattern.difficulty,
            hook_size: pattern.hookSize,
            yarn_weight: pattern.yarnWeight,
            gauge: pattern.gauge,
            materials: pattern.materials,
            sections: pattern.sections,
            notes: pattern.notes,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };

          const { data, error } = await supabase
            .from('patterns')
            .insert([patternToSave])
            .select()
            .single();

          if (error) throw error;

          const savedPattern = {
            ...data,
            userId: data.user_id,
            hookSize: data.hook_size,
            yarnWeight: data.yarn_weight,
            createdAt: data.created_at,
            updatedAt: data.updated_at
          };

          set(state => ({
            patterns: [...state.patterns, savedPattern],
            loading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to duplicate pattern',
            loading: false 
          });
          throw error;
        }
      }
    }),
    {
      name: 'pattern-storage',
      partialize: (state) => ({ patterns: state.patterns })
    }
  )
);