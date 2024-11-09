import { useState } from 'react';
import { Stitch, Round, RepetitionGroup } from '../types/pattern';

interface UseCurrentRoundReturn {
  currentRound: Round;
  setCurrentRound: React.Dispatch<React.SetStateAction<Round>>;
  addStitch: (type: string) => void;
  updateStitchCount: (stitchId: string, count: number) => void;
  deleteStitch: (stitchId: string) => void;
  updateStitchNote: (stitchId: string, note: any) => void;
  updateHeaderNote: (note: string) => void;
  updateFooterNote: (note: string) => void;
  updateNotes: (notes: string) => void;
  resetCurrentRound: (nextRoundId: string) => void;
}

export const useCurrentRound = (initialRoundId: string = '1'): UseCurrentRoundReturn => {
  const [currentRound, setCurrentRound] = useState<Round>({
    id: initialRoundId,
    stitches: [],
    notes: '',
    repetitionGroups: [],
    isRepeating: false,
    repeatCount: 6,
  });

  const addStitch = (type: string) => {
    const newStitch: Stitch = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      count: 1,
    };
    setCurrentRound((prevRound) => ({
      ...prevRound,
      stitches: [...prevRound.stitches, newStitch],
    }));
  };

  const updateStitchCount = (stitchId: string, count: number) => {
    setCurrentRound((prevRound) => ({
      ...prevRound,
      stitches: prevRound.stitches.map((s) =>
        s.id === stitchId ? { ...s, count } : s
      ),
    }));
  };

  const deleteStitch = (stitchId: string) => {
    setCurrentRound((prevRound) => ({
      ...prevRound,
      stitches: prevRound.stitches.filter((s) => s.id !== stitchId),
      // Also remove the stitch from any repetition groups
      repetitionGroups: prevRound.repetitionGroups?.map(group => ({
        ...group,
        stitchIds: group.stitchIds.filter(id => id !== stitchId)
      })).filter(group => group.stitchIds.length >= 2) || [],
    }));
  };

  const updateStitchNote = (stitchId: string, note: any) => {
    setCurrentRound((prevRound) => ({
      ...prevRound,
      stitches: prevRound.stitches.map((s) =>
        s.id === stitchId ? { ...s, note } : s
      ),
    }));
  };

  const updateHeaderNote = (note: string) => {
    setCurrentRound((prevRound) => ({
      ...prevRound,
      headerNote: note,
    }));
  };

  const updateFooterNote = (note: string) => {
    setCurrentRound((prevRound) => ({
      ...prevRound,
      footerNote: note,
    }));
  };

  const updateNotes = (notes: string) => {
    setCurrentRound((prevRound) => ({
      ...prevRound,
      notes,
    }));
  };

  const resetCurrentRound = (nextRoundId: string) => {
    setCurrentRound({
      id: nextRoundId,
      stitches: [],
      notes: '',
      repetitionGroups: [], // Reset repetition groups
      isRepeating: false,   // Reset repeating state
      repeatCount: 6,       // Reset repeat count
      headerNote: '',       // Reset header note
      footerNote: '',       // Reset footer note
    });
  };

  return {
    currentRound,
    setCurrentRound,
    addStitch,
    updateStitchCount,
    deleteStitch,
    updateStitchNote,
    updateHeaderNote,
    updateFooterNote,
    updateNotes,
    resetCurrentRound,
  };
};