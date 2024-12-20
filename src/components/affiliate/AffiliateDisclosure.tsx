import React from 'react';
import { PiInfo } from 'react-icons/pi';

export default function AffiliateDisclosure() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600 mb-8">
      <div className="flex items-start">
        <PiInfo className="w-5 h-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
        <p>
          As an Amazon Associate, KnottyPatterns earns from qualifying purchases. 
          This means we may receive a commission if you click a link to Amazon and 
          make a purchase. This does not affect your price and helps support our work.
        </p>
      </div>
    </div>
  );
}