import React from 'react';
import { PiMinus, PiPlus } from 'react-icons/pi';

interface StitchCountProps {
  count: number;
  onChange: (count: number) => void;
}

function StitchCount({ count, onChange }: StitchCountProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onChange(Math.max(1, count - 1))}
        className="p-1 rounded-md hover:bg-rose-100"
      >
        <PiMinus className="w-4 h-4" />
      </button>
      <span className="w-8 text-center">{count}</span>
      <button
        onClick={() => onChange(count + 1)}
        className="p-1 rounded-md hover:bg-rose-100"
      >
        <PiPlus className="w-4 h-4" />
      </button>
    </div>
  );
}

export default StitchCount;