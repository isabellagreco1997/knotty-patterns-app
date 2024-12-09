import React from 'react';
import { Link } from 'react-router-dom';
import { PiPencilSimple, PiArrowRight } from 'react-icons/pi';

export default function PatternDetailAd() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-primary-100 mb-8">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <PiPencilSimple className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Create Your Own Patterns
            </h3>
            <p className="text-sm text-gray-600">
              Try our intuitive pattern builder with AI assistance
            </p>
          </div>
        </div>
        <Link
          to="/pattern-builder"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Try Now
          <PiArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}