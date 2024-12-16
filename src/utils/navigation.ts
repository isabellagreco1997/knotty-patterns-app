export interface NavigationItem {
    label: string;
    path: string;
    parent?: string;
  }
  
  export const navigationMap: Record<string, NavigationItem> = {
    home: {
      label: 'Home',
      path: '/',
    },
    howItWorks: {
      label: 'How It Works',
      path: '/how-it-works',
      parent: 'home'
    },
    stitchGlossary: {
      label: 'Stitch Glossary',
      path: '/stitch-glossary',
      parent: 'home'
    },
    freePatterns: {
      label: 'Free Patterns',
      path: '/free-patterns',
      parent: 'home'
    },
    patternBuilder: {
      label: 'Pattern Builder',
      path: '/pattern-builder',
      parent: 'home'
    },
    generatedPatterns: {
      label: 'Generated Patterns',
      path: '/generated-patterns',
      parent: 'home'
    },
    savedPatterns: {
      label: 'Saved Patterns',
      path: '/saved-patterns',
      parent: 'home'
    },
    pricing: {
      label: 'Pricing',
      path: '/pricing',
      parent: 'home'
    },
    blog: {
      label: 'Blog',
      path: '/blog',
      parent: 'home'
    }
  };
  
  export function getBreadcrumbPath(currentPath: string): NavigationItem[] {
    const breadcrumbs: NavigationItem[] = [];
    
    // Always start with home
    breadcrumbs.push(navigationMap.home);
    
    // Find the current page in the navigation map
    const currentPage = Object.values(navigationMap).find(item => item.path === currentPath);
    
    if (currentPage) {
      let current: NavigationItem | undefined = currentPage;
      const path: NavigationItem[] = [current];
      
      // Build the path from current page up to its parents
      while (current?.parent) {
        const parent = navigationMap[current.parent];
        if (parent && parent.path !== '/') { // Skip home as it's already added
          path.unshift(parent);
        }
        current = parent;
      }
      
      breadcrumbs.push(...path);
    }
    
    return breadcrumbs;
  }
  
  // Helper function to get the full path for a pattern
  export function getPatternPath(patternId: string): NavigationItem[] {
    return [
      navigationMap.home,
      navigationMap.freePatterns,
      {
        label: 'Pattern Details',
        path: `/free-patterns/${patternId}`
      }
    ];
  }