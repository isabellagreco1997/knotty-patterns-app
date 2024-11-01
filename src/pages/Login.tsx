import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { PiLockSimple, PiEnvelope, PiCheckCircle, PiWarning } from 'react-icons/pi';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmEmailSent, setConfirmEmailSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, user, loading } = useAuthStore();
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (user) {
      const redirectTo = new URLSearchParams(location.search).get('redirect') || '/pattern-builder';
      navigate(redirectTo);
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isSignUp) {
        const result = await signUp(email, password);
        if (result.confirmEmailSent) {
          setConfirmEmailSent(true);
        }
      } else {
        await signIn(email, password);
        const redirectTo = new URLSearchParams(location.search).get('redirect') || '/pattern-builder';
        navigate(redirectTo);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!isDevelopment && !import.meta.env.VITE_SUPABASE_URL) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <PiWarning className="mx-auto h-12 w-12 text-amber-500" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Configuration Required</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please set up your environment variables:
            </p>
            <div className="mt-4 text-left bg-gray-50 p-4 rounded-md">
              <code className="text-sm">
                VITE_SUPABASE_URL=your_supabase_url<br />
                VITE_SUPABASE_ANON_KEY=your_supabase_anon_key<br />
                VITE_SITE_URL=http://localhost:5173
              </code>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Create a .env file in your project root with these variables.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (confirmEmailSent) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <PiCheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Check your email</h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a confirmation link to <strong>{email}</strong>
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Click the link in the email to complete your registration. 
              If you don't see it, check your spam folder.
            </p>
            {isDevelopment && (
              <div className="mt-4 p-4 bg-blue-50 rounded-md text-left">
                <p className="text-sm font-medium text-blue-800">Development Mode:</p>
                <p className="text-xs text-blue-600 mt-1">
                  In development, you can sign in immediately without email confirmation.
                  <br />
                  Email: {email}
                  <br />
                  Password: {password}
                </p>
              </div>
            )}
            <button
              onClick={() => {
                setConfirmEmailSent(false);
                setIsSignUp(false);
              }}
              className="mt-6 text-primary-600 hover:text-primary-500"
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900">
              {isSignUp ? 'Create an account' : 'Sign in to your account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-primary-600 hover:text-primary-500 font-medium"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>

            {!isSignUp && isDevelopment && (
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800 font-medium">Demo Accounts:</p>
                <p className="text-xs text-blue-600 mt-1">
                  Premium User: premium@example.com<br />
                  Free User: free@example.com<br />
                  Password for both: password123
                </p>
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PiEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PiLockSimple className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  isSignUp ? 'Sign up' : 'Sign in'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}