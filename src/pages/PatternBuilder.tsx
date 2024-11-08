import React from 'react';

// Components
import PatternSettingsCard from '../components/pattern-builder/PatternSettingsCard';
import SectionsManagement from '../components/pattern-builder/SectionsManagement';
import CustomTextInput from '../components/pattern-builder/CustomTextInput';
import PatternPreviewArea from '../components/pattern-builder/PatternPreviewArea';
import PatternStarter from '../components/pattern-builder/PatternStarter';
import StitchPanel from '../components/pattern-builder/StitchPanel';
import CurrentRound from '../components/pattern-builder/CurrentRound';
import AddSectionModal from '../components/pattern-builder/AddSectionModal';

// Hooks
import { usePatternBuilder } from '../hooks/usePatternBuilder';

// Icons
import { PiSpinner, PiPlus } from 'react-icons/pi';

// Main Component
export default function PatternBuilder() {
  // Use the custom hook
  const {
    // State
    pattern,
    isLoading,
    isSaving,
    saveError,
    showAddSectionModal,
    currentSectionId,
    currentSection,
    hasActualRounds,
    currentRound,

    // State Updaters
    setShowAddSectionModal,
    setCurrentSectionId,

    // Handlers
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

    // Round Handlers
    addStitch,
    updateStitchCount,
    deleteStitch,
    updateStitchNote,
    updateHeaderNote,
    updateFooterNote,
    updateNotes,
  } = usePatternBuilder();

  // Loading State
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

  // Main Render
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[90rem] mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pattern Builder</h1>
            <p className="mt-2 text-gray-600">Create and edit your crochet pattern</p>
          </div>
          <button
            onClick={startNewPattern}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <PiPlus className="w-4 h-4 mr-2" />
            New Pattern
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Pattern Settings Card */}
            <PatternSettingsCard pattern={pattern} onUpdate={updatePatternSettings} />

            {/* Sections Management */}
            <SectionsManagement
              pattern={pattern}
              currentSectionId={currentSectionId}
              setCurrentSectionId={setCurrentSectionId}
              handleAddSection={handleAddSection}
              handleDeleteSection={handleDeleteSection}
              handleSectionDragEnd={handleSectionDragEnd}
              onUpdateSections={boundUpdateSections}
            />

            {/* Custom Text Input */}
            {currentSectionId && <CustomTextInput onAddText={addCustomText} />}

            {/* Pattern Building Area */}
            {currentSectionId && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold pb-6">Start your pattern</h2>

                  {!hasActualRounds && <PatternStarter onStart={handlePatternStart} />}

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
            )}
          </div>

          {/* Right Column */}
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

      {/* Add Section Modal */}
      <AddSectionModal
        isOpen={showAddSectionModal}
        onClose={() => setShowAddSectionModal(false)}
        onAdd={handleAddSection}
      />
    </div>
  );
}