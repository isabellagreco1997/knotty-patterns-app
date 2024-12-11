/**
 * Safely parses JSON strings with type checking
 */
export const safeJsonParse = <T>(value: string | T, fallback: T): T => {
    if (typeof value !== 'string') return value;
    
    try {
      const parsed = JSON.parse(value);
      return parsed as T;
    } catch (e) {
      return fallback;
    }
  };
  
  /**
   * Safely parses array-like data
   */
  export const parseArrayData = (value: any): string[] => {
    if (!value) return [];
    
    try {
      if (typeof value === 'string') {
        // Check if it's a direct URL
        if (value.startsWith('http')) {
          return [value];
        }
        // Try parsing as JSON
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      }
      return Array.isArray(value) ? value : [];
    } catch (e) {
      return [];
    }
  };
  
  /**
   * Extracts text content from a string that might contain a prefix
   */
  export const extractTextContent = (value: string, prefix: string): string => {
    if (!value) return '';
    value = value.trim();
    return value.startsWith(prefix) ? value.substring(prefix.length).trim() : value;
  };
  
  /**
   * Attempts to parse a string as JSON, returns the original string if parsing fails
   */
  export const parseJsonOrString = (value: string): any => {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  };