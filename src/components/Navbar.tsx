import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  PiList, 
  PiX, 
  PiUser, 
  PiSignOut, 
  PiGear, 
  PiMagicWand, 
  PiBook,
  PiCaretDown,
  PiPencilSimple,
  PiFolder,
  PiHouse
} from 'react-icons/pi';
import { useAuthStore } from '../stores/useAuthStore';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMyPatternsMenuOpen, setIsMyPatternsMenuOpen] = useState(false);
  const [isLearnMenuOpen, setIsLearnMenuOpen] = useState(false);
  const { user, signOut } = useAuthStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.svg" alt="KnottyPatterns" className="w-8 h-8" />
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-lg font-medium ${
                    isActive('/dashboard')
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <PiHouse className="w-4 h-4" />
                    <span>Dashboard</span>
                  </div>
                </Link>

                {/* My Patterns Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsMyPatternsMenuOpen(!isMyPatternsMenuOpen)}
                    className={`px-3 py-2 rounded-lg flex items-center space-x-2 ${
                      isMyPatternsMenuOpen || isActive('/pattern-builder') || isActive('/saved-patterns') || isActive('/generated-patterns')
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <PiFolder className="w-4 h-4" />
                    <span>My Patterns</span>
                    <PiCaretDown className={`w-4 h-4 transition-transform ${isMyPatternsMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isMyPatternsMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                      <Link
                        to="/pattern-builder"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMyPatternsMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <PiPencilSimple className="w-4 h-4 mr-2" />
                          New Pattern
                        </div>
                      </Link>
                      <Link
                        to="/saved-patterns"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMyPatternsMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <PiFolder className="w-4 h-4 mr-2" />
                          Saved Patterns
                        </div>
                      </Link>
                      <Link
                        to="/generated-patterns"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMyPatternsMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <PiMagicWand className="w-4 h-4 mr-2" />
                          AI Generated
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : null}

            {/* AI Generator */}
            <Link
              to="/get-inspiration"
              className={`px-3 py-2 rounded-lg ${
                isActive('/get-inspiration')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <PiMagicWand className="w-4 h-4" />
                <span>AI Generator</span>
              </div>
            </Link>

            {/* Learn Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLearnMenuOpen(!isLearnMenuOpen)}
                className={`px-3 py-2 rounded-lg flex items-center space-x-2 ${
                  isLearnMenuOpen ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <PiBook className="w-4 h-4" />
                <span>Learn</span>
                <PiCaretDown className={`w-4 h-4 transition-transform ${isLearnMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLearnMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                  <Link
                    to="/stitch-glossary"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsLearnMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <PiBook className="w-4 h-4 mr-2" />
                      Stitch Glossary
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Pricing */}
            <Link
              to="/pricing"
              className={`px-3 py-2 rounded-lg ${
                isActive('/pricing')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Pricing
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/account"
                  className="inline-flex items-center px-3 py-2 border border-primary-300 text-sm font-medium rounded-md text-primary-500 hover:bg-primary-50 transition-colors"
                >
                  <PiGear className="w-4 h-4 mr-2" />
                  <span className="max-w-[120px] truncate">{user.email}</span>
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

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          } border-t border-gray-200 py-2`}
        >
          <div className="flex flex-col space-y-1 px-2 pb-3 pt-2">
            {user && (
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <PiHouse className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            )}

            {/* Mobile My Patterns Section */}
            {user && (
              <div className="border-t border-gray-100 my-2 pt-2">
                <div className="px-3 py-2 text-sm font-medium text-gray-500">My Patterns</div>
                <Link
                  to="/pattern-builder"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium flex items-center"
                >
                  <PiPencilSimple className="w-4 h-4 mr-2" />
                  New Pattern
                </Link>
                <Link
                  to="/saved-patterns"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium flex items-center"
                >
                  <PiFolder className="w-4 h-4 mr-2" />
                  Saved Patterns
                </Link>
                <Link
                  to="/generated-patterns"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium flex items-center"
                >
                  <PiMagicWand className="w-4 h-4 mr-2" />
                  AI Generated
                </Link>
              </div>
            )}

            <Link
              to="/get-inspiration"
              onClick={() => setIsMenuOpen(false)}
              className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <PiMagicWand className="w-4 h-4 mr-2" />
              AI Generator
            </Link>

            {/* Mobile Learn Section */}
            <div className="border-t border-gray-100 my-2 pt-2">
              <div className="px-3 py-2 text-sm font-medium text-gray-500">Learn</div>
              <Link
                to="/stitch-glossary"
                onClick={() => setIsMenuOpen(false)}
                className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <PiBook className="w-4 h-4 mr-2" />
                Stitch Glossary
              </Link>
            </div>

            <Link
              to="/pricing"
              onClick={() => setIsMenuOpen(false)}
              className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium"
            >
              Pricing
            </Link>

            {user ? (
              <>
                <div className="border-t border-gray-100 my-2"></div>
                <Link
                  to="/account"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium flex items-center"
                >
                  <PiGear className="w-4 h-4 mr-2" />
                  Account Settings
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium text-left w-full flex items-center"
                >
                  <PiSignOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-primary-500 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium flex items-center"
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
}