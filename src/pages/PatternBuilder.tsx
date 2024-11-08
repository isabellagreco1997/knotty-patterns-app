import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { usePatternStore } from '../stores/usePatternStore';
import { supabase } from '../lib/supabase';
import PatternStarter from '../components/pattern-builder/PatternStarter';
import StitchPanel from '../components/pattern-builder/StitchPanel';
import CurrentRound from '../components/pattern-builder/CurrentRound';
import PatternDisplay from '../components/pattern-builder/PatternDisplay';
import PatternExport from '../components/pattern-builder/PatternExport';
import PatternSettings from '../components/pattern-builder/PatternSettings';
import StitchGuide from '../components/pattern-builder/StitchGuide';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import CrochetPreview from '../components/pattern-builder/CrochetPreview';
import { updateSections } from '../helpers/updateSections';

import AddSectionModal from '../components/pattern-builder/AddSectionModal';
import { PiPlus, PiCaretDown, PiTrash, PiSpinner, PiWarning, PiPencil, PiCheck } from 'react-icons/pi';
import type { Round, Pattern, PatternSection } from '../types/pattern';
import PatternSettingsCard from '../components/pattern-builder/PatternSettingsCard';
import SectionsManagement from '../components/pattern-builder/SectionsManagement';
import CustomTextInput from '../components/pattern-builder/CustomTextInput';
import PatternPreviewArea from '../components/pattern-builder/PatternPreviewArea';
import { generateFirstRound } from '../components/pattern-builder/patternHelpers';

export default function PatternBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addPattern, updatePattern } = usePatternStore();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [customText, setCustomText] = useState('');
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);

  const [pattern, setPattern] = useState<Pattern>({
    name: 'Untitled Pattern',
    description: '',
    difficulty: 'beginner',
    hookSize: '4.0mm',
    yarnWeight: 'worsted',
    sections: [],
    notes: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: user?.id || '',
  });

  const [currentRound, setCurrentRound] = useState<Round>({
    id: '1',
    stitches: [],
    notes: '',
  });

  const [editingRoundId, setEditingRoundId] = useState<string | null>(null);


  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSectionName, setEditingSectionName] = useState('');

  // Load existing pattern if ID is provided
  useEffect(() => {
    async function loadPattern() {
      if (!id) return;

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('patterns')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        if (data) {
          const loadedPattern = {
            id: data.id,
            userId: data.user_id,
            name: data.name,
            description: data.description,
            difficulty: data.difficulty,
            hookSize: data.hook_size,
            yarnWeight: data.yarn_weight,
            gauge: data.gauge,
            materials: data.materials || [],
            sections: data.sections || [],
            notes: data.notes || [],
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at)
          };

          setPattern(loadedPattern);

          // Set the first section as current if exists
          if (data.sections && data.sections.length > 0) {
            setCurrentSectionId(data.sections[0].id);
          }
        }
      } catch (error) {
        console.error('Error loading pattern:', error);
        setSaveError('Failed to load pattern');
      } finally {
        setIsLoading(false);
      }
    }

    loadPattern();
  }, [id]);

  // Update user ID when user changes
  useEffect(() => {
    if (user) {
      setPattern(prev => ({
        ...prev,
        userId: user.id
      }));
    }
  }, [user]);

  const currentSection = pattern.sections.find(s => s.id === currentSectionId);
  const hasActualRounds = currentSection?.rounds.some(round => !round.isText);

  // All your existing handler functions remain the same
  // Update the handleSave function in PatternBuilder.tsx
  const handleSave = async () => {
    if (!user) {
      navigate('/login?redirect=/pattern-builder');
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      const patternToSave = {
        ...pattern,
        userId: user.id,
        updatedAt: new Date()
      };

      if (id) {
        await updatePattern(patternToSave);
      } else {
        await addPattern(patternToSave, user.isPremium);
      }

      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
      successMessage.textContent = 'Pattern saved successfully!';
      document.body.appendChild(successMessage);
      setTimeout(() => successMessage.remove(), 3000);
    } catch (error) {
      console.error('Failed to save pattern:', error);
      setSaveError(error instanceof Error ? error.message : 'Failed to save pattern');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSection = (name: string) => {
    const newSection: PatternSection = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      rounds: []
    };

    setPattern(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
    setCurrentSectionId(newSection.id);
  };

  const handleDeleteSection = (sectionId: string) => {
    if (confirm('Are you sure you want to delete this section and all its rounds?')) {
      setPattern(prev => ({
        ...prev,
        sections: prev.sections.filter(s => s.id !== sectionId)
      }));
      if (currentSectionId === sectionId) {
        setCurrentSectionId(pattern.sections[0]?.id || null);
      }
    }
  };

  const handlePatternStart = (
    type: 'magic-ring' | 'chain' | 'custom' | 'stitch',
    config: { count: number; text: string; stitchType: string }
  ) => {
    if (!currentSectionId) return;

    const firstRound = generateFirstRound(type, config);

    if (!firstRound) return;

    setPattern((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === currentSectionId
          ? { ...section, rounds: [...section.rounds, firstRound] }
          : section
      ),
      updatedAt: new Date(),
    }));

    setCurrentRound({
      id: '2',
      stitches: [],
      notes: '',
    });
  };

  const addCustomText = (text: string) => {
    if (!text.trim() || !currentSectionId) return;

    const newRound: Round = {
      id: Math.random().toString(36).substr(2, 9),
      stitches: [],
      notes: text,
      isText: true,
    };

    setPattern(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === currentSectionId
          ? { ...section, rounds: [...section.rounds, newRound] }
          : section
      ),
      updatedAt: new Date(),
    }));
    setCustomText('');
  };

  const addStitch = (type: string) => {
    const newStitch = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      count: 1,
    };
    setCurrentRound({
      ...currentRound,
      stitches: [...currentRound.stitches, newStitch],
    });
  };

  const updateStitchCount = (stitchId: string, count: number) => {
    setCurrentRound({
      ...currentRound,
      stitches: currentRound.stitches.map((s) =>
        s.id === stitchId ? { ...s, count } : s
      ),
    });
  };

  const boundUpdateSections = (sections: PatternSection[]) => {
    updateSections(setPattern, sections);
  };

  const deleteStitch = (stitchId: string) => {
    setCurrentRound({
      ...currentRound,
      stitches: currentRound.stitches.filter((s) => s.id !== stitchId),
    });
  };

  const updateStitchNote = (stitchId: string, note: any) => {
    setCurrentRound({
      ...currentRound,
      stitches: currentRound.stitches.map((s) =>
        s.id === stitchId ? { ...s, note } : s
      ),
    });
  };

  const updateHeaderNote = (note: string) => {
    setCurrentRound({
      ...currentRound,
      headerNote: note,
    });
  };

  const updateFooterNote = (note: string) => {
    setCurrentRound({
      ...currentRound,
      footerNote: note,
    });
  };

  const updateNotes = (notes: string) => {
    setCurrentRound({ ...currentRound, notes });
  };

  const completeRound = (updatedRound: Round) => {
    if (!currentSectionId || updatedRound.stitches.length === 0) return;

    setPattern(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === currentSectionId
          ? { ...section, rounds: [...section.rounds, updatedRound] }
          : section
      ),
      updatedAt: new Date(),
    }));

    setCurrentRound({
      id: Math.random().toString(36).substr(2, 9),
      stitches: [],
      notes: '',
    });
  };

  const editRound = (roundId: string) => {
    if (!currentSectionId) return;

    const section = pattern.sections.find(s => s.id === currentSectionId);
    const round = section?.rounds.find(r => r.id === roundId);

    if (round) {
      setEditingRoundId(roundId);
      setCurrentRound(round);
      setPattern(prev => ({
        ...prev,
        sections: prev.sections.map(section =>
          section.id === currentSectionId
            ? { ...section, rounds: section.rounds.filter((r) => r.id !== roundId) }
            : section
        )
      }));
    }
  };

  const handleSectionDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sections = Array.from(pattern.sections);
    const [removed] = sections.splice(result.source.index, 1);
    sections.splice(result.destination.index, 0, removed);

    setPattern(prev => ({
      ...prev,
      sections: sections,
      updatedAt: new Date()
    }));
  };


  const deleteRound = (roundId: string) => {
    if (!currentSectionId) return;

    setPattern(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === currentSectionId
          ? { ...section, rounds: section.rounds.filter((r) => r.id !== roundId) }
          : section
      ),
      updatedAt: new Date(),
    }));
  };

  const handleReorderRounds = (startIndex: number, endIndex: number) => {
    if (!currentSectionId) return;

    setPattern(prev => ({
      ...prev,
      sections: prev.sections.map(section => {
        if (section.id !== currentSectionId) return section;

        const newRounds = Array.from(section.rounds);
        const [removed] = newRounds.splice(startIndex, 1);
        newRounds.splice(endIndex, 0, removed);
        return { ...section, rounds: newRounds };
      })
    }));
  };

  const updatePatternSettings = (settings: Partial<Pattern>) => {
    setPattern(prev => ({
      ...prev,
      ...settings,
      updatedAt: new Date(),
    }));
  };

  



  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2 text-primary-600">
          <PiSpinner className="w-6 h-6 animate-spin" />
          <span>Loading pattern...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[90rem] mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pattern Builder</h1>
          <p className="mt-2 text-gray-600">Create and edit your crochet pattern</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Content Area */}
          <div className="space-y-6">
            {/* Pattern Settings Card */}
            <PatternSettingsCard pattern={pattern} onUpdate={updatePatternSettings} />

            <SectionsManagement
              pattern={pattern}
              currentSectionId={currentSectionId}
              setCurrentSectionId={setCurrentSectionId}
              handleAddSection={handleAddSection}
              handleDeleteSection={handleDeleteSection}
              handleSectionDragEnd={handleSectionDragEnd}
              onUpdateSections={boundUpdateSections}
            />

            {currentSectionId && (
              <CustomTextInput onAddText={addCustomText} />
            )}



            {currentSectionId && (
              <>
                {/* Pattern Building Area */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold pb-6">Start you pattern</h2>

                    {!hasActualRounds && (
                      <PatternStarter onStart={handlePatternStart} />
                    )}

                    <StitchPanel onStitchSelect={addStitch} />

                    <CurrentRound
                      round={currentRound}
                      onComplete={completeRound}
                      onUpdateCount={updateStitchCount}
                      onUpdateNotes={updateNotes}
                      onDeleteStitch={deleteStitch}
                      onUpdateStitchNote={updateStitchNote}
                      onUpdateHeaderNote={updateHeaderNote}
                      onUpdateFooterNote={updateFooterNote}
                    />

                  </div>
                </div>
              </>
            )}

          </div>

          <PatternPreviewArea
            pattern={pattern}
            rounds={currentSection?.rounds || []}
            onEdit={editRound}
            onDelete={deleteRound}
            onReorder={handleReorderRounds}
            saveError={saveError}
            handleSave={handleSave}
            isSaving={isSaving}
            language="en"
          />
        </div>
      </div>

      <AddSectionModal
        isOpen={showAddSectionModal}
        onClose={() => setShowAddSectionModal(false)}
        onAdd={handleAddSection}
      />
    </div>
  );
}
