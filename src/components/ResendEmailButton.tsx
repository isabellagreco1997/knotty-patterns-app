import React, { useState } from 'react';
import { PiSpinner } from 'react-icons/pi';
import { supabase } from '../lib/supabase';

interface ResendEmailButtonProps {
  email: string | null;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function ResendEmailButton({ 
  email, 
  onSuccess,
  onError 
}: ResendEmailButtonProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResendConfirmation = async () => {
    if (!email) {
      setError('No email address found');
      onError?.('No email address found');
      return;
    }

    setIsResending(true);
    setError(null);
    setResendSuccess(false);

    try {
      const { error: supabaseError } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (supabaseError) throw supabaseError;

      setResendSuccess(true);
      onSuccess?.();
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend confirmation email';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleResendConfirmation}
        disabled={isResending}
        className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
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
        <p className="mt-4 text-green-600 text-center">
          Confirmation email has been resent. Please check your inbox.
        </p>
      )}

      {error && !resendSuccess && (
        <p className="mt-4 text-red-600 text-center">
          {error}
        </p>
      )}
    </div>
  );
}