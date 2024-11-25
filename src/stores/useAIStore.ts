import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AIState {
  lastPrompt: string;
  lastGeneratedImage: string | null;
  lastGeneratedPattern: string | null;
  setLastGenerated: (prompt: string, imageUrl: string | null, pattern?: string | null) => void;
  clearLastGenerated: () => void;
}

export const useAIStore = create<AIState>()(
  persist(
    (set) => ({
      lastPrompt: '',
      lastGeneratedImage: null,
      lastGeneratedPattern: null,
      setLastGenerated: (prompt: string, imageUrl: string | null, pattern: string | null = null) => 
        set({ lastPrompt: prompt, lastGeneratedImage: imageUrl, lastGeneratedPattern: pattern }),
      clearLastGenerated: () => 
        set({ lastPrompt: '', lastGeneratedImage: null, lastGeneratedPattern: null }),
    }),
    {
      name: 'ai-storage',
    }
  )
);