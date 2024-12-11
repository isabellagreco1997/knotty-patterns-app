import { PatternCreator, isCreator } from '../../types/pattern-data';
import { safeJsonParse } from '../json-parser';

interface CreatorFormat {
  name: string;
  bio?: string;
  profileImage?: string;
}

const DEFAULT_CREATOR: CreatorFormat = {
  name: 'Unknown Creator'
};

export const formatCreator = (creator: any): CreatorFormat => {
  if (!creator) return DEFAULT_CREATOR;

  try {
    // Handle string input
    if (typeof creator === 'string') {
      // Check if it starts with "By" and extract the name
      if (creator.startsWith('By ')) {
        return {
          name: creator.substring(3).trim() // Remove "By " prefix
        };
      }
      
      // Try parsing as JSON
      try {
        const parsed = JSON.parse(creator);
        return {
          name: parsed.name || parsed.id || DEFAULT_CREATOR.name,
          bio: parsed.bio,
          profileImage: parsed.profile_image
        };
      } catch {
        // If not JSON and doesn't start with "By", use as is
        return {
          name: creator.trim() || DEFAULT_CREATOR.name
        };
      }
    }

    // Handle object input
    if (typeof creator === 'object' && creator !== null) {
      return {
        name: creator.name || creator.id || DEFAULT_CREATOR.name,
        bio: creator.bio,
        profileImage: creator.profile_image
      };
    }

    return DEFAULT_CREATOR;
  } catch (error) {
    console.error('Error formatting creator:', error);
    return DEFAULT_CREATOR;
  }
};