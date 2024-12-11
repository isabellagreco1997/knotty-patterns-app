// Define strict types for pattern data structures
export interface PatternDifficulty {
    level?: string;
    name?: string;
    description?: string;
  }
  
  export interface PatternCreator {
    id?: string;
    name?: string;
    bio?: string;
    website?: string;
    social_media?: string;
    profile_image?: string;
  }
  
  export interface PatternRatings {
    count?: number;
    average?: number | null;
  }
  
  // Type guard functions
  export const isDifficulty = (value: any): value is PatternDifficulty => {
    return typeof value === 'object' && value !== null && 
      ('level' in value || 'name' in value);
  };
  
  export const isCreator = (value: any): value is PatternCreator => {
    if (typeof value === 'string') {
      return true; // Accept strings as valid creators
    }
    return typeof value === 'object' && value !== null && 
      ('id' in value || 'name' in value);
  };
  
  // Helper function to check if a value is a valid JSON string
  export const isJsonString = (value: string): boolean => {
    try {
      JSON.parse(value);
      return true;
    } catch (e) {
      return false;
    }
  };