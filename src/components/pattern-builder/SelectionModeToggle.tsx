import React from 'react';
import { PiRepeat } from 'react-icons/pi';

interface SelectionModeToggleProps {
  isSelectingStitches: boolean;
  onToggle: (isSelecting: boolean) => void;
}

export default function SelectionModeToggle({
  isSelectingStitches,
  onToggle,
}: SelectionModeToggleProps) {
  return (
    <div className="mb-4 flex items-center space-x-4">
      <button
        onClick={() => onToggle(!isSelectingStitches)}
        className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isSelectingStitches
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <PiRepeat className="w-4 h-4 mr-2" />
        {isSelectingStitches ? 'Cancel Selection' : 'Select Stitches'}
      </button>
      <span className="text-xs text-gray-400">
      Select the stitches you want to include in a repetition group
  </span>

      {isSelectingStitches && (
        <span className="text-sm text-gray-600">
          Click on stitches to select them for a repetition group
        </span>
      )}
    </div>
  );
}