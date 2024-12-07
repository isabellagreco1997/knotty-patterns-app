import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { PiPencil, PiTrash, PiNote } from 'react-icons/pi';
import type { Round } from '../../types/pattern';

interface DraggableRoundProps {
  round: Round;
  index: number;
  isDragDisabled: boolean;
  isExpanded: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleNotes: (id: string) => void;
  onShowTooltip: () => void;
  onHideTooltip: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  language: 'en' | 'es';
  roundNumber: number;
  formatInstructions: (round: Round) => string;
}

export default function DraggableRound({
  round,
  index,
  isDragDisabled,
  isExpanded,
  onEdit,
  onDelete,
  onToggleNotes,
  onShowTooltip,
  onHideTooltip,
  onMouseMove,
  language,
  roundNumber,
  formatInstructions
}: DraggableRoundProps) {
  const translations = {
    en: { round: 'Round' },
    es: { round: 'Vuelta' }
  };

  return (
    <Draggable 
      draggableId={round.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group relative p-4 rounded-md ${
            round.isText ? 'bg-primary-50' : 
            snapshot.isDragging ? 'bg-primary-50' : 
            !isDragDisabled ? 'bg-gray-50 hover:bg-gray-100 cursor-grab' : 
            'bg-gray-50 hover:bg-gray-100 cursor-not-allowed'
          }`}
          onMouseEnter={isDragDisabled ? onShowTooltip : undefined}
          onMouseLeave={onHideTooltip}
          onMouseMove={onMouseMove}
        >
          {round.headerNote && (
            <div className="text-sm text-gray-600 italic mb-2">
              {round.headerNote}
            </div>
          )}

          <div className="flex items-start justify-between">
            <div className="flex-1">
              {!round.isText && (
                <span className="font-medium">
                  {translations[language].round} {roundNumber}: {' '}
                </span>
              )}
              {formatInstructions(round)}
            </div>
            
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(round.id)}
                className="p-1 hover:bg-primary-100 rounded-full"
                title="Edit Round"
              >
                <PiPencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(round.id)}
                className="p-1 hover:bg-primary-100 rounded-full text-red-600"
                title="Delete Round"
              >
                <PiTrash className="w-4 h-4" />
              </button>
              {!round.isText && (round.notes || round.headerNote || round.footerNote) && (
                <button
                  onClick={() => onToggleNotes(round.id)}
                  className="p-1 hover:bg-primary-100 rounded-full"
                  title="Toggle Notes"
                >
                  <PiNote className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {round.footerNote && (
            <div className="text-sm text-gray-600 italic mt-2">
              {round.footerNote}
            </div>
          )}

          {!round.isText && isExpanded && round.notes && (
            <div className="mt-2 text-sm text-gray-600 bg-white p-2 rounded-md border border-gray-200">
              <strong>Notes:</strong> {round.notes}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}