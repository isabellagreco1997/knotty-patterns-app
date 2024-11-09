import React, { useState, useEffect } from 'react';
import { PiPlus, PiTrash, PiNote, PiX, PiRepeat, PiCursor } from 'react-icons/pi';
import type { Round, Stitch, RepetitionGroup } from '../../types/pattern';
import StitchCount from './StitchCount';
import RoundNotes from './RoundNotes';

interface CurrentRoundProps {
  round: Round;
  onComplete: (round: Round) => void;
  onUpdateCount: (stitchId: string, count: number) => void;
  onUpdateNotes: (notes: string) => void;
  onDeleteStitch: (stitchId: string) => void;
  onUpdateStitchNote: (stitchId: string, note: any) => void;
  onUpdateHeaderNote: (note: string) => void;
  onUpdateFooterNote: (note: string) => void;
}

function calculateTotalStitches(
  stitches: Stitch[], 
  repeatCount: number = 1,
  repetitionGroups: RepetitionGroup[] = []
): number {
  // Calculate base stitches (not in any group)
  const baseStitches = stitches.reduce((sum, stitch) => {
    if (repetitionGroups.some(g => g.stitchIds.includes(stitch.id))) {
      return sum; // Skip stitches that are part of groups
    }
    if (stitch.type === 'skip') return sum;
    if (stitch.type === 'inc') return sum + (stitch.count * 2);
    if (stitch.type === 'dec') return sum - stitch.count;
    return sum + stitch.count;
  }, 0);

  // Calculate stitches from repetition groups
  const groupStitches = repetitionGroups.reduce((sum, group) => {
    const groupTotal = group.stitchIds.reduce((groupSum, stitchId) => {
      const stitch = stitches.find(s => s.id === stitchId);
      if (!stitch) return groupSum;
      if (stitch.type === 'skip') return groupSum;
      if (stitch.type === 'inc') return groupSum + (stitch.count * 2);
      if (stitch.type === 'dec') return groupSum - stitch.count;
      return groupSum + stitch.count;
    }, 0);
    return sum + (groupTotal * group.count);
  }, 0);

  return (baseStitches + groupStitches) * repeatCount;
}

function formatStitchPattern(stitches: Stitch[], repetitionGroups: RepetitionGroup[] = []): string {
  // Create a map of stitches that are part of groups
  const stitchToGroup = new Map<string, RepetitionGroup>();
  repetitionGroups.forEach(group => {
    group.stitchIds.forEach(id => {
      stitchToGroup.set(id, group);
    });
  });

  // Track processed group IDs to avoid duplicating group patterns
  const processedGroups = new Set<string>();
  
  // Process stitches in their original order
  let pattern = '';
  let currentGroup: RepetitionGroup | null = null;
  let currentGroupStitches: string[] = [];

  stitches.forEach((stitch, index) => {
    const group = stitchToGroup.get(stitch.id);

    // If this stitch belongs to a different group than the current one
    if (group !== currentGroup) {
      // If we were building a group pattern, add it to the result
      if (currentGroup && currentGroupStitches.length > 0 && !processedGroups.has(currentGroup.id)) {
        if (pattern) pattern += ', ';
        pattern += `(${currentGroupStitches.join(', ')}) * ${currentGroup.count}`;
        processedGroups.add(currentGroup.id);
        currentGroupStitches = [];
      }
      
      // Start a new group or process individual stitch
      if (group && !processedGroups.has(group.id)) {
        currentGroup = group;
        currentGroupStitches = [];
      } else {
        currentGroup = null;
      }
    }

    // Format the stitch
    const beforeNote = stitch.note?.beforeNote ? `${stitch.note.beforeNote} ` : '';
    const afterNote = stitch.note?.afterNote ? ` ${stitch.note.afterNote}` : '';
    const stitchText = stitch.type === 'dec'
      ? `${beforeNote}dec ${stitch.count} (${stitch.count * 2} sts)${afterNote}`
      : `${beforeNote}${stitch.count} ${stitch.type}${afterNote}`;

    // Add the stitch to either the current group or the main pattern
    if (currentGroup && !processedGroups.has(currentGroup.id)) {
      currentGroupStitches.push(stitchText);
    } else if (!group || processedGroups.has(group.id)) {
      if (pattern) pattern += ', ';
      pattern += stitchText;
    }
  });

  // Add any remaining group pattern
  if (currentGroup && currentGroupStitches.length > 0 && !processedGroups.has(currentGroup.id)) {
    if (pattern) pattern += ', ';
    pattern += `(${currentGroupStitches.join(', ')}) * ${currentGroup.count}`;
  }

  return pattern;
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
  const [isRepeating, setIsRepeating] = useState(round.isRepeating || false);
  const [repeatCount, setRepeatCount] = useState(round.repeatCount || 6);
  const [selectedStitches, setSelectedStitches] = useState<string[]>([]);
  const [repetitionGroups, setRepetitionGroups] = useState<RepetitionGroup[]>(round.repetitionGroups || []);
  const [isSelectingStitches, setIsSelectingStitches] = useState(false);

  // Keep repetition groups in sync with round updates
  useEffect(() => {
    if (round.repetitionGroups) {
      // Filter out any groups that reference stitches that no longer exist
      const validGroups = round.repetitionGroups.filter(group => 
        group.stitchIds.every(id => round.stitches.some(stitch => stitch.id === id))
      );
      setRepetitionGroups(validGroups);
    }
    setIsRepeating(round.isRepeating || false);
    setRepeatCount(round.repeatCount || 6);
  }, [round]);

  const handleStitchClick = (stitchId: string) => {
    if (isStitchInGroup(stitchId)) {
      return; // Prevent selecting stitches that are already in a group
    }
    
    setSelectedStitches(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(stitchId)) {
        newSelection.delete(stitchId);
      } else {
        newSelection.add(stitchId);
      }
      return newSelection;
    });
  };

  const handleCreateRepetitionGroup = () => {
    if (selectedStitches.length < 2) return;

    const newGroup: RepetitionGroup = {
      id: Math.random().toString(36).substr(2, 9),
      stitchIds: selectedStitches,
      count: 2
    };

    setRepetitionGroups([...repetitionGroups, newGroup]);
    setSelectedStitches([]);
    setIsSelectingStitches(false);
  };

  const handleUpdateGroupCount = (groupId: string, count: number) => {
    setRepetitionGroups(groups => 
      groups.map(g => g.id === groupId ? { ...g, count } : g)
    );
  };

  const handleDeleteGroup = (groupId: string) => {
    setRepetitionGroups(groups => groups.filter(g => g.id !== groupId));
  };

  const toggleStitchSelection = (stitchId: string) => {
    if (!isSelectingStitches) return;
    
    const isPartOfGroup = repetitionGroups.some(g => g.stitchIds.includes(stitchId));
    if (isPartOfGroup) return;

    setSelectedStitches(prev => 
      prev.includes(stitchId)
        ? prev.filter(id => id !== stitchId)
        : [...prev, stitchId]
    );
  };

  const handleComplete = () => {
    if (round.stitches.length === 0) return;

    const updatedRound: Round = {
      ...round,
      isRepeating,
      repeatCount: isRepeating ? repeatCount : undefined,
      repetitionGroups,
      notes: formatStitchPattern(round.stitches, repetitionGroups),
      stitches: round.stitches
    };

    onComplete(updatedRound);
    setSelectedStitches([]);
    setIsSelectingStitches(false);
  };

  const getStitchGroupColor = (stitch: Stitch) => {
    const groupIndex = repetitionGroups.findIndex(g => g.stitchIds.includes(stitch.id));
    if (groupIndex === -1) return 'bg-primary-100';
    
    // Rotate through different colors for different groups
    const colors = [
      'bg-primary-200',
      'bg-rose-200',
      'bg-amber-200',
      'bg-emerald-200',
      'bg-sky-200'
    ];
    return colors[groupIndex % colors.length];
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Current Round</h2>

      {/* Selection Mode Toggle */}
      <div className="mb-4 flex items-center space-x-4">
        <button
          onClick={() => {
            setIsSelectingStitches(!isSelectingStitches);
            if (!isSelectingStitches) {
              setSelectedStitches([]);
            }
          }}
          className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isSelectingStitches
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <PiCursor className="w-4 h-4 mr-2" />
          {isSelectingStitches ? 'Cancel Selection' : 'Select Stitches'}
        </button>

        {isSelectingStitches && (
          <span className="text-sm text-gray-600">
            Click on stitches to select them for a repetition group
          </span>
        )}
      </div>

      {/* Header Note Controls */}
      <button
        onClick={() => setShowHeaderNote(!showHeaderNote)}
        className="mb-2 inline-flex items-center px-2 py-1 text-sm text-gray-600 hover:text-primary-600"
      >
        <PiNote className="w-4 h-4 mr-1" />
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

      {/* Stitches Display */}
      <div className="flex flex-wrap gap-2 min-h-[50px] p-4 bg-gray-50 rounded-md">
        {round.stitches.map((stitch) => {
          const isSelected = selectedStitches.includes(stitch.id);
          const isPartOfGroup = repetitionGroups.some(g => g.stitchIds.includes(stitch.id));
          const groupColor = getStitchGroupColor(stitch);
          
          return (
            <div
              key={stitch.id}
              className={`group relative ${
                isSelectingStitches ? 'cursor-pointer' : ''
              } ${isSelected ? 'ring-2 ring-primary-500' : ''}`}
              onClick={() => toggleStitchSelection(stitch.id)}
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
                        setEditingStitchId(editingStitchId === stitch.id ? null : stitch.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-primary-200 rounded-full"
                    >
                      <PiNote className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
              
              {editingStitchId === stitch.id && (
                <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-2 space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Stitch Notes</span>
                    <button
                      onClick={() => setEditingStitchId(null)}
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
                      onChange={(e) => onUpdateStitchNote(stitch.id, { 
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
                      onChange={(e) => onUpdateStitchNote(stitch.id, {
                        ...stitch.note,
                        afterNote: e.target.value
                      })}
                      placeholder="Add note after this stitch..."
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Repetition Groups Controls */}
      {selectedStitches.length > 1 && (
        <div className="mt-4">
          <button
            onClick={handleCreateRepetitionGroup}
            className="inline-flex items-center px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            <PiRepeat className="w-4 h-4 mr-2" />
            Create Repetition Group ({selectedStitches.length} stitches)
          </button>
        </div>
      )}

      {/* Existing Repetition Groups */}
      {repetitionGroups.length > 0 && (
        <div className="mt-4 space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Repetition Groups</h3>
          <div className="space-y-3">
            {repetitionGroups.map((group, index) => {
              const groupStitches = round.stitches.filter(s => group.stitchIds.includes(s.id));
              return (
                <div key={group.id} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${
                      ['bg-primary-500', 'bg-rose-500', 'bg-amber-500', 'bg-emerald-500', 'bg-sky-500'][index % 5]
                    }`} />
                    <span className="text-sm text-gray-600">
                      {groupStitches.map(s => `${s.count} ${s.type}`).join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={group.count}
                      onChange={(e) => handleUpdateGroupCount(group.id, Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      min="1"
                    />
                    <span className="text-sm text-gray-700">times</span>
                    <button
                      onClick={() => handleDeleteGroup(group.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                      title="Delete group"
                    >
                      <PiTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer Note Controls */}
      <button
        onClick={() => setShowFooterNote(!showFooterNote)}
        className="mt-4 inline-flex items-center px-2 py-1 text-sm text-gray-600 hover:text-primary-600"
      >
        <PiNote className="w-4 h-4 mr-1" />
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
      
      {/* Round Repetition Controls */}
      {round.stitches.length > 0 && (
        <div className="mt-4 flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isRepeating}
              onChange={(e) => setIsRepeating(e.target.checked)}
              className="rounded text-primary-600"
            />
            <span className="text-sm text-gray-700">Repeat Entire Round</span>
          </label>
          
          {isRepeating && (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={repeatCount}
                onChange={(e) => setRepeatCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
                min="1"
              />
              <span className="text-sm text-gray-700">times</span>
              <span className="text-sm text-gray-500">
                ({calculateTotalStitches(round.stitches, repeatCount, repetitionGroups)} sts total)
              </span>
            </div>
          )}
        </div>
      )}

      {/* Complete Round Button */}
      <div>
        <button
          onClick={handleComplete}
          className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          <PiPlus className="w-4 h-4 mr-2" />
          Add Round
        </button>
      </div>

      {/* Round Preview */}
      {round.stitches.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Current Round Preview</h3>
          <div className="space-y-2 text-sm text-gray-600">
            {round.headerNote && (
              <p className="italic">{round.headerNote}</p>
            )}
            <p>
              {formatStitchPattern(round.stitches, repetitionGroups)}
              {isRepeating && repeatCount > 1 && ` * ${repeatCount}x`}
              {` (${calculateTotalStitches(round.stitches, isRepeating ? repeatCount : 1, repetitionGroups)} sts)`}
            </p>
            {round.footerNote && (
              <p className="italic">{round.footerNote}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}