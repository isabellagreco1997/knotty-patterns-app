import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { PiPencil, PiTrash, PiNote, PiCheck, PiX } from 'react-icons/pi';
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
  onEditText?: (id: string, text: string) => void;
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
  formatInstructions,
  onEditText
}: DraggableRoundProps) {
  const translations = {
    en: { round: 'Round' },
    es: { round: 'Vuelta' }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(round.notes || '');

  const handleTextSave = () => {
    if (onEditText && round.isText) {
      onEditText(round.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(round.notes || '');
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const startEditing = () => {
    if (round.isText) {
      setEditText(round.notes || '');
      setIsEditing(true);
    }
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
              {round.isText ? (
                isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full p-2 border border-primary-300 rounded-md focus:ring-1 focus:ring-primary-500"
                      rows={3}
                      autoFocus
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={handleCancel}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-md flex items-center"
                      >
                        <PiX className="w-4 h-4 mr-1" />
                        Cancel
                      </button>
                      <button
                        onClick={handleTextSave}
                        className="px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center"
                      >
                        <PiCheck className="w-4 h-4 mr-1" />
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span>{round.notes}</span>
                    <button
                      onClick={startEditing}
                      className="ml-2 p-1 hover:bg-primary-100 rounded-full"
                      title="Edit Text"
                    >
                      <PiPencil className="w-4 h-4" />
                    </button>
                  </div>
                )
              ) : (
                formatInstructions(round)
              )}
            </div>
            
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {!round.isText && (
                <button
                  onClick={() => onEdit(round.id)}
                  className="p-1 hover:bg-primary-100 rounded-full"
                  title="Edit Round"
                >
                  <PiPencil className="w-4 h-4" />
                </button>
              )}
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