import { PatternDifficulty, isDifficulty } from '../../types/pattern-data';
import { safeJsonParse } from '../json-parser';

interface DifficultyFormat {
  text: string;
  class: string;
}

const DEFAULT_DIFFICULTY: DifficultyFormat = {
  text: 'Beginner',
  class: 'bg-green-100 text-green-800'
};

export const formatDifficulty = (difficulty: any): DifficultyFormat => {
  if (!difficulty) return DEFAULT_DIFFICULTY;

  try {
    // Handle string input
    if (typeof difficulty === 'string') {
      try {
        difficulty = JSON.parse(difficulty);
      } catch {
        // If parsing fails, use the string directly
        const level = difficulty.toLowerCase();
        return getDifficultyFormat(level);
      }
    }

    // Handle object input
    if (typeof difficulty === 'object') {
      const level = difficulty.level || difficulty.name;
      if (!level) return DEFAULT_DIFFICULTY;
      return getDifficultyFormat(level.toLowerCase());
    }

    return DEFAULT_DIFFICULTY;
  } catch (error) {
    console.error('Error formatting difficulty:', error);
    return DEFAULT_DIFFICULTY;
  }
};

const getDifficultyFormat = (level: string): DifficultyFormat => {
  const difficultyMap: Record<string, DifficultyFormat> = {
    beginner: { text: 'Beginner', class: 'bg-green-100 text-green-800' },
    'level-1': { text: 'Beginner', class: 'bg-green-100 text-green-800' },
    intermediate: { text: 'Intermediate', class: 'bg-yellow-100 text-yellow-800' },
    'level-2': { text: 'Intermediate', class: 'bg-yellow-100 text-yellow-800' },
    advanced: { text: 'Advanced', class: 'bg-red-100 text-red-800' },
    'level-3': { text: 'Advanced', class: 'bg-red-100 text-red-800' }
  };

  return difficultyMap[level] || DEFAULT_DIFFICULTY;
};