import React from 'react';
import { PiChatCircle } from 'react-icons/pi';

interface RoundNotesProps {
  notes: string;
  onChange: (notes: string) => void;
}

function RoundNotes({ notes, onChange }: RoundNotesProps) {
  return (
    <div className="mt-2">
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
        <PiChatCircle className="w-4 h-4" />
        <span>Round Notes</span>
      </div>
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add notes for this round..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
        rows={2}
      />
    </div>
  );
}

export default RoundNotes;