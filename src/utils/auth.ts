import { supabase } from '../lib/supabase';

export async function clearAuthData() {
  try {
    // Clear Supabase session
    await supabase.auth.signOut();
    
    // Clear localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear all cookies
    document.cookie.split(';').forEach(cookie => {
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    
    // Reload the page to ensure clean state
    window.location.reload();
  } catch (error) {
    console.error('Error clearing auth data:', error);
    // Force reload even if there's an error
    window.location.reload();
  }
}