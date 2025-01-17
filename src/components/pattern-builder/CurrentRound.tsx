import React, { useState } from 'react';
import { PiPlus, PiTrash, PiNote, PiTextT, PiRepeat } from 'react-icons/pi';
import type { Round, Stitch } from '../../types/pattern';
import StitchCount from './StitchCount';
import RoundNotes from './RoundNotes';

interface CurrentRoundProps {
  round: Round;
  onComplete: (round: Round) => void;
  onUpdateCount: (stitchId: string, count: number) => void;
  onUpdateNotes: (notes: string) => void;
  onDeleteStitch: (stitchId: string) => void;
  onUpdateStitchNote: (stitchId: string, note: string) => void;
  onUpdateHeaderNote: (note: string) => void;
  onUpdateFooterNote: (note: string) => void;
}

export default function CurrentRound({
  round,
  onComplete,
  onUpdateCount,
  onUpdateNotes,
  onDeleteStitch,
  onUpdateStitchNote,
  onUpdateHeaderNote,
  onUpdateFooterNote,
}: CurrentRoundProps) {
  const [showHeaderNote, setShowHeaderNote] = useState(false);
  const [showFooterNote, setShowFooterNote] = useState(false);
  const [editingStitchId, setEditingStitchId] = useState<string | null>(null);
  const [isRepeating, setIsRepeating] = useState(false);
  const [repeatCount, setRepeatCount] = useState(6);

  const calculateTotalStitches = (stitches: Stitch[], repeats: number = 1): number => {
    const singleRepeatTotal = stitches.reduce((sum, stitch) => {
      if (stitch.type === 'inc') return sum + (stitch.count * 2);
      if (stitch.type === 'dec') return sum + Math.ceil(stitch.count / 2);
      return sum + stitch.count;
    }, 0);
    return singleRepeatTotal * repeats;
  };

  const formatStitchPattern = (stitches: Stitch[]): string => {
    return stitches.map(s => `${s.count} ${s.type}`).join(', ');
  };

  const handleComplete = () => {
    if (round.stitches.length === 0) return;

    let updatedRound: Round;
    if (isRepeating) {
      const stitchPattern = formatStitchPattern(round.stitches);
      const totalStitches = calculateTotalStitches(round.stitches, repeatCount);
      
      updatedRound = {
        ...round,
        notes: `(${stitchPattern}) * ${repeatCount}x (${totalStitches} sts)`,
        stitches: round.stitches.map(stitch => ({
          ...stitch,
          note: `Repeat ${repeatCount}x`
        }))
      };
    } else {
      const totalStitches = calculateTotalStitches(round.stitches);
      updatedRound = {
        ...round,
        notes: `${totalStitches} sts`
      };
    }

    onComplete(updatedRound);
    setIsRepeating(false);
    setRepeatCount(6);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Current Round</h2>
      
      <button
        onClick={() => setShowHeaderNote(!showHeaderNote)}
        className="mb-2 inline-flex items-center px-2 py-1 text-sm text-gray-600 hover:text-primary-600"
      >
        <PiTextT className="w-4 h-4 mr-1" />
        {showHeaderNote ? 'Hide Header Note' : 'Add Header Note'}
      </button>

      {showHeaderNote && (
        <div className="mb-2">
          <input
            type="text"
            value={round.headerNote || ''}
            onChange={(e) => onUpdateHeaderNote(e.target.value)}
            placeholder="Add a note above this round..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2 min-h-[50px] p-4 bg-gray-50 rounded-md">
        {round.stitches.map((stitch) => (
          <div
            key={stitch.id}
            className="group relative"
          >
            <div className="flex items-center space-x-2 px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">
              <StitchCount
                count={stitch.count}
                onChange={(count) => onUpdateCount(stitch.id, count)}
              />
              <span>{stitch.type}</span>
              <button
                onClick={() => onDeleteStitch(stitch.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-primary-200 rounded-full"
              >
                <PiTrash className="w-4 h-4" />
              </button>
              <button
                onClick={() => setEditingStitchId(editingStitchId === stitch.id ? null : stitch.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-primary-200 rounded-full"
              >
                <PiNote className="w-4 h-4" />
              </button>
            </div>
            
            {editingStitchId === stitch.id && (
              <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-2">
                <input
                  type="text"
                  value={stitch.note || ''}
                  onChange={(e) => onUpdateStitchNote(stitch.id, e.target.value)}
                  placeholder="Add note for this stitch..."
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {round.stitches.length > 0 && (
        <div className="mt-4 flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isRepeating}
              onChange={(e) => setIsRepeating(e.target.checked)}
              className="rounded text-primary-600"
            />
            <span className="text-sm text-gray-700">Repeat Pattern</span>
          </label>
          
          {isRepeating && (
            <div className="flex items-center space-x-2">
              <PiRepeat className="w-4 h-4 text-gray-500" />
              <input
                type="number"
                value={repeatCount}
                onChange={(e) => setRepeatCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
                min="1"
              />
              <span className="text-sm text-gray-700">times</span>
              <span className="text-sm text-gray-500">
                ({calculateTotalStitches(round.stitches, repeatCount)} sts total)
              </span>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setShowFooterNote(!showFooterNote)}
        className="mt-4 inline-flex items-center px-2 py-1 text-sm text-gray-600 hover:text-primary-600"
      >
        <PiTextT className="w-4 h-4 mr-1" />
        {showFooterNote ? 'Hide Footer Note' : 'Add Footer Note'}
      </button>

      {showFooterNote && (
        <div className="mt-2">
          <input
            type="text"
            value={round.footerNote || ''}
            onChange={(e) => onUpdateFooterNote(e.target.value)}
            placeholder="Add a note below this round..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      )}

      <RoundNotes
        notes={round.notes || ''}
        onChange={onUpdateNotes}
      />

      <button
        onClick={handleComplete}
        className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
      >
        <PiPlus className="w-4 h-4 mr-2" />
        Complete Round
      </button>
    </div>
  );
}