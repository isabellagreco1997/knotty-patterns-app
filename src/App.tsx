import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { supabase } from './lib/supabase';
import { useAuthStore } from './stores/useAuthStore';
import { useSubscriptionStatus } from './hooks/useSubscriptionStatus';
// import PaywallGuard from './components/PaywallGuard';
import AuthGuard from './components/AuthGuard';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PatternBuilder from './pages/PatternBuilder';
import SavedPatterns from './pages/SavedPatterns';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailConfirmation from './pages/EmailConfirmation';
import AuthCallback from './pages/AuthCallback';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AccountSettings from './pages/AccountSettings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import { CustomerProvider } from './context/CustomerContext';
import GetInspiration from './pages/GetInspiration';
import GeneratedPatterns from './pages/GeneratedPatterns';
import AILanding from './pages/AILanding';
import StitchGlossary from './pages/StitchGlossary';
import StitchDetail from './pages/StitchDetail';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const isDevelopment = process.env.NODE_ENV === 'development';
  const { checkAuth, refreshProfile, initialized, user, updatePremiumStatus } = useAuthStore();
  const { status: subscriptionStatus } = useSubscriptionStatus();

  useEffect(() => {
    if (user && subscriptionStatus) {
      const isPremium = subscriptionStatus === 'active';
      if (user.isPremium !== isPremium) {
        updatePremiumStatus(isPremium);
      }
    }
  }, [user, subscriptionStatus, updatePremiumStatus]);

  useEffect(() => {
    let authListener: any;

    async function initializeApp() {
      try {
        const { error: connectionError } = await supabase.from('profiles').select('count');
        setIsConnected(!connectionError);

        if (connectionError) {
          console.error('Database connection error:', connectionError);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await checkAuth();
          await refreshProfile();
        }

        authListener = supabase.auth.onAuthStateChange(async (event, session) => {
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
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#fdf6f0]">
          <Navbar />
          <main className="flex-grow">
            <CustomerProvider>
              {/* <PaywallGuard> */}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
                  <Route path="/pattern-builder" element={<AuthGuard><PatternBuilder /></AuthGuard>} />
                  <Route path="/pattern-builder/:id" element={<AuthGuard><PatternBuilder /></AuthGuard>} />
                  <Route path="/saved-patterns" element={<AuthGuard><SavedPatterns /></AuthGuard>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/auth/confirm" element={<EmailConfirmation />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/account" element={<AuthGuard><AccountSettings /></AuthGuard>} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/get-inspiration" element={user ? <GetInspiration /> : <AILanding />} />
                  <Route path="/generated-patterns" element={<AuthGuard><GeneratedPatterns /></AuthGuard>} />
                  <Route path="/stitch-glossary" element={<StitchGlossary />} />
                  <Route path="/stitch/:slug" element={<StitchDetail />} />
                </Routes>
              {/* </PaywallGuard> */}
            </CustomerProvider>
          </main>
          <Footer />
          <CookieConsent />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}