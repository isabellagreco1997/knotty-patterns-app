// helpers/patternHelpers.ts

import { supabase } from '../lib/supabase';
import type { Pattern } from '../types/pattern';

interface SavePatternParams {
  pattern: Pattern;
  userId: string;
  patternId?: string;
  isPremiumUser: boolean;
  updatePattern: (pattern: Pattern) => Promise<void>;
  addPattern: (pattern: Pattern, isPremium: boolean) => Promise<void>;
}

export const savePattern = async ({
  pattern,
  userId,
  patternId,
  isPremiumUser,
  updatePattern,
  addPattern,
}: SavePatternParams): Promise<void> => {
  const patternToSave = {
    ...pattern,
    userId,
    updatedAt: new Date(),
  };

  if (patternId) {
    await updatePattern(patternToSave);
  } else {
    await addPattern(patternToSave, isPremiumUser);
  }
};
