import React from 'react';
import { PiTrash, PiNote } from 'react-icons/pi';
import StitchCount from './StitchCount';
import type { Stitch, RepetitionGroup } from '../../types/pattern';
import StitchNoteEditor from './StitchNoteEditor';

interface StitchListProps {
  stitches: Stitch[];
  repetitionGroups: RepetitionGroup[];
  isSelectingStitches: boolean;
  selectedStitches: string[];
  editingStitchId: string | null;
  onStitchSelect: (stitchId: string) => void;
  onUpdateCount: (stitchId: string, count: number) => void;
  onDeleteStitch: (stitchId: string) => void;
  onEditStitch: (stitchId: string | null) => void;
  onUpdateStitchNote: (stitchId: string, note: any) => void;
}

export default function StitchList({
  stitches,
  repetitionGroups,
  isSelectingStitches,
  selectedStitches,
  editingStitchId,
  onStitchSelect,
  onUpdateCount,
  onDeleteStitch,
  onEditStitch,
  onUpdateStitchNote,
}: StitchListProps) {
  const getStitchGroupColor = (stitch: Stitch) => {
    const groupIndex = repetitionGroups.findIndex(g => g.stitchIds.includes(stitch.id));
    if (groupIndex === -1) return 'bg-primary-100';
    
    const colors = [
      'bg-primary-200',
      'bg-rose-200',
      'bg-amber-200',
      'bg-emerald-200',
      'bg-sky-200'
    ];
    return colors[groupIndex % colors.length];
  };

  const isStitchInGroup = (stitchId: string) => {
    return repetitionGroups.some(g => g.stitchIds.includes(stitchId));
  };

  return (
    <div className="flex flex-wrap gap-2 min-h-[50px] p-4 bg-gray-50 rounded-md">
      {stitches.map((stitch) => {
        const isSelected = selectedStitches.includes(stitch.id);
        const isPartOfGroup = isStitchInGroup(stitch.id);
        const groupColor = getStitchGroupColor(stitch);
        
        return (
          <div
            key={stitch.id}
            className={`group relative ${
              isSelectingStitches ? 'cursor-pointer' : ''
            } ${isSelected ? 'ring-2 ring-primary-500' : ''}`}
            onClick={() => onStitchSelect(stitch.id)}
          >
            <div className={`flex items-center space-x-2 px-2 py-1 ${groupColor} 
              text-primary-700 rounded-md text-sm transition-colors
              ${isSelectingStitches && !isPartOfGroup ? 'hover:ring-2 hover:ring-primary-400' : ''}`}
            >
              {stitch.note?.beforeNote && (
                <span className="text-xs text-primary-600">
                  {stitch.note.beforeNote}
                </span>
              )}
              <StitchCount
                count={stitch.count}
                onChange={(count) => onUpdateCount(stitch.id, count)}
              />
              <span>{stitch.type}</span>
              {stitch.type === 'dec' && (
                <span className="text-xs text-primary-500">
                  ({stitch.count * 2} sts)
                </span>
              )}
              {stitch.note?.afterNote && (
                <span className="text-xs text-primary-600">
                  {stitch.note.afterNote}
                </span>
              )}
              {!isSelectingStitches && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteStitch(stitch.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-primary-200 rounded-full"
                  >
                    <PiTrash className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditStitch(editingStitchId === stitch.id ? null : stitch.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-primary-200 rounded-full"
                  >
                    <PiNote className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            
            {editingStitchId === stitch.id && (
              <StitchNoteEditor
                stitch={stitch}
                onClose={() => onEditStitch(null)}
                onUpdateNote={onUpdateStitchNote}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}