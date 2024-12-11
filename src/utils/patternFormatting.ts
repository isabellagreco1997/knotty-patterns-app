import type { FreePattern } from '../types/freePattern';

export const formatDifficulty = (difficulty: FreePattern['difficulty']) => {
  if (!difficulty || typeof difficulty === 'string') {
    try {
      // Try to parse if it's a JSON string
      const parsedDifficulty = typeof difficulty === 'string' ? JSON.parse(difficulty) : difficulty;
      if (!parsedDifficulty || !parsedDifficulty.level) {
        return { text: 'Beginner', class: 'bg-green-100 text-green-800' };
      }
      difficulty = parsedDifficulty;
    } catch (e) {
      return { text: 'Beginner', class: 'bg-green-100 text-green-800' };
    }
  }

  const level = difficulty.level.toLowerCase();
  switch (level) {
    case 'beginner':
    case 'level-1':
      return { text: 'Beginner', class: 'bg-green-100 text-green-800' };
    case 'intermediate':
    case 'level-2':
      return { text: 'Intermediate', class: 'bg-yellow-100 text-yellow-800' };
    case 'advanced':
    case 'level-3':
      return { text: 'Advanced', class: 'bg-red-100 text-red-800' };
    default:
      return { text: difficulty.level, class: 'bg-gray-100 text-gray-800' };
  }
};

export const formatArrayToString = (arr: any[] | string | null | undefined): string => {
  if (!arr) return '';
  
  try {
    // If it's a JSON string, parse it
    const parsedArr = typeof arr === 'string' ? JSON.parse(arr) : arr;
    if (!Array.isArray(parsedArr)) return '';
    return parsedArr.join(', ');
  } catch (e) {
    return '';
  }
};

export const getImageUrl = (images: string[] | string | undefined): string => {
  if (!images) return '';
  
  try {
    // If it's a JSON string, parse it
    const parsedImages = typeof images === 'string' ? JSON.parse(images) : images;
    if (!Array.isArray(parsedImages) || parsedImages.length === 0) return '';
    return parsedImages[0];
  } catch (e) {
    return '';
  }
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

export const parseCreator = (creator: string | any): { name: string; bio?: string; } => {
  try {
    const parsedCreator = typeof creator === 'string' ? JSON.parse(creator) : creator;
    return {
      name: parsedCreator?.name || parsedCreator?.id || 'Unknown Creator',
      bio: parsedCreator?.bio
    };
  } catch (e) {
    return { name: 'Unknown Creator' };
  }
};