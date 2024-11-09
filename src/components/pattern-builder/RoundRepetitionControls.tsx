import React from 'react';

interface RoundRepetitionControlsProps {
  isRepeating: boolean;
  repeatCount: number;
  onRepeatChange: (isRepeating: boolean) => void;
  onCountChange: (count: number) => void;
}

export default function RoundRepetitionControls({
  isRepeating,
  repeatCount,
  onRepeatChange,
  onCountChange,
}: RoundRepetitionControlsProps) {
  return (
    <div className="flex items-center space-x-4">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isRepeating}
          onChange={(e) => onRepeatChange(e.target.checked)}
          className="rounded text-primary-600"
        />
        <span className="text-sm text-gray-700">Repeat Entire Round</span>
      </label>
      
      {isRepeating && (
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={repeatCount}
            onChange={(e) => onCountChange(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
            min="1"
          />
          <span className="text-sm text-gray-700">times</span>
        </div>
      )}
    </div>
  );
}