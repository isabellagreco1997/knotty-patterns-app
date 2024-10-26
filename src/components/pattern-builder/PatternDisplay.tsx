import React, { useState } from 'react';
import { PiPencil, PiTrash, PiNote, PiCopy } from 'react-icons/pi';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import type { Round } from '../../types/pattern';

interface PatternDisplayProps {
  rounds: Round[];
  onEdit: (roundId: string) => void;
  onDelete: (roundId: string) => void;
  onDuplicate: (roundId: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
  language: 'en' | 'es';
}

const translations = {
  en: {
    round: 'Round',
    stitches: 'sts',
    inc: 'inc',
    dec: 'dec',
  },
  es: {
    round: 'Vuelta',
    stitches: 'pts',
    inc: 'aum',
    dec: 'dism',
  },
};

function formatRoundInstructions(round: Round, language: 'en' | 'es'): string {
  // Check if this is a repeat pattern from notes
  const repeatMatch = round.notes?.match(/\((.*?)\) \* (\d+)x \((\d+) sts\)/);
  if (repeatMatch) {
    const [_, pattern, repeatCount, totalStitches] = repeatMatch;
    return `(${pattern}) * ${repeatCount}x (${totalStitches} ${translations[language].stitches})`;
  }

  // For non-repeat patterns
  const stitchPattern = round.stitches
    .map(s => {
      const stitchName = translations[language][s.type as keyof typeof translations['en']] || s.type;
      return `${s.count} ${stitchName}`;
    })
    .join(', ');

  const totalStitches = calculateTotalStitches(round);
  return `${stitchPattern} (${totalStitches} ${translations[language].stitches})`;
}

function calculateTotalStitches(round: Round): number {
  // Check if this is a repeat pattern from notes
  const repeatMatch = round.notes?.match(/\((.*?)\) \* (\d+)x \((\d+) sts\)/);
  if (repeatMatch) {
    return parseInt(repeatMatch[3], 10);
  }

  // For non-repeat patterns
  return round.stitches.reduce((total, stitch) => {
    if (stitch.type === 'inc') return total + (stitch.count * 2);
    if (stitch.type === 'dec') return total + Math.ceil(stitch.count / 2);
    return total + stitch.count;
  }, 0);
}

export default function PatternDisplay({ 
  rounds, 
  onEdit, 
  onDelete, 
  onDuplicate, 
  onReorder,
  language 
}: PatternDisplayProps) {
  const [expandedNotes, setExpandedNotes] = useState<string[]>([]);

  const toggleNotes = (roundId: string) => {
    setExpandedNotes(prev => 
      prev.includes(roundId)
        ? prev.filter(id => id !== roundId)
        : [...prev, roundId]
    );
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Pattern</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="pattern-rounds">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {rounds.map((round, index) => (
                <Draggable 
                  key={round.id} 
                  draggableId={`round-${round.id}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`group relative p-4 rounded-md ${
                        snapshot.isDragging ? 'bg-primary-50' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {round.headerNote && (
                        <div className="text-sm text-gray-600 italic mb-2">
                          {round.headerNote}
                        </div>
                      )}

                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <span className="font-medium">
                            {translations[language].round} {index + 1}:
                          </span>{' '}
                          {formatRoundInstructions(round, language)}
                        </div>
                        
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onDuplicate(round.id)}
                            className="p-1 hover:bg-primary-100 rounded-full"
                            title="Duplicate Round"
                          >
                            <PiCopy className="w-4 h-4" />
                          </button>
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
                          {(round.notes || round.headerNote || round.footerNote) && (
                            <button
                              onClick={() => toggleNotes(round.id)}
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

                      {expandedNotes.includes(round.id) && round.notes && (
                        <div className="mt-2 text-sm text-gray-600 bg-white p-2 rounded-md border border-gray-200">
                          <strong>Notes:</strong> {round.notes}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}