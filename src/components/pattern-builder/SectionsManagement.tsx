import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { PiPlus, PiWarning } from 'react-icons/pi';
import AddSectionModal from './AddSectionModal';
import SectionsList from './SectionsList';
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
            <SectionsList
              sections={pattern.sections}
              currentSectionId={currentSectionId}
              editingSectionId={editingSectionId}
              editingSectionName={editingSectionName}
              setCurrentSectionId={setCurrentSectionId}
              setEditingSectionId={setEditingSectionId}
              setEditingSectionName={setEditingSectionName}
              handleUpdateSectionName={handleUpdateSectionName}
              handleDeleteSection={handleDeleteSection}
            />
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