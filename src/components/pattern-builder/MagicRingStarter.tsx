import React, { useState } from 'react';
import { PiCircle } from 'react-icons/pi';

interface MagicRingStarterProps {
  onStart: (stitches: number) => void;
}

function MagicRingStarter({ onStart }: MagicRingStarterProps) {
  const [stitches, setStitches] = useState(6);

  return (
    <div className="mb-6 p-4 border border-rose-200 rounded-lg bg-rose-50">
      <h3 className="text-lg font-medium mb-3">Start with Magic Ring</h3>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          min="1"
          value={stitches}
          onChange={(e) => setStitches(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20 px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={() => onStart(stitches)}
          className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700"
        >
          <PiCircle className="w-4 h-4 mr-2" />
          Start Magic Ring
        </button>
      </div>
    </div>
  );
}

export default MagicRingStarter;