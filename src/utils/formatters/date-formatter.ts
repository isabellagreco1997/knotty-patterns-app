export const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Not specified';
    
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };