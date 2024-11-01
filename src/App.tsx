import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { useAuthStore } from './stores/useAuthStore';
import { useStripeWebhook } from './hooks/useStripeWebhook';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PatternBuilder from './pages/PatternBuilder';
import SavedPatterns from './pages/SavedPatterns';
import Login from './pages/Login';
import EmailConfirmation from './pages/EmailConfirmation';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import AccountSettings from './pages/AccountSettings';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

export default function App() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const isDevelopment = process.env.NODE_ENV === 'development';
  const { checkAuth, refreshProfile, initialized, user } = useAuthStore();

  // Use the webhook hook
  useStripeWebhook();

  useEffect(() => {
    let authListener: any;

    async function initializeApp() {
      try {
        // First check the connection
        const { error: connectionError } = await supabase.from('profiles').select('count');
        setIsConnected(!connectionError);

        if (connectionError) {
          console.error('Database connection error:', connectionError);
          return;
        }

        // Then check auth state
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await checkAuth();
          await refreshProfile();
        }

        // Set up auth state change listener
        authListener = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state changed:', event);
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            await checkAuth();
            await refreshProfile();
          } else if (event === 'SIGNED_OUT') {
            useAuthStore.getState().signOut();
          }
        });
      } catch (error) {
        console.error('Error initializing app:', error);
        setIsConnected(false);
      }
    }

    if (!initialized) {
      initializeApp();
    }

    return () => {
      if (authListener) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [checkAuth, refreshProfile, initialized]);

  if (!isDevelopment && isConnected === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">
            Unable to connect to the server. Please check your internet connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#fdf6f0]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pattern-builder" element={<PatternBuilder />} />
            <Route path="/pattern-builder/:id" element={<PatternBuilder />} />
            <Route path="/saved-patterns" element={<SavedPatterns />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/confirm" element={<EmailConfirmation />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/account" element={<AccountSettings />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </BrowserRouter>
  );
}