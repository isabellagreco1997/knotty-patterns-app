import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  PiUser, 
  PiSignOut, 
  PiList, 
  PiX, 
  PiGear, 
  PiRobot, 
  PiMagicWand,
  PiCaretDown,
  PiPencilSimple,
  PiFolder,
  PiBook,
  PiHouse,
  PiPlus
} from 'react-icons/pi';
import { useAuthStore } from '../stores/useAuthStore';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMyPatternsMenuOpen, setIsMyPatternsMenuOpen] = useState(false);
  const [isLearnMenuOpen, setIsLearnMenuOpen] = useState(false);
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
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
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-lg font-medium ${
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
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
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
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border">
                      <Link
                        to="/pattern-builder"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsMyPatternsMenuOpen(false)}
                      >
                        <PiPlus className="w-4 h-4 mr-2" />
                        New Pattern
                      </Link>
                      <Link
                        to="/saved-patterns"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsMyPatternsMenuOpen(false)}
                      >
                        <PiFolder className="w-4 h-4 mr-2" />
                        Saved Patterns
                      </Link>
                      <Link
                        to="/generated-patterns"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsMyPatternsMenuOpen(false)}
                      >
                        <PiRobot className="w-4 h-4 mr-2" />
                        AI Generated Patterns
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/pattern-builder"
                className={`px-4 py-2 rounded-lg ${
                  isActive('/pattern-builder')
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <PiPencilSimple className="w-4 h-4" />
                  <span>Pattern Builder</span>
                </div>
              </Link>
            )}

            {/* AI Generator */}
            <Link
              to="/get-inspiration"
              className={`px-4 py-2 rounded-lg ${
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
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  isLearnMenuOpen ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <PiBook className="w-4 h-4" />
                <span>Learn</span>
                <PiCaretDown className={`w-4 h-4 transition-transform ${isLearnMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLearnMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border">
                  <Link
                    to="/stitch-glossary"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsLearnMenuOpen(false)}
                  >
                    <PiBook className="w-4 h-4 mr-2" />
                    Stitch Glossary
                  </Link>
                  <Link
                    to="/blog"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsLearnMenuOpen(false)}
                  >
                    <PiBook className="w-4 h-4 mr-2" />
                    Blog
                  </Link>
                </div>
              )}
            </div>

            {/* Pricing */}
            <Link
              to="/pricing"
              className={`px-4 py-2 rounded-lg ${
                isActive('/pricing')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Pricing
            </Link>

            {/* User Menu */}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {user && (
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <PiHouse className="w-4 h-4 mr-2" />
                    Dashboard
                  </div>
                </Link>
              )}

              {/* Pattern Builder / My Patterns */}
              {user ? (
                <>
                  <div className="px-4 py-2">
                    <div className="font-medium text-gray-700 mb-2">My Patterns</div>
                    <div className="space-y-2 pl-4">
                      <Link
                        to="/pattern-builder"
                        className="block text-gray-600 hover:text-gray-900"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <PiPlus className="w-4 h-4 inline mr-2" />
                        New Pattern
                      </Link>
                      <Link
                        to="/saved-patterns"
                        className="block text-gray-600 hover:text-gray-900"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <PiFolder className="w-4 h-4 inline mr-2" />
                        Saved Patterns
                      </Link>
                      <Link
                        to="/generated-patterns"
                        className="block text-gray-600 hover:text-gray-900"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <PiRobot className="w-4 h-4 inline mr-2" />
                        AI Generated Patterns
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to="/pattern-builder"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PiPencilSimple className="w-4 h-4 inline mr-2" />
                  Pattern Builder
                </Link>
              )}

              {/* AI Generator */}
              <Link
                to="/get-inspiration"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <PiMagicWand className="w-4 h-4 inline mr-2" />
                AI Generator
              </Link>

              {/* Learn Section */}
              <div className="px-4 py-2">
                <div className="font-medium text-gray-700 mb-2">Learn</div>
                <div className="space-y-2 pl-4">
                  <Link
                    to="/stitch-glossary"
                    className="block text-gray-600 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PiBook className="w-4 h-4 inline mr-2" />
                    Stitch Glossary
                  </Link>
                  <Link
                    to="/blog"
                    className="block text-gray-600 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PiBook className="w-4 h-4 inline mr-2" />
                    Blog
                  </Link>
                </div>
              </div>

              {/* Pricing */}
              <Link
                to="/pricing"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>

              {/* User Menu */}
              {user ? (
                <>
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PiGear className="w-4 h-4 inline mr-2" />
                    Account Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <PiSignOut className="w-4 h-4 inline mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PiUser className="w-4 h-4 inline mr-2" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}