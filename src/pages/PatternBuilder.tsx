import React from 'react';
import PatternSettingsCard from '../components/pattern-builder/PatternSettingsCard';
import SectionsManagement from '../components/pattern-builder/SectionsManagement';
import CustomTextInput from '../components/pattern-builder/CustomTextInput';
import PatternPreviewArea from '../components/pattern-builder/PatternPreviewArea';
import PatternStarter from '../components/pattern-builder/PatternStarter';
import StitchPanel from '../components/pattern-builder/StitchPanel';
import CurrentRound from '../components/pattern-builder/CurrentRound';
import AddSectionModal from '../components/pattern-builder/AddSectionModal';
import { usePatternBuilder } from '../hooks/usePatternBuilder';
import { PiSpinner, PiPlus, PiWarning } from 'react-icons/pi';
import FeedbackBanner from '../components/FeedbackBanner';

export default function PatternBuilder() {
  const {
    pattern,
    isLoading,
    isSaving,
    saveError,
    showAddSectionModal,
    currentSectionId,
    currentSection,
    hasActualRounds,
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
  } = usePatternBuilder();

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
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className=" top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[90rem] mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pattern Builder</h1>
              <p className="mt-1 text-gray-600">Create and edit your crochet pattern</p>
            </div>
            <button
              onClick={startNewPattern}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <PiPlus className="w-4 h-4 mr-2" />
              New Pattern
            </button>
          </div>

          {/* Pattern Details and Sections Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
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
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 py-6">
          {/* Left Column - Pattern Building Tools */}
          <div className="space-y-6">
            {pattern.sections.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="text-center py-12">
                    <PiWarning className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Add a section to start building your pattern</p>
                    <button
                      onClick={() => setShowAddSectionModal(true)}
                      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      <PiPlus className="w-4 h-4 mr-2" />
                      Add Your First Section
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {currentSectionId && <CustomTextInput onAddText={addCustomText} />}

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
              </>
            )}
          </div>

          {/* Right Column - Pattern Preview */}
          <div className="hidden lg:block">
            <div className="sticky top-[300px] bottom-6">
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

          {/* Mobile Pattern Preview */}
          <div className="lg:hidden">
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
      </div>

      <AddSectionModal
        isOpen={showAddSectionModal}
        onClose={() => setShowAddSectionModal(false)}
        onAdd={handleAddSection}
      />
          <FeedbackBanner />

    </div>
  );
}