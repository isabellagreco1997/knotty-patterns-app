import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { PiCaretDown, PiPencil, PiTrash, PiCheck } from 'react-icons/pi';
import type { PatternSection } from '../../types/pattern';

interface SectionItemProps {
  section: PatternSection;
  index: number;
  currentSectionId: string | null;
  editingSectionId: string | null;
  editingSectionName: string;
  setCurrentSectionId: (id: string | null) => void;
  setEditingSectionId: (id: string | null) => void;
  setEditingSectionName: (name: string) => void;
  handleUpdateSectionName: (sectionId: string, newName: string) => void;
  handleDeleteSection: (id: string) => void;
}

export default function SectionItem({
  section,
  index,
  currentSectionId,
  editingSectionId,
  editingSectionName,
  setCurrentSectionId,
  setEditingSectionId,
  setEditingSectionName,
  handleUpdateSectionName,
  handleDeleteSection,
}: SectionItemProps) {
  return (
    <Draggable draggableId={section.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex items-center justify-between p-4 rounded-xl border-2 transition-colors ${
            section.id === currentSectionId
              ? 'border-primary-500 bg-primary-50'
              : snapshot.isDragging
              ? 'border-primary-200 bg-primary-50'
              : 'border-gray-200 hover:border-primary-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center flex-1">
            <button
              onClick={() => setCurrentSectionId(section.id)}
              className="mr-3"
            >
              <PiCaretDown
                className={`w-5 h-5 transition-transform ${
                  section.id === currentSectionId ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {editingSectionId === section.id ? (
              <div className="flex items-center flex-1">
                <input
                  type="text"
                  value={editingSectionName}
                  onChange={(e) => setEditingSectionName(e.target.value)}
                  className="flex-1 px-2 py-1 border border-primary-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdateSectionName(section.id, editingSectionName);
                    }
                  }}
                />
                <div className="flex items-center ml-2">
                  <button
                    onClick={() => handleUpdateSectionName(section.id, editingSectionName)}
                    className="p-1 text-green-600 hover:bg-green-50 rounded-full"
                  >
                    <PiCheck className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center flex-1">
                <span className="font-medium text-lg">{section.name}</span>
                <span className="ml-3 text-sm text-gray-500">
                  ({section.rounds.length} rounds)
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {editingSectionId !== section.id && (
              <button
                onClick={() => {
                  setEditingSectionId(section.id);
                  setEditingSectionName(section.name);
                }}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <PiPencil className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => handleDeleteSection(section.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <PiTrash className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}