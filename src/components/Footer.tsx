import React from 'react';
import { PiScissors, PiInstagramLogo, PiTwitterLogo } from 'react-icons/pi';

const Footer: React.FC = () => {
  return (
    <footer className="bg-violet-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
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
        
        <div className="mt-8 text-center text-violet-300 text-sm">
          © {new Date().getFullYear()} KnottyPatterns. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;