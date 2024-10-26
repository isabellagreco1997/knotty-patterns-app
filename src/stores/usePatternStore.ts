import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pattern } from '../types/pattern';

interface PatternState {
  patterns: Pattern[];
  addPattern: (pattern: Pattern) => void;
  updatePattern: (id: string, pattern: Pattern) => void;
  deletePattern: (id: string) => void;
  duplicatePattern: (id: string) => void;
}

export const usePatternStore = create<PatternState>()(
  persist(
    (set) => ({
      patterns: [],
      addPattern: (pattern) =>
        set((state) => ({
          patterns: [...state.patterns, pattern],
        })),
      updatePattern: (id, updatedPattern) =>
        set((state) => ({
          patterns: state.patterns.map((p) =>
            p.id === id ? { ...p, ...updatedPattern } : p
          ),
        })),
      deletePattern: (id) =>
        set((state) => ({
          patterns: state.patterns.filter((p) => p.id !== id),
        })),
      duplicatePattern: (id) =>
        set((state) => {
          const pattern = state.patterns.find((p) => p.id === id);
          if (!pattern) return state;
          
          const newPattern = {
            ...pattern,
            id: Math.random().toString(36).substr(2, 9),
            name: `${pattern.name} (Copy)`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          return {
            patterns: [...state.patterns, newPattern],
          };
        }),
    }),
    {
      name: 'pattern-storage',
    }
  )
);