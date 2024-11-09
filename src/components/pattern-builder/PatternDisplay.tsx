import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { PiPencil, PiTrash, PiNote, PiWarning } from 'react-icons/pi';
import type { Round, Pattern, Stitch, RepetitionGroup } from '../../types/pattern';

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

function formatRoundInstructions(round: Round): string {
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

function calculateTotalStitches(round: Round): number {
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
  const [showDragMessage, setShowDragMessage] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleNotes = (roundId: string) => {
    setExpandedNotes(prev => 
      prev.includes(roundId)
        ? prev.filter(id => id !== roundId)
        : [...prev, roundId]
    );
  };

  const handleDragStart = () => {
    if (!rounds) {
      setShowDragMessage(true);
      setTimeout(() => setShowDragMessage(false), 3000);
      return false;
    }
    return true;
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <div>
      {showDragMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg border border-amber-200 flex items-center shadow-lg">
          <PiWarning className="w-5 h-5 mr-2" />
          Please select a section to reorder rounds
        </div>
      )}

      {showTooltip && (
        <div 
          className="fixed z-50 pointer-events-none"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 30,
          }}
        >
          <div className="bg-primary-600 text-white text-sm px-3 py-1.5 rounded shadow-lg whitespace-nowrap">
            Select this section to reorder rounds
            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 -translate-x-full">
              <div className="border-8 border-transparent border-r-primary-600"></div>
            </div>
          </div>
        </div>
      )}

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

            <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <Droppable droppableId={`section-${section.id}`} isDropDisabled={section.rounds !== rounds}>
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
                        isDragDisabled={section.rounds !== rounds}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`group relative p-4 rounded-md ${
                              round.isText ? 'bg-primary-50' : 
                              snapshot.isDragging ? 'bg-primary-50' : 
                              section.rounds === rounds ? 'bg-gray-50 hover:bg-gray-100 cursor-grab' : 
                              'bg-gray-50 hover:bg-gray-100 cursor-not-allowed'
                            }`}
                            onMouseEnter={() => {
                              if (section.rounds !== rounds) {
                                setShowTooltip(true);
                              }
                            }}
                            onMouseLeave={() => setShowTooltip(false)}
                            onMouseMove={handleMouseMove}
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