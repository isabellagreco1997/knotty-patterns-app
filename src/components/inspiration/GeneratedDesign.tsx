import React from 'react';
import { PiSpinner, PiPencilSimple } from 'react-icons/pi';

interface GeneratedDesignProps {
  generatedImage: string | null;
  prompt: string;
  isGeneratingPattern: boolean;
  handleCreatePattern: () => void;
}

export function GeneratedDesign({
  generatedImage,
  prompt,
  isGeneratingPattern,
  handleCreatePattern,
}: GeneratedDesignProps) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Generated Design</h2>
      <div className="relative rounded-xl overflow-hidden bg-gray-100">
        <img src={generatedImage || ''} alt={prompt} className="w-full h-auto" />
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <a
            href={generatedImage || ''}
            download="crochet-inspiration.png"
            className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors"
          >
            Download Image
          </a>
          <button
            onClick={handleCreatePattern}
            disabled={isGeneratingPattern}
            className="inline-flex items-center px-4 py-2 bg-primary-600/90 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPattern ? (
              <>
                <PiSpinner className="w-4 h-4 mr-2 animate-spin" />
                Creating Pattern...
              </>
            ) : (
              <>
                <PiPencilSimple className="w-4 h-4 mr-2" />
                Create Pattern
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
