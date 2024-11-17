import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiScissors, PiUser, PiSignOut, PiList, PiX, PiGear } from 'react-icons/pi';
import { useAuthStore } from '../stores/useAuthStore';
import { useCustomer } from '../hooks/useCustomer';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const { customer, loading: customerLoading } = useCustomer();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <PiScissors className="w-8 h-8 text-primary-500" />
            <span className="text-xl font-bold text-primary-500">KnottyPatterns</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-primary-500 hover:bg-primary-50"
          >
            {isMenuOpen ? (
              <PiX className="w-6 h-6" />
            ) : (
              <PiList className="w-6 h-6" />
            )}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
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
                  <PiGear className="w-4 h-4 mr-2" />
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

        {/* Mobile menu */}
        <div
          className={`md:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          } border-t border-gray-200 py-2`}
        >
          <div className="flex flex-col space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/pattern-builder"
              onClick={closeMenu}
              className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium"
            >
              Pattern Builder
            </Link>
            <Link
              to="/pricing"
              onClick={closeMenu}
              className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium"
            >
              Pricing
            </Link>
            <Link
              to="/blog"
              onClick={closeMenu}
              className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium"
            >
              Blog
            </Link>
            {user && (
              <Link
                to="/saved-patterns"
                onClick={closeMenu}
                className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium"
              >
                My Patterns
              </Link>
            )}
            {user ? (
              <>
                <Link
                  to="/account"
                  onClick={closeMenu}
                  className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium"
                >
                  <PiGear className="w-4 h-4 inline mr-2" />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    closeMenu();
                  }}
                  className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium text-left w-full"
                >
                  <PiSignOut className="w-4 h-4 inline mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium"
              >
                <PiUser className="w-4 h-4 inline mr-2" />
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