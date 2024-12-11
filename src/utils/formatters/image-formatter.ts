import { parseArrayData } from '../json-parser';

export const getImageUrl = (images: any): string => {
  if (!images) return '';
  
  try {
    // Handle direct URL string
    if (typeof images === 'string') {
      if (images.startsWith('http')) {
        return images;
      }
      // Try parsing as JSON
      try {
        const parsed = JSON.parse(images);
        return Array.isArray(parsed) ? parsed[0] || '' : '';
      } catch {
        return '';
      }
    }

    // Handle array
    if (Array.isArray(images)) {
      return images[0] || '';
    }

    return '';
  } catch (error) {
    console.error('Error formatting image URL:', error);
    return '';
  }
};