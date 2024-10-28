import React from 'react';
import { Link } from 'react-router-dom';
import { PiScissors, PiUser, PiSignOut } from 'react-icons/pi';
import { useAuthStore } from '../stores/useAuthStore';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <PiScissors className="w-8 h-8 text-primary-500" />
            <span className="text-xl font-bold text-primary-500">KnottyPatterns</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/pattern-builder"
              className="text-primary-500 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Pattern Builder
            </Link>
            <Link
              to="/pricing"
              className="text-primary-500 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Pricing
            </Link>
            <Link
              to="/blog"
              className="text-primary-500 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Blog
            </Link>
            {user && (
              <Link
                to="/saved-patterns"
                className="text-primary-500 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                My Patterns
              </Link>
            )}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/account"
                  className="inline-flex items-center px-3 py-2 border border-primary-300 text-sm font-medium rounded-md text-primary-500 hover:bg-primary-50 transition-colors"
                >
                  <PiUser className="w-4 h-4 mr-2" />
                  {user.email}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-3 py-2 border border-primary-300 text-sm font-medium rounded-md text-primary-500 hover:bg-primary-50 transition-colors"
                >
                  <PiSignOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-primary-300 text-sm font-medium rounded-md text-primary-500 hover:bg-primary-50 transition-colors"
              >
                <PiUser className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;