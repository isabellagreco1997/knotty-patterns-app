import { useState } from 'react';
import { Stitch, Round } from '../types/pattern';

interface UseCurrentRoundReturn {
  currentRound: Round;
  setCurrentRound: React.Dispatch<React.SetStateAction<Round>>;
  addStitch: (type: string) => void;
  updateStitchCount: (stitchId: string, count: number) => void;
  deleteStitch: (stitchId: string) => void;
  updateStitchNote: (stitchId: string, note: string) => void;
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
    }));
  };

  const updateStitchNote = (stitchId: string, note: string) => {
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
