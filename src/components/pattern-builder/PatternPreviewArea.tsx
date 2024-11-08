import React from 'react';
import PatternDisplay from './PatternDisplay';
import PatternExport from './PatternExport';
import StitchGuide from './StitchGuide';
import { PiSpinner } from 'react-icons/pi';
import type { Pattern, Round } from '../../types/pattern';

interface PatternPreviewAreaProps {
  pattern: Pattern;
  rounds: Round[];
  onEdit: (roundId: string) => void;
  onDelete: (roundId: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
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
  saveError,
  handleSave,
  isSaving,
  language = 'en',
}) => {
  return (
    <div className="space-y-6">
      {/* Pattern Preview Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Pattern Preview</h2>
          <PatternDisplay
            pattern={pattern}
            rounds={rounds}
            onEdit={onEdit}
            onDelete={onDelete}
            onReorder={onReorder}
            language={language}
          />
        </div>
        <div className="m-3 mx-6">
          <PatternExport pattern={pattern} rounds={rounds} />
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
            className="w-full inline-flex justify-center items-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
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
