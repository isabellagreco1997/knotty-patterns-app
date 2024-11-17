import React from 'react';
import { Link } from 'react-router-dom';
import { PiScissors, PiInstagramLogo, PiTwitterLogo } from 'react-icons/pi';

const Footer: React.FC = () => {
  return (
    <footer className="bg-violet-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <PiScissors className="w-8 h-8 text-folly-300" />
            <span className="text-xl font-bold">KnottyPatterns</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-folly-300 transition-colors">
              <PiInstagramLogo className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-folly-300 transition-colors">
              <PiTwitterLogo className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/pattern-builder" className="hover:text-primary-300">Pattern Builder</Link></li>
              <li><Link to="/pricing" className="hover:text-primary-300">Pricing</Link></li>
              <li><Link to="/blog" className="hover:text-primary-300">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="mailto:support@knottypatterns.com" className="hover:text-primary-300">Contact</a></li>
              <li><Link to="/privacy-policy" className="hover:text-primary-300">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary-300">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-primary-300">About Us</Link></li>
              <li><a href="mailto:hello@knottypatterns.com" className="hover:text-primary-300">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-violet-300 text-sm border-t border-violet-800 pt-8">
          <p>© {new Date().getFullYear()} KnottyPatterns. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/privacy-policy" className="hover:text-primary-300">Privacy Policy</Link>
            {' • '}
            <Link to="/terms" className="hover:text-primary-300">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;