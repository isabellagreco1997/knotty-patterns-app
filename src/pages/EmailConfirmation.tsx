import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PiCheckCircle, PiWarning } from 'react-icons/pi';
import ResendEmailButton from '../components/ResendEmailButton';

export default function EmailConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const userEmail = localStorage.getItem('sb-auth-email');
    setEmail(userEmail);

    // Check if we have a session
    async function checkSession() {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (session?.user?.email_confirmed_at || session?.user?.confirmed_at) {
          setStatus('success');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setStatus('error');
          setError('Email verification pending. Please check your inbox and click the verification link.');
        }
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Failed to verify email');
      }
    }

    checkSession();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        {status === 'verifying' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Verifying your email...</h2>
            <p className="mt-2 text-gray-600">Please wait while we confirm your email address.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <PiCheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Email Verified!</h2>
            <p className="mt-2 text-gray-600">
              Your email has been successfully verified. You will be redirected to login...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <PiWarning className="w-12 h-12 text-red-500 mx-auto" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Verification Status</h2>
            <p className="mt-2 text-red-600">{error}</p>
          </>
        )}

        {/* Resend confirmation section - show only if verification failed */}
        {email && status === 'error' && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Haven't received the confirmation email?</p>
            <ResendEmailButton 
              email={email}
              onError={(errorMessage) => setError(errorMessage)}
            />
          </div>
        )}

        {/* Return to login button - always visible except during verification */}
        {status !== 'verifying' && (
          <button
            onClick={() => navigate('/login')}
            className="mt-6 px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            Return to Login
          </button>
        )}
      </div>
    </div>
  );
}