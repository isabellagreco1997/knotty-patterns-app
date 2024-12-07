import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { PiWarning } from 'react-icons/pi';
import type { Round, Pattern } from '../../types/pattern';
import DraggableRound from './DraggableRound';
import DroppableSection from './DroppableSection';
import { formatRoundInstructions, getRoundNumber } from '../../utils/roundFormatting';

interface PatternDisplayProps {
  pattern: Pattern;
  rounds: Round[];
  onEdit: (roundId: string) => void;
  onDelete: (roundId: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
  language: 'en' | 'es';
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

        <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {pattern.sections.map((section) => (
            <div key={section.id} className="mb-8">
              <div className="text-lg font-semibold mb-4">
                {section.name}
              </div>

              <DroppableSection
                sectionId={section.id}
                rounds={section.rounds}
                currentRounds={rounds}
                expandedNotes={expandedNotes}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleNotes={toggleNotes}
                onShowTooltip={() => setShowTooltip(true)}
                onHideTooltip={() => setShowTooltip(false)}
                onMouseMove={handleMouseMove}
                language={language}
                formatInstructions={formatRoundInstructions}
                getRoundNumber={getRoundNumber}
              />
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}