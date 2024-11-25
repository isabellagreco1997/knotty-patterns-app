import React from 'react';
import { PiX, PiWarning } from 'react-icons/pi';

interface AIPatternPreviewProps {
  prompt: string;
  imageUrl: string;
  pattern: string;
  onClose: () => void;
}

export default function AIPatternPreview({
  prompt,
  imageUrl,
  pattern,
  onClose
}: AIPatternPreviewProps) {
  // Check if imageUrl is a base64 string or a regular URL
  const isBase64 = imageUrl.startsWith('data:image');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-primary-200 overflow-hidden mb-6">
      <div className="p-4 bg-primary-50 border-b border-primary-100 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-primary-900">AI Generated Pattern Preview</h2>
          <p className="text-sm text-primary-600">{prompt}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-primary-100 rounded-full"
          title="Close preview"
        >
          <PiX className="w-5 h-5 text-primary-600" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={imageUrl}
                alt={prompt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  if (!isBase64 && e.currentTarget.src !== imageUrl) {
                    e.currentTarget.src = imageUrl;
                  }
                }}
              />
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <PiWarning className="w-5 h-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  This is an AI-generated pattern that requires human testing.
                  Use the pattern builder below to test and refine the pattern.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {pattern}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}