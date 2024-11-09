import React from 'react';
import type { Round } from '../../types/pattern';
import { useCurrentRoundHandlers } from '../../hooks/useCurrentRoundHandlers';
import StitchList from './StitchList';
import RepetitionGroupList from './RepetitionGroupList';
import RoundPreview from './RoundPreview';
import RoundRepetitionControls from './RoundRepetitionControls';
import SelectionModeToggle from './SelectionModeToggle';
import RoundNoteControls from './RoundNoteControls';
import AddRoundButton from './AddRoundButton';
import { PiPlus } from 'react-icons/pi';

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
  const {
    showHeaderNote,
    showFooterNote,
    editingStitchId,
    isRepeating,
    repeatCount,
    selectedStitches,
    repetitionGroups,
    isSelectingStitches,
    setShowHeaderNote,
    setShowFooterNote,
    setEditingStitchId,
    setIsRepeating,
    setRepeatCount,
    handleStitchSelect,
    handleCreateRepetitionGroup,
    handleUpdateGroupCount,
    handleDeleteGroup,
    handleComplete,
    handleSelectionToggle,
  } = useCurrentRoundHandlers({ round, onComplete });

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Current Round</h2>

      <SelectionModeToggle
        isSelectingStitches={isSelectingStitches}
        onToggle={handleSelectionToggle}
      />

      <RoundNoteControls
        type="header"
        isVisible={showHeaderNote}
        onToggle={setShowHeaderNote}
        value={round.headerNote || ''}
        onChange={onUpdateHeaderNote}
      />

      <StitchList
        stitches={round.stitches}
        repetitionGroups={repetitionGroups}
        isSelectingStitches={isSelectingStitches}
        selectedStitches={selectedStitches}
        editingStitchId={editingStitchId}
        onStitchSelect={handleStitchSelect}
        onUpdateCount={onUpdateCount}
        onDeleteStitch={onDeleteStitch}
        onEditStitch={setEditingStitchId}
        onUpdateStitchNote={onUpdateStitchNote}
      />

      {selectedStitches.length > 1 && (
        <div className="mt-4">
          <button
            onClick={handleCreateRepetitionGroup}
            className="inline-flex items-center px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            <PiPlus className="w-4 h-4 mr-2" />
            Create Repetition Group ({selectedStitches.length} stitches)
          </button>
        </div>
      )}

      <RepetitionGroupList
        round={round}
        repetitionGroups={repetitionGroups}
        onUpdateGroupCount={handleUpdateGroupCount}
        onDeleteGroup={handleDeleteGroup}
      />

      <RoundNoteControls
        type="footer"
        isVisible={showFooterNote}
        onToggle={setShowFooterNote}
        value={round.footerNote || ''}
        onChange={onUpdateFooterNote}
      />
      
      {round.stitches.length > 0 && (
        <div className="mt-4">
          <RoundRepetitionControls
            isRepeating={isRepeating}
            repeatCount={repeatCount}
            onRepeatChange={setIsRepeating}
            onCountChange={setRepeatCount}
          />
        </div>
      )}

      <AddRoundButton onClick={handleComplete} />

      <RoundPreview
        round={round}
        repetitionGroups={repetitionGroups}
        isRepeating={isRepeating}
        repeatCount={repeatCount}
      />
    </div>
  );
}