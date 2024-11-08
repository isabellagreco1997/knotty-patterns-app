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
import CrochetPreview from '../components/pattern-builder/CrochetPreview';
import AddSectionModal from '../components/pattern-builder/AddSectionModal';
import { PiPlus, PiCaretDown, PiTrash, PiSpinner, PiWarning } from 'react-icons/pi';
import type { Round, Pattern, PatternSection } from '../types/pattern';

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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <PatternSettings
                  pattern={pattern}
                  onUpdate={updatePatternSettings}
                />
              </div>
            </div>


       

            {/* Sections Management Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                  <div className="space-y-2">
                    {pattern.sections.map((section) => (
                      <div
                        key={section.id}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-colors ${
                          section.id === currentSectionId
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-200 hover:bg-gray-50'
                        }`}
                      >
                        <button
                          onClick={() => setCurrentSectionId(section.id)}
                          className="flex items-center flex-1"
                        >
                          <PiCaretDown className={`w-5 h-5 mr-3 transition-transform ${
                            section.id === currentSectionId ? 'transform rotate-180' : ''
                          }`} />
                          <div>
                            <span className="font-medium text-lg">{section.name}</span>
                            <span className="ml-3 text-sm text-gray-500">
                              ({section.rounds.length} rounds)
                            </span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleDeleteSection(section.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <PiTrash className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {currentSectionId && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
            <h2 className="text-xl font-semibold">Add custom text</h2>
            <div className="mb-8">
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            This will create a new line but it won't be counted as a round
                          </label>
                          <input
                            type="text"
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value)}
                            placeholder="Enter notes, comments, or instructions..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <button
                          onClick={() => addCustomText(customText)}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          Add Text
                        </button>
                      </div>
                    </div>
                    </div>
                    </div>
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

            {/* Save Button */}
           
          </div>

          {/* Pattern Preview Area */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Pattern Preview</h2>
                <PatternDisplay
                  pattern={pattern}
                  rounds={currentSection?.rounds || []}
                  onEdit={editRound}
                  onDelete={deleteRound}
                  onReorder={handleReorderRounds}
                  language="en"
                />
              </div>
              <div className="m-3 mx-6 ">
              <PatternExport pattern={pattern} rounds={currentSection?.rounds || []} />
              </div>

              <div className="m-6 mx-6">
                  {saveError && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
                      {saveError}
                    </div>
                  )}

                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className=" w-full inline-flex justify-center items-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
                  >
                    {isSaving ? (
                      <>
                        <PiSpinner className="w-5 h-5 mr-2 animate-spin" />
                        Saving Pattern...
                      </>
                    ) : (
                      'Save Pattern'
                    )}
                  </button>
                </div>

            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <StitchGuide />
              </div>
            </div>
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
