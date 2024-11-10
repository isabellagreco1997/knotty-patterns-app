import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../lib/supabase';
import { PiCheckCircle, PiWarning, PiSpinner } from 'react-icons/pi';
import { supabase } from '../lib/supabase';

export default function EmailConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');
    const userEmail = localStorage.getItem('sb-auth-email');
    setEmail(userEmail);
    
    if (!token) {
      setStatus('error');
      setError('No confirmation token found');
      return;
    }

    async function confirmEmail() {
      try {
        setStatus('success');
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Failed to verify email');
      }
    }

    confirmEmail();
  }, [searchParams, navigate]);

  const handleResendConfirmation = async () => {
    if (!email) {
      setError('No email address found');
      return;
    }

    setIsResending(true);
    setError(null);
    setResendSuccess(false);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (error) throw error;

      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend confirmation email');
    } finally {
      setIsResending(false);
    }
  };

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
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Verification Failed</h2>
            <p className="mt-2 text-red-600">{error}</p>
          </>
        )}

        {/* Resend confirmation section - always visible */}
        {email && status !== 'success' && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Haven't received the confirmation email?</p>
            <button
              onClick={handleResendConfirmation}
              disabled={isResending}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? (
                <>
                  <PiSpinner className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                'Resend Confirmation Email'
              )}
            </button>
            
            {resendSuccess && (
              <p className="mt-4 text-green-600">
                Confirmation email has been resent. Please check your inbox.
              </p>
            )}

            {error && !resendSuccess && (
              <p className="mt-4 text-red-600">
                {error}
              </p>
            )}
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