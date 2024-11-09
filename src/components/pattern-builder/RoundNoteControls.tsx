import React from 'react';
import { PiNote } from 'react-icons/pi';

interface RoundNoteControlsProps {
  type: 'header' | 'footer';
  isVisible: boolean;
  onToggle: (isVisible: boolean) => void;
  value: string;
  onChange: (value: string) => void;
}

export default function RoundNoteControls({
  type,
  isVisible,
  onToggle,
  value,
  onChange,
}: RoundNoteControlsProps) {
  const isHeader = type === 'header';
  const buttonClassName = `${isHeader ? 'mb-2' : 'mt-4'} inline-flex items-center px-2 py-1 text-sm text-gray-600 hover:text-primary-600`;
  const inputPlaceholder = `Add a note ${isHeader ? 'above' : 'below'} this round...`;

  return (
    <>
      <button
        onClick={() => onToggle(!isVisible)}
        className={buttonClassName}
      >
        <PiNote className="w-4 h-4 mr-1" />
        {isVisible ? `Hide ${type} Note` : `Add ${type} Note`}
      </button>

      {isVisible && (
        <div className={isHeader ? 'mb-2' : 'mt-2'}>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={inputPlaceholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      )}
    </>
  );
}