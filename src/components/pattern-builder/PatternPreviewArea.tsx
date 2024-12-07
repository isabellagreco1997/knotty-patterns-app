import React from 'react';
import PatternDisplay from './PatternDisplay';
import PatternExport from './PatternExport';
import StitchGuide from './StitchGuide';
import { PiSpinner, PiCaretDown } from 'react-icons/pi';
import type { Pattern, Round } from '../../types/pattern';

interface PatternPreviewAreaProps {
  pattern: Pattern;
  rounds: Round[];
  onEdit: (roundId: string) => void;
  onDelete: (roundId: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
  onEditText?: (roundId: string, text: string) => void;
  saveError: string | null;
  handleSave: () => void;
  isSaving: boolean;
  language?: string;
}

const PatternPreviewArea: React.FC<PatternPreviewAreaProps> = ({
  pattern,
  rounds,
  onEdit,
  onDelete,
  onReorder,
  onEditText,
  saveError,
  handleSave,
  isSaving,
  language = 'en',
}) => {
  return (
    <div className="space-y-6">
      {/* Pattern Preview Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold">Pattern Preview</h2>
        </div>

        {/* Scrollable Content Area */}
        <div className="relative">
          {/* Scroll Indicator */}
          <div className="absolute right-6 bottom-4 z-20 flex flex-col items-center animate-bounce opacity-50">
            <PiCaretDown className="w-6 h-6 text-primary-600" />
            <span className="text-xs text-primary-600">Scroll for more</span>
          </div>

          {/* Main Content */}
          <div className="p-6 max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-thin scrollbar-thumb-primary-200 scrollbar-track-gray-100">
            <PatternDisplay
              pattern={pattern}
              rounds={rounds}
              onEdit={onEdit}
              onDelete={onDelete}
              onReorder={onReorder}
              onEditText={onEditText}
              language={language}
            />
          </div>
        </div>

        {/* Fixed Bottom Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200">
          <div className="p-6">
            <PatternExport pattern={pattern} rounds={rounds} />

            {saveError && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
                {saveError}
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="mt-4 w-full inline-flex justify-center items-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
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
      </div>

      {/* Stitch Guide Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <StitchGuide />
        </div>
      </div>
    </div>
  );
};

export default PatternPreviewArea;