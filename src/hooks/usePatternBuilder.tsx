import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/useAuthStore';
import { usePatternStore } from '../stores/usePatternStore';
import { useCurrentRound } from './useCurrentRound';
import { useSavePattern } from './useSavePattern';
import { generateFirstRound } from '../components/pattern-builder/patternHelpers';
import { updateSections } from '../helpers/updateSections';
import type { Pattern, PatternSection, Round } from '../types/pattern';
import { DropResult } from 'react-beautiful-dnd';

const AUTOSAVE_KEY = 'knottypatterns_autosave';

const getInitialPattern = (): Pattern => {
  const savedPattern = localStorage.getItem(AUTOSAVE_KEY);
  if (savedPattern) {
    try {
      return JSON.parse(savedPattern);
    } catch (error) {
      console.error('Error parsing saved pattern:', error);
    }
  }

  return {
    name: 'Untitled Pattern',
    description: '',
    difficulty: 'beginner',
    hookSize: '4.0mm',
    yarnWeight: 'worsted',
    sections: [],
    notes: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '',
  };
};

export const usePatternBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addPattern, updatePattern } = usePatternStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [editingRoundId, setEditingRoundId] = useState<string | null>(null);
  const [pattern, setPattern] = useState<Pattern>(getInitialPattern());

  const {
    currentRound,
    setCurrentRound,
    addStitch,
    updateStitchCount,
    deleteStitch,
    updateStitchNote,
    updateHeaderNote,
    updateFooterNote,
    updateNotes,
    resetCurrentRound,
  } = useCurrentRound();

  const { handleSave, isSaving, saveError, setSaveError } = useSavePattern({
    pattern,
    user,
    patternId: id,
    updatePattern,
    addPattern,
  });

  // Autosave pattern changes
  useEffect(() => {
    if (!id) { // Only autosave if this is a new pattern
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(pattern));
    }
  }, [pattern, id]);

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
            updatedAt: new Date(data.updated_at),
          };

          setPattern(loadedPattern);
          localStorage.removeItem(AUTOSAVE_KEY); // Clear autosave when loading existing pattern

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
      setPattern((prev) => ({
        ...prev,
        userId: user.id,
      }));
    }
  }, [user]);

  const startNewPattern = () => {
    if (window.confirm('Are you sure you want to start a new pattern? Any unsaved changes will be lost.')) {
      localStorage.removeItem(AUTOSAVE_KEY);
      setPattern(getInitialPattern());
      setCurrentSectionId(null);
      setEditingRoundId(null);
      resetCurrentRound('1');
      navigate('/pattern-builder');
    }
  };

  // Rest of the code remains exactly the same...
  const currentSection = pattern.sections.find((s) => s.id === currentSectionId);
  const hasActualRounds = currentSection?.rounds.some((round) => !round.isText);

  const handleAddSection = (name: string) => {
    const newSection: PatternSection = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      rounds: [],
    };

    setPattern((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
    setCurrentSectionId(newSection.id);
  };

  const handleDeleteSection = (sectionId: string) => {
    if (confirm('Are you sure you want to delete this section and all its rounds?')) {
      setPattern((prev) => ({
        ...prev,
        sections: prev.sections.filter((s) => s.id !== sectionId),
      }));
      if (currentSectionId === sectionId) {
        setCurrentSectionId(pattern.sections[0]?.id || null);
      }
    }
  };

  const boundUpdateSections = (sections: PatternSection[]) => {
    updateSections(setPattern, sections);
  };

  const handleSectionDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sections = Array.from(pattern.sections);
    const [removed] = sections.splice(result.source.index, 1);
    sections.splice(result.destination.index, 0, removed);

    setPattern((prev) => ({
      ...prev,
      sections: sections,
      updatedAt: new Date(),
    }));
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

    setPattern((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === currentSectionId
          ? { ...section, rounds: [...section.rounds, newRound] }
          : section
      ),
      updatedAt: new Date(),
    }));
  };

  const completeRound = (updatedRound: Round) => {
    if (!currentSectionId || updatedRound.stitches.length === 0) return;

    setPattern((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
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

    const section = pattern.sections.find((s) => s.id === currentSectionId);
    const round = section?.rounds.find((r) => r.id === roundId);

    if (round) {
      setEditingRoundId(roundId);
      setCurrentRound(round);
      setPattern((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.id === currentSectionId
            ? { ...section, rounds: section.rounds.filter((r) => r.id !== roundId) }
            : section
        ),
      }));
    }
  };

  const deleteRound = (roundId: string) => {
    if (!currentSectionId) return;

    setPattern((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === currentSectionId
          ? { ...section, rounds: section.rounds.filter((r) => r.id !== roundId) }
          : section
      ),
      updatedAt: new Date(),
    }));
  };

  const handleReorderRounds = (startIndex: number, endIndex: number) => {
    if (!currentSectionId) return;

    setPattern((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => {
        if (section.id !== currentSectionId) return section;

        const newRounds = Array.from(section.rounds);
        const [removed] = newRounds.splice(startIndex, 1);
        newRounds.splice(endIndex, 0, removed);
        return { ...section, rounds: newRounds };
      }),
    }));
  };

  const updatePatternSettings = (settings: Partial<Pattern>) => {
    setPattern((prev) => ({
      ...prev,
      ...settings,
      updatedAt: new Date(),
    }));
  };

  return {
    pattern,
    isLoading,
    isSaving,
    saveError,
    showAddSectionModal,
    currentSectionId,
    currentSection,
    hasActualRounds,
    editingRoundId,
    currentRound,
    setShowAddSectionModal,
    setCurrentSectionId,
    handleAddSection,
    handleDeleteSection,
    boundUpdateSections,
    handleSectionDragEnd,
    handlePatternStart,
    addCustomText,
    completeRound,
    editRound,
    deleteRound,
    handleReorderRounds,
    updatePatternSettings,
    handleSave,
    startNewPattern,
    addStitch,
    updateStitchCount,
    deleteStitch,
    updateStitchNote,
    updateHeaderNote,
    updateFooterNote,
    updateNotes,
  };
};