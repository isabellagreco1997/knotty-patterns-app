import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { checkSupabaseConnection } from './lib/supabase';
import { useAuthStore } from './stores/useAuthStore';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PatternBuilder from './pages/PatternBuilder';
import SavedPatterns from './pages/SavedPatterns';
import Login from './pages/Login';
import EmailConfirmation from './pages/EmailConfirmation';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import Footer from './components/Footer';

export default function App() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const isDevelopment = import.meta.env.DEV;
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    async function initializeApp() {
      const connected = await checkSupabaseConnection();
      setIsConnected(connected);
      await checkAuth();
    }

    initializeApp();
  }, [checkAuth]);

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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}