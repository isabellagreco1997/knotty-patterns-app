import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { usePatternStore } from '../stores/usePatternStore';
import PatternStarter from '../components/pattern-builder/PatternStarter';
import StitchPanel from '../components/pattern-builder/StitchPanel';
import CurrentRound from '../components/pattern-builder/CurrentRound';
import PatternDisplay from '../components/pattern-builder/PatternDisplay';
import PatternExport from '../components/pattern-builder/PatternExport';
import PatternSettings from '../components/pattern-builder/PatternSettings';
import StitchGuide from '../components/pattern-builder/StitchGuide';
import CrochetPreview from '../components/pattern-builder/CrochetPreview';
import AddSectionModal from '../components/pattern-builder/AddSectionModal';
import { PiPlus, PiCaretDown, PiTrash, PiSpinner } from 'react-icons/pi';
import type { Round, Pattern, PatternSection } from '../types/pattern';

export default function PatternBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addPattern, updatePattern } = usePatternStore();
  const [isSaving, setIsSaving] = useState(false);
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

  const currentSection = pattern.sections.find(s => s.id === currentSectionId);
  const hasActualRounds = currentSection?.rounds.some(round => !round.isText);

  useEffect(() => {
    if (user) {
      setPattern(prev => ({
        ...prev,
        userId: user.id
      }));
    }
  }, [user]);

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
        await addPattern(patternToSave);
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

  // ... rest of your existing functions ...
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

  const handlePatternStart = (type: 'magic-ring' | 'chain' | 'custom' | 'stitch', config: { count: number; text: string; stitchType: string }) => {
    if (!currentSectionId) return;

    let firstRound: Round;

    switch (type) {
      case 'magic-ring':
        firstRound = {
          id: '1',
          stitches: [{
            id: '1',
            type: 'sc',
            count: config.count,
          }],
          notes: `Magic ring with ${config.count} sc (${config.count} sts)`,
        };
        break;
      case 'chain':
        firstRound = {
          id: '1',
          stitches: [{
            id: '1',
            type: 'ch',
            count: config.count,
          }],
          notes: `Chain ${config.count} (${config.count} sts)`,
        };
        break;
      case 'stitch':
        firstRound = {
          id: '1',
          stitches: [{
            id: '1',
            type: config.stitchType,
            count: config.count,
          }],
          notes: `${config.count} ${config.stitchType} (${config.count} sts)`,
        };
        break;
      case 'custom':
        firstRound = {
          id: '1',
          stitches: [],
          notes: config.text,
          isText: true,
        };
        break;
      default:
        return;
    }

    setPattern(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === currentSectionId
          ? { ...section, rounds: [...section.rounds, firstRound] }
          : section
      )
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <PatternSettings
              pattern={pattern}
              onUpdate={updatePatternSettings}
            />

            {/* Section Management */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Pattern Sections</h2>
                <button
                  onClick={() => setShowAddSectionModal(true)}
                  className="inline-flex items-center px-3 py-2 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  <PiPlus className="w-4 h-4 mr-1" />
                  Add Section
                </button>
              </div>

              {pattern.sections.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Add a section to start building your pattern</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {pattern.sections.map((section) => (
                    <div
                      key={section.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        section.id === currentSectionId
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <button
                        onClick={() => setCurrentSectionId(section.id)}
                        className="flex items-center flex-1"
                      >
                        <PiCaretDown className={`w-4 h-4 mr-2 transition-transform ${
                          section.id === currentSectionId ? 'transform rotate-180' : ''
                        }`} />
                        <span className="font-medium">{section.name}</span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({section.rounds.length} rounds)
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeleteSection(section.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <PiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {currentSectionId && (
              <>
                {!hasActualRounds && (
                  <PatternStarter onStart={handlePatternStart} />
                )}

                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Add Custom Text
                      </label>
                      <input
                        type="text"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="Enter notes, comments, or instructions..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <button
                      onClick={() => addCustomText(customText)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                    >
                      Add Text
                    </button>
                  </div>
                </div>

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

                <PatternDisplay
                  pattern={pattern}
                  rounds={currentSection?.rounds || []}
                  onEdit={editRound}
                  onDelete={deleteRound}
                  onReorder={handleReorderRounds}
                  language="en"
                />

                <PatternExport pattern={pattern} rounds={currentSection?.rounds || []} />
              </>
            )}

            {saveError && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
                {saveError}
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="mt-6 w-full inline-flex justify-center items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <PiSpinner className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Pattern'
              )}
            </button>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="space-y-6">
            <CrochetPreview
              rounds={currentSection?.rounds || []}
              currentRound={currentRound}
            />
            <StitchGuide />
          </div>
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