import React from 'react';
import { PiX } from 'react-icons/pi';
import type { Stitch } from '../../types/pattern';

interface StitchNoteEditorProps {
  stitch: Stitch;
  onClose: () => void;
  onUpdateNote: (stitchId: string, note: any) => void;
}

export default function StitchNoteEditor({
  stitch,
  onClose,
  onUpdateNote,
}: StitchNoteEditorProps) {
  return (
    <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-2 space-y-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Stitch Notes</span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <PiX className="w-4 h-4" />
        </button>
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1">Note Before Stitch</label>
        <input
          type="text"
          value={stitch.note?.beforeNote || ''}
          onChange={(e) => onUpdateNote(stitch.id, { 
            ...stitch.note,
            beforeNote: e.target.value 
          })}
          placeholder="Add note before this stitch..."
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1">Note After Stitch</label>
        <input
          type="text"
          value={stitch.note?.afterNote || ''}
          onChange={(e) => onUpdateNote(stitch.id, {
            ...stitch.note,
            afterNote: e.target.value
          })}
          placeholder="Add note after this stitch..."
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
        />
      </div>
    </div>
  );
}