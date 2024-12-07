import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableRound from './DraggableRound';
import type { Round } from '../../types/pattern';

interface DroppableSectionProps {
  sectionId: string;
  rounds: Round[];
  currentRounds: Round[] | null;
  expandedNotes: string[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleNotes: (id: string) => void;
  onShowTooltip: () => void;
  onHideTooltip: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  language: 'en' | 'es';
  formatInstructions: (round: Round) => string;
  getRoundNumber: (rounds: Round[], index: number) => number;
}

export default function DroppableSection({
  sectionId,
  rounds,
  currentRounds,
  expandedNotes,
  onEdit,
  onDelete,
  onToggleNotes,
  onShowTooltip,
  onHideTooltip,
  onMouseMove,
  language,
  formatInstructions,
  getRoundNumber
}: DroppableSectionProps) {
  return (
    <Droppable droppableId={`section-${sectionId}`}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="space-y-2"
        >
          {rounds.map((round, index) => (
            <DraggableRound
              key={round.id}
              round={round}
              index={index}
              isDragDisabled={rounds !== currentRounds}
              isExpanded={expandedNotes.includes(round.id)}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleNotes={onToggleNotes}
              onShowTooltip={onShowTooltip}
              onHideTooltip={onHideTooltip}
              onMouseMove={onMouseMove}
              language={language}
              roundNumber={getRoundNumber(rounds, index)}
              formatInstructions={formatInstructions}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}