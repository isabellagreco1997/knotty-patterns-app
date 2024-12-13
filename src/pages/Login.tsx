import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PiSparkle, PiEnvelope, PiLockSimple, PiEye, PiEyeSlash, PiCheckCircle, PiGoogleLogo } from 'react-icons/pi';
import { useAuthStore } from '../stores/useAuthStore';
import { supabase } from '../lib/supabase';
import FeedbackBanner from '../components/FeedbackBanner';

const passwordRequirements = [
  {
    label: "At least 8 characters long",
    test: (password: string) => password.length >= 8
  },
  {
    label: "Contains at least one uppercase letter",
    test: (password) => /[A-Z]/.test(password)
  },
  {
    label: "Contains at least one lowercase letter",
    test: (password) => /[a-z]/.test(password)
  },
  {
    label: "Contains at least one number",
    test: (password) => /\d/.test(password)
  },
  {
    label: "Contains at least one special character",
    test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }
];

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmEmailSent, setConfirmEmailSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, user, loading } = useAuthStore();
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (user) {
      const redirectTo = new URLSearchParams(location.search).get('redirect') || '/dashboard';
      navigate(redirectTo);
    }
  }, [user, navigate, location]);

  const validatePassword = (password: string): boolean => {
    return passwordRequirements.every(req => req.test(password));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isSignUp) {
      if (!validatePassword(password)) {
        setError('Password does not meet requirements');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }
    
    try {
      if (isSignUp) {
        const result = await signUp(email, password);
        if (result.confirmEmailSent) {
          setConfirmEmailSent(true);
        }
      } else {
        await signIn(email, password);
        const redirectTo = new URLSearchParams(location.search).get('redirect') || '/dashboard';
        navigate(redirectTo);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const redirectTo = new URLSearchParams(location.search).get('redirect');
      if (redirectTo) {
        localStorage.setItem('auth_redirect', '/dashboard');
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    }
  };

  if (confirmEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 text-center">
          <PiCheckCircle className="w-12 h-12 text-green-500 mx-auto" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Check your email</h2>
          <p className="mt-2 text-gray-600">
            We've sent a confirmation link to <strong>{email}</strong>
          </p>
          <button
            onClick={() => setConfirmEmailSent(false)}
            className="mt-6 text-primary-600 hover:text-primary-500"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="max-w-md w-full">
          <div className="bg-white p-8 rounded-xl shadow-xl">
            {/* Header */}
            {isSignUp ? (
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full mb-4">
                  <PiSparkle className="w-5 h-5 mr-2" />
                  #1 Most Used Pattern Builder Software for Crochet Patterns
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Sign up & Get Started 
                </h1>
              </div>
            ) : (
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Welcome back!
              </h2>
            )}

            {/* Toggle Sign In/Up */}
            <p className="text-center text-sm text-gray-600 mb-6">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="text-primary-600 hover:text-primary-500 font-medium"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <PiGoogleLogo className="w-5 h-5 mr-2 text-red-500" />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
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
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PiLockSimple className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <PiEyeSlash className="h-5 w-5 text-gray-400" />
                    ) : (
                      <PiEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Sign Up only) */}
              {isSignUp && (
                <>
                  <div>
                    <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PiLockSimple className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="Confirm Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <PiEyeSlash className="h-5 w-5 text-gray-400" />
                        ) : (
                          <PiEye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Password requirements:</p>
                    <ul className="space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <li
                          key={index}
                          className={`text-sm flex items-center ${
                            req.test(password) ? 'text-green-600' : 'text-gray-500'
                          }`}
                        >
                          {req.test(password) ? (
                            <PiCheckCircle className="w-4 h-4 mr-2" />
                          ) : (
                            <div className="w-4 h-4 mr-2 border border-gray-300 rounded-full" />
                          )}
                          {req.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
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

              {/* Terms and Privacy (Sign Up only) */}
              {isSignUp && (
                <p className="text-xs text-gray-500 text-center">
                  By signing up, you agree to our{' '}
                  <Link to="/privacy-policy" className="text-primary-600 hover:text-primary-500">
                    Privacy Policy
                  </Link>
                  {' and '}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                    Terms of Service
                  </Link>
                </p>
              )}

              {/* Forgot Password (Sign In only) */}
              {!isSignUp && (
                <div className="text-sm text-center">
                  <Link
                    to="/forgot-password"
                    className="text-primary-600 hover:text-primary-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <FeedbackBanner />
    </>
  );
}