import React from 'react';
import { PiTrash } from 'react-icons/pi';
import type { Round, RepetitionGroup } from '../../types/pattern';

interface RepetitionGroupListProps {
  round: Round;
  repetitionGroups: RepetitionGroup[];
  onUpdateGroupCount: (groupId: string, count: number) => void;
  onDeleteGroup: (groupId: string) => void;
}

export default function RepetitionGroupList({
  round,
  repetitionGroups,
  onUpdateGroupCount,
  onDeleteGroup,
}: RepetitionGroupListProps) {
  if (repetitionGroups.length === 0) return null;

  return (
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
                  onChange={(e) => onUpdateGroupCount(group.id, Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
                  min="1"
                />
                <span className="text-sm text-gray-700">times</span>
                <button
                  onClick={() => onDeleteGroup(group.id)}
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
  );
}