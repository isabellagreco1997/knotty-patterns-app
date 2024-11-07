import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { PiPencil, PiTrash, PiNote } from 'react-icons/pi';
import type { Round, Pattern } from '../../types/pattern';

interface PatternDisplayProps {
  pattern: Pattern;
  rounds: Round[];
  onEdit: (roundId: string) => void;
  onDelete: (roundId: string) => void;
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

function formatPatternHeader(pattern: Pattern): string {
  let header = `${pattern.name}\n\n`;
  
  if (pattern.description) {
    header += `${pattern.description}\n\n`;
  }
  
  header += `Difficulty: ${pattern.difficulty}\n`;
  header += `Hook Size: ${pattern.hookSize}\n`;
  header += `Yarn Weight: ${pattern.yarnWeight}\n\n`;
  
  return header;
}

function formatRoundInstructions(round: Round): string {
  if (round.isText) {
    return round.notes || '';
  }

  const stitchPattern = round.stitches.map(s => {
    const note = s.note || {};
    const parts = [];

    if (note.beforeNote) parts.push(note.beforeNote);
    if (note.before) parts.push(note.before);

    if (s.type === 'skip') {
      const skipType = note.skipType || 'sc';
      parts.push(`skip ${s.count} ${skipType}`);
    } else {
      parts.push(`${s.count} ${s.type}`);
    }

    if (note.after) parts.push(note.after);
    if (note.afterNote) parts.push(note.afterNote);

    return parts.join(' ');
  }).join(', ');

  const totalStitches = calculateTotalStitches(round);

  if (round.isRepeating && round.repeatCount) {
    return `(${stitchPattern}) * ${round.repeatCount}x (${totalStitches} sts)`;
  }

  return `${stitchPattern} (${totalStitches} sts)`;
}

function calculateTotalStitches(round: Round): number {
  if (round.isText) return 0;

  const singleRepeatTotal = round.stitches.reduce((total, stitch) => {
    if (stitch.type === 'skip') return total;
    if (stitch.type === 'inc') return total + (stitch.count * 2);
    if (stitch.type === 'dec') return total + Math.ceil(stitch.count / 2);
    return total + stitch.count;
  }, 0);

  return round.isRepeating && round.repeatCount 
    ? singleRepeatTotal * round.repeatCount 
    : singleRepeatTotal;
}

function getRoundNumber(rounds: Round[], currentIndex: number): number {
  return rounds.slice(0, currentIndex + 1).filter(r => !r.isText).length;
}

export default function PatternDisplay({ 
  pattern,
  rounds, 
  onEdit, 
  onDelete, 
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
      <div className="text-gray-800">
        <div className="mb-6 whitespace-pre-wrap">
          <div className="text-2xl font-semibold mb-2">{pattern.name}</div>
          {pattern.description && (
            <div className="mb-4">{pattern.description}</div>
          )}
          <div>
            <div><strong>Difficulty:</strong> {pattern.difficulty}</div>
            <div><strong>Hook Size:</strong> {pattern.hookSize}</div>
            <div><strong>Yarn Weight:</strong> {pattern.yarnWeight}</div>
          </div>
        </div>

        {pattern.sections.map((section) => (
          <div key={section.id} className="mb-8">
            <div className="text-lg font-semibold mb-4">
              {section.name}
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId={`section-${section.id}`}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {section.rounds.map((round, index) => (
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
                              round.isText ? 'bg-primary-50' : snapshot.isDragging ? 'bg-primary-50' : 'bg-gray-50 hover:bg-gray-100'
                            }`}
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
                                    {translations[language].round} {getRoundNumber(section.rounds, index)}: {' '}
                                  </span>
                                )}
                                {formatRoundInstructions(round)}
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

                            {!round.isText && expandedNotes.includes(round.id) && round.notes && (
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
        ))}
      </div>
    </div>
  );
}