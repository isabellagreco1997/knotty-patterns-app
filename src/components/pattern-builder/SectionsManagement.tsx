import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import {
  PiPlus,
  PiCaretDown,
  PiTrash,
  PiPencil,
  PiCheck,
  PiWarning,
} from 'react-icons/pi';
import AddSectionModal from './AddSectionModal';
import type { Pattern, PatternSection } from '../../types/pattern';

interface SectionsManagementProps {
  pattern: Pattern;
  currentSectionId: string | null;
  setCurrentSectionId: (id: string | null) => void;
  handleAddSection: (name: string) => void;
  handleDeleteSection: (id: string) => void;
  handleSectionDragEnd: (result: DropResult) => void;
  onUpdateSections: (sections: PatternSection[]) => void;
}

export default function SectionsManagement({
  pattern,
  currentSectionId,
  setCurrentSectionId,
  handleAddSection,
  handleDeleteSection,
  handleSectionDragEnd,
  onUpdateSections,
}: SectionsManagementProps) {
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSectionName, setEditingSectionName] = useState('');

  const handleUpdateSectionName = (sectionId: string, newName: string) => {
    if (!newName.trim()) return;

    const updatedSections = pattern.sections.map((section) =>
      section.id === sectionId ? { ...section, name: newName.trim() } : section
    );

    onUpdateSections(updatedSections);
    setEditingSectionId(null);
    setEditingSectionName('');
  };

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Pattern Sections</h2>
          <button
            onClick={() => setShowAddSectionModal(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <PiPlus className="w-4 h-4 mr-2" />
            Add Section
          </button>
        </div>

        {pattern.sections.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <PiWarning className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Add a section to start building your pattern</p>
            <button
              onClick={() => setShowAddSectionModal(true)}
              className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <PiPlus className="w-4 h-4 mr-2" />
              Add Your First Section
            </button>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleSectionDragEnd}>
            <Droppable droppableId="pattern-sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {pattern.sections.map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={`section-${section.id}`}
                      index={index}
                    >
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
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>

      <AddSectionModal
        isOpen={showAddSectionModal}
        onClose={() => setShowAddSectionModal(false)}
        onAdd={handleAddSection}
      />
    </div>
  );
}