import React from 'react';
import { Link } from 'react-router-dom';
import { PiX, PiPencilSimple, PiWarning } from 'react-icons/pi';

interface AIGeneratedPatternModalProps {
  isOpen: boolean;
  onClose: () => void;
  pattern: {
    id: string;
    prompt: string;
    image_data?: string;
    image_url?: string;
    raw_pattern: string;
    created_at: string;
  };
  onTestPattern: () => void;
}

export default function AIGeneratedPatternModal({
  isOpen,
  onClose,
  pattern,
  onTestPattern,
}: AIGeneratedPatternModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">AI Generated Pattern</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <PiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Image and Prompt */}
            <div>
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                <img
                  src={pattern.image_data || pattern.image_url}
                  alt={pattern.prompt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium text-gray-700 mb-2">Prompt</h3>
                <p className="text-gray-600">{pattern.prompt}</p>
              </div>
            </div>

            {/* Right Column - Pattern and Actions */}
            <div className="space-y-6">
              {/* Warning Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start">
                  <PiWarning className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-amber-800">
                    This is an AI-generated pattern that requires human testing.
                    Use the pattern builder to test and refine the pattern.
                  </p>
                </div>
              </div>

              {/* Pattern Preview */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Generated Pattern</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <pre className="text-sm whitespace-pre-wrap font-mono text-gray-600">
                    {pattern.raw_pattern}
                  </pre>
                </div>
              </div>

              {/* Creation Date */}
              <div className="text-sm text-gray-500">
                Created on: {new Date(pattern.created_at).toLocaleDateString()}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
                <button
                  onClick={onTestPattern}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <PiPencilSimple className="w-4 h-4 mr-2" />
                  Test in Pattern Builder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}