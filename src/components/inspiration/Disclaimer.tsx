import React from 'react';
import { PiWarning } from 'react-icons/pi';

export function Disclaimer() {
  return (
    <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
      <div className="flex items-start">
        <PiWarning className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="text-sm text-amber-800">
          <p className="font-medium mb-1">Important Notice:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>AI-generated patterns are for inspiration only and require human testing</li>
            <li>Always test and verify patterns thoroughly before use or distribution</li>
            <li>Use the pattern builder to refine and validate the generated pattern</li>
            <li>Only sell patterns that have been thoroughly tested by a human crocheter</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
