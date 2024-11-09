import React from 'react';
import type { Round, RepetitionGroup } from '../../types/pattern';

interface RoundPreviewProps {
  round: Round;
  repetitionGroups: RepetitionGroup[];
  isRepeating: boolean;
  repeatCount: number;
}

function calculateTotalStitches(round: Round, repeatCount: number = 1, repetitionGroups: RepetitionGroup[] = []): number {
  const baseStitches = round.stitches.reduce((sum, stitch) => {
    if (repetitionGroups.some(g => g.stitchIds.includes(stitch.id))) {
      return sum;
    }
    if (stitch.type === 'skip') return sum;
    if (stitch.type === 'inc') return sum + (stitch.count * 2);
    if (stitch.type === 'dec') return sum - stitch.count;
    return sum + stitch.count;
  }, 0);

  const groupStitches = repetitionGroups.reduce((sum, group) => {
    const groupTotal = group.stitchIds.reduce((groupSum, stitchId) => {
      const stitch = round.stitches.find(s => s.id === stitchId);
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

function formatStitchPattern(round: Round, repetitionGroups: RepetitionGroup[] = []): string {
  const stitchToGroup = new Map<string, RepetitionGroup>();
  repetitionGroups.forEach(group => {
    group.stitchIds.forEach(id => {
      stitchToGroup.set(id, group);
    });
  });

  const processedGroups = new Set<string>();
  let pattern = '';
  let currentGroup: RepetitionGroup | null = null;
  let currentGroupStitches: string[] = [];

  round.stitches.forEach((stitch) => {
    const group = stitchToGroup.get(stitch.id);

    if (group !== currentGroup) {
      if (currentGroup && currentGroupStitches.length > 0 && !processedGroups.has(currentGroup.id)) {
        if (pattern) pattern += ', ';
        pattern += `(${currentGroupStitches.join(', ')}) * ${currentGroup.count}`;
        processedGroups.add(currentGroup.id);
        currentGroupStitches = [];
      }
      
      if (group && !processedGroups.has(group.id)) {
        currentGroup = group;
        currentGroupStitches = [];
      } else {
        currentGroup = null;
      }
    }

    const beforeNote = stitch.note?.beforeNote ? `${stitch.note.beforeNote} ` : '';
    const afterNote = stitch.note?.afterNote ? ` ${stitch.note.afterNote}` : '';
    const stitchText = stitch.type === 'dec'
      ? `${beforeNote}dec ${stitch.count} (${stitch.count * 2} sts)${afterNote}`
      : `${beforeNote}${stitch.count} ${stitch.type}${afterNote}`;

    if (currentGroup && !processedGroups.has(currentGroup.id)) {
      currentGroupStitches.push(stitchText);
    } else if (!group || processedGroups.has(group.id)) {
      if (pattern) pattern += ', ';
      pattern += stitchText;
    }
  });

  if (currentGroup && currentGroupStitches.length > 0 && !processedGroups.has(currentGroup.id)) {
    if (pattern) pattern += ', ';
    pattern += `(${currentGroupStitches.join(', ')}) * ${currentGroup.count}`;
  }

  return pattern;
}

export default function RoundPreview({
  round,
  repetitionGroups,
  isRepeating,
  repeatCount,
}: RoundPreviewProps) {
  if (round.stitches.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-md">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Current Round Preview</h3>
      <div className="space-y-2 text-sm text-gray-600">
        {round.headerNote && (
          <p className="italic">{round.headerNote}</p>
        )}
        <p>
          {formatStitchPattern(round, repetitionGroups)}
          {isRepeating && repeatCount > 1 && ` * ${repeatCount}x`}
          {` (${calculateTotalStitches(round, isRepeating ? repeatCount : 1, repetitionGroups)} sts)`}
        </p>
        {round.footerNote && (
          <p className="italic">{round.footerNote}</p>
        )}
      </div>
    </div>
  );
}