import { useState } from 'react';
import type { Round, RepetitionGroup } from '../types/pattern';

interface UseCurrentRoundHandlersProps {
  round: Round;
  onComplete: (round: Round) => void;
}

export function useCurrentRoundHandlers({ round, onComplete }: UseCurrentRoundHandlersProps) {
  const [showHeaderNote, setShowHeaderNote] = useState(false);
  const [showFooterNote, setShowFooterNote] = useState(false);
  const [editingStitchId, setEditingStitchId] = useState<string | null>(null);
  const [isRepeating, setIsRepeating] = useState(round.isRepeating || false);
  const [repeatCount, setRepeatCount] = useState(round.repeatCount || 6);
  const [selectedStitches, setSelectedStitches] = useState<string[]>([]);
  const [repetitionGroups, setRepetitionGroups] = useState<RepetitionGroup[]>(round.repetitionGroups || []);
  const [isSelectingStitches, setIsSelectingStitches] = useState(false);

  const handleStitchSelect = (stitchId: string) => {
    if (isSelectingStitches) {
      setSelectedStitches(prev => {
        const newSelection = prev.includes(stitchId)
          ? prev.filter(id => id !== stitchId)
          : [...prev, stitchId];
        return newSelection;
      });
    }
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

  const handleComplete = () => {
    if (round.stitches.length === 0) return;

    const updatedRound: Round = {
      ...round,
      isRepeating,
      repeatCount: isRepeating ? repeatCount : undefined,
      repetitionGroups,
    };

    onComplete(updatedRound);

    // Reset all states after completing the round
    setSelectedStitches([]);
    setIsSelectingStitches(false);
    setRepetitionGroups([]); // Reset repetition groups
    setIsRepeating(false);   // Reset repeating state
    setRepeatCount(6);       // Reset repeat count
    setShowHeaderNote(false);
    setShowFooterNote(false);
    setEditingStitchId(null);
  };

  const handleSelectionToggle = (isSelecting: boolean) => {
    setIsSelectingStitches(isSelecting);
    if (!isSelecting) {
      setSelectedStitches([]);
    }
  };

  return {
    // State
    showHeaderNote,
    showFooterNote,
    editingStitchId,
    isRepeating,
    repeatCount,
    selectedStitches,
    repetitionGroups,
    isSelectingStitches,

    // State setters
    setShowHeaderNote,
    setShowFooterNote,
    setEditingStitchId,
    setIsRepeating,
    setRepeatCount,

    // Handlers
    handleStitchSelect,
    handleCreateRepetitionGroup,
    handleUpdateGroupCount,
    handleDeleteGroup,
    handleComplete,
    handleSelectionToggle,
  };
}