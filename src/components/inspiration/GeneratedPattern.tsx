import React from 'react';
import { PiSpinner, PiCheck } from 'react-icons/pi';

interface GeneratedPatternProps {
  generatedPattern: string | null;
  isSaving: boolean;
  handleSavePattern: () => void;
}

export function GeneratedPattern({
  generatedPattern,
  isSaving,
  handleSavePattern,
}: GeneratedPatternProps) {
  if (!generatedPattern) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Generated Pattern</h3>
        <button
          onClick={handleSavePattern}
          disabled={isSaving}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <PiSpinner className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <PiCheck className="w-4 h-4 mr-2" />
              Save Pattern
            </>
          )}
        </button>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 whitespace-pre-wrap font-mono text-sm">
        {generatedPattern}
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Click "Save Pattern" to store this pattern in your generated patterns collection.
      </p>
    </div>
  );
}
