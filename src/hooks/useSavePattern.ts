// hooks/useSavePattern.ts

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { savePattern } from '../helpers/patternHelpers';
import type { Pattern } from '../types/pattern';

interface UseSavePatternParams {
  pattern: Pattern;
  user: any; // Replace 'any' with your User type
  patternId?: string;
  updatePattern: (pattern: Pattern) => Promise<void>;
  addPattern: (pattern: Pattern, isPremium: boolean) => Promise<void>;
}

export const useSavePattern = ({
  pattern,
  user,
  patternId,
  updatePattern,
  addPattern,
}: UseSavePatternParams) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!user) {
      navigate('/login?redirect=/pattern-builder');
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      await savePattern({
        pattern,
        userId: user.id,
        patternId,
        isPremiumUser: user.isPremium,
        updatePattern,
        addPattern,
      });

      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className =
        'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
      successMessage.textContent = 'Pattern saved successfully!';
      document.body.appendChild(successMessage);
      setTimeout(() => successMessage.remove(), 3000);
    } catch (error) {
      console.error('Failed to save pattern:', error);
      setSaveError(error instanceof Error ? error.message : 'Failed to save pattern');
    } finally {
      setIsSaving(false);
    }
  };

  return { handleSave, isSaving, saveError };
};
