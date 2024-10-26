import React from 'react';
import { Link } from 'react-router-dom';
import { PiScissors, PiUser } from 'react-icons/pi';
import { useAuthStore } from '../stores/useAuthStore';

const Navbar: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <PiScissors className="w-8 h-8 text-folly-500" />
            <span className="text-xl font-bold text-folly-500">KnottyPatterns</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/pattern-builder"
              className="text-violet-500 hover:text-violet-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Pattern Builder
            </Link>
            <Link
              to="/pricing"
              className="text-violet-500 hover:text-violet-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Pricing
            </Link>
            <Link
              to="/blog"
              className="text-violet-500 hover:text-violet-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Blog
            </Link>
            {user && (
              <Link
                to="/saved-patterns"
                className="text-violet-500 hover:text-violet-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                My Patterns
              </Link>
            )}
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-folly-300 text-sm font-medium rounded-md text-folly-500 hover:bg-folly-50 transition-colors"
            >
              <PiUser className="w-4 h-4 mr-2" />
              {user ? 'Account' : 'Sign In'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;