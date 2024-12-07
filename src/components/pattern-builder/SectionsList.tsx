import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import SectionItem from './SectionItem';
import type { PatternSection } from '../../types/pattern';

interface SectionsListProps {
  sections: PatternSection[];
  currentSectionId: string | null;
  editingSectionId: string | null;
  editingSectionName: string;
  setCurrentSectionId: (id: string | null) => void;
  setEditingSectionId: (id: string | null) => void;
  setEditingSectionName: (name: string) => void;
  handleUpdateSectionName: (sectionId: string, newName: string) => void;
  handleDeleteSection: (id: string) => void;
}

export default function SectionsList({
  sections,
  currentSectionId,
  editingSectionId,
  editingSectionName,
  setCurrentSectionId,
  setEditingSectionId,
  setEditingSectionName,
  handleUpdateSectionName,
  handleDeleteSection,
}: SectionsListProps) {
  return (
    <Droppable droppableId="sections">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="space-y-2"
        >
          {sections.map((section, index) => (
            <SectionItem
              key={section.id}
              section={section}
              index={index}
              currentSectionId={currentSectionId}
              editingSectionId={editingSectionId}
              editingSectionName={editingSectionName}
              setCurrentSectionId={setCurrentSectionId}
              setEditingSectionId={setEditingSectionId}
              setEditingSectionName={setEditingSectionName}
              handleUpdateSectionName={handleUpdateSectionName}
              handleDeleteSection={handleDeleteSection}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}