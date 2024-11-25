import React from 'react';
import { Link } from 'react-router-dom';
import { PiSparkle } from 'react-icons/pi';

interface FreeAccountNoticeProps {
  generationsLeft: number | null;
}

export function FreeAccountNotice({ generationsLeft }: FreeAccountNoticeProps) {
  return (
    <div className="mb-8 p-4 bg-primary-50 border border-primary-200 rounded-xl">
      <div className="flex items-start">
        <PiSparkle className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <p className="text-primary-800 font-medium">
            Free Account: {generationsLeft} generations remaining
          </p>
          <p className="text-sm text-primary-600 mt-1">
            Upgrade to Premium for unlimited generations and access to all features!
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg mt-3 hover:bg-primary-700 transition-colors text-sm"
          >
            View Premium Features
          </Link>
        </div>
      </div>
    </div>
  );
}
