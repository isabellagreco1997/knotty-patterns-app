import type { Round, RepetitionGroup } from '../types/pattern';

export function calculateTotalStitches(round: Round): number {
  if (round.isText) return 0;

  const baseStitches = round.stitches.reduce((total, stitch) => {
    if (round.repetitionGroups?.some(g => g.stitchIds.includes(stitch.id))) {
      return total;
    }
    if (stitch.type === 'skip') return total;
    if (stitch.type === 'inc') return total + (stitch.count * 2);
    if (stitch.type === 'dec') return total + Math.ceil(stitch.count / 2);
    return total + stitch.count;
  }, 0);

  const groupStitches = round.repetitionGroups?.reduce((total, group) => {
    const groupTotal = group.stitchIds.reduce((sum, stitchId) => {
      const stitch = round.stitches.find(s => s.id === stitchId);
      if (!stitch) return sum;
      if (stitch.type === 'skip') return sum;
      if (stitch.type === 'inc') return sum + (stitch.count * 2);
      if (stitch.type === 'dec') return sum + Math.ceil(stitch.count / 2);
      return sum + stitch.count;
    }, 0);
    return total + (groupTotal * group.count);
  }, 0) || 0;

  const totalBeforeRepeat = baseStitches + groupStitches;
  return round.isRepeating && round.repeatCount
    ? totalBeforeRepeat * round.repeatCount
    : totalBeforeRepeat;
}

export function formatRoundInstructions(round: Round): string {
  if (round.isText) {
    return round.notes || '';
  }

  const stitchToGroup = new Map<string, RepetitionGroup>();
  if (round.repetitionGroups) {
    round.repetitionGroups.forEach(group => {
      group.stitchIds.forEach(id => {
        stitchToGroup.set(id, group);
      });
    });
  }

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

  const totalStitches = calculateTotalStitches(round);
  const repeatText = round.isRepeating && round.repeatCount ? ` * ${round.repeatCount}x` : '';
  return `${pattern}${repeatText} (${totalStitches} sts)`;
}

export function getRoundNumber(rounds: Round[], currentIndex: number): number {
  return rounds.slice(0, currentIndex + 1).filter(r => !r.isText).length;
}