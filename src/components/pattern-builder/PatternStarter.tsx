import React, { useState } from 'react';
import { PiCircle, PiPlus, PiTextT } from 'react-icons/pi';

interface PatternStarterProps {
  onStart: (type: 'magic-ring' | 'chain' | 'custom' | 'stitch', config: any) => void;
}

export default function PatternStarter({ onStart }: PatternStarterProps) {
  const [selectedType, setSelectedType] = useState<'magic-ring' | 'chain' | 'custom' | 'stitch' | null>(null);
  const [stitchCount, setStitchCount] = useState(6);
  const [customText, setCustomText] = useState('');
  const [stitchType, setStitchType] = useState('sc');

  const handleTypeSelect = (type: 'magic-ring' | 'chain' | 'custom' | 'stitch') => {
    setSelectedType(type === selectedType ? null : type);
  };

  return (
    <div className="mb-6 space-y-6">
      {/* Start Options - Always Visible */}
      <div className="p-4 border border-primary-200 rounded-lg bg-primary-50">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <button
            onClick={() => handleTypeSelect('magic-ring')}
            className={`px-4 py-3 rounded-md border transition-colors ${
              selectedType === 'magic-ring'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center justify-center">
              <PiCircle className="w-4 h-4 mr-2" />
              Magic Ring
            </div>
          </button>
          <button
            onClick={() => handleTypeSelect('chain')}
            className={`px-4 py-3 rounded-md border transition-colors ${
              selectedType === 'chain'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center justify-center">
              <PiPlus className="w-4 h-4 mr-2" />
              Chain
            </div>
          </button>
          <button
            onClick={() => handleTypeSelect('stitch')}
            className={`px-4 py-3 rounded-md border transition-colors ${
              selectedType === 'stitch'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center justify-center">
              <PiPlus className="w-4 h-4 mr-2" />
              Single Stitch
            </div>
          </button>
         
        </div>
      </div>

      {/* Configuration Options - Show when type is selected */}
      {selectedType && (
        <div className="p-4 bg-white rounded-lg border border-primary-100 shadow-sm">
          <h4 className="text-sm font-medium text-neutral-700 mb-3">
            Configure {selectedType === 'magic-ring' ? 'Magic Ring' : 
                      selectedType === 'chain' ? 'Chain' :
                      selectedType === 'stitch' ? 'Single Stitch' : 'Custom Text'}
          </h4>

          {selectedType === 'custom' ? (
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Enter your custom pattern start..."
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
            />
          ) : selectedType === 'stitch' ? (
            <div className="flex items-center space-x-4">
              <select
                value={stitchType}
                onChange={(e) => setStitchType(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="sc">Single Crochet</option>
                <option value="dc">Double Crochet</option>
                <option value="hdc">Half Double Crochet</option>
                <option value="tr">Triple Crochet</option>
              </select>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={stitchCount}
                  onChange={(e) => setStitchCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 px-3 py-2 border border-neutral-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                />
                <span className="ml-2 text-neutral-600">stitches</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                value={stitchCount}
                onChange={(e) => setStitchCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-3 py-2 border border-neutral-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
              <span className="text-neutral-600">
                {selectedType === 'magic-ring' ? 'stitches in ring' : 'chain stitches'}
              </span>
            </div>
          )}

          <button
            onClick={() => onStart(selectedType, {
              count: stitchCount,
              text: customText,
              stitchType
            })}
            className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            {selectedType === 'custom' ? (
              <PiTextT className="w-4 h-4 mr-2" />
            ) : selectedType === 'magic-ring' ? (
              <PiCircle className="w-4 h-4 mr-2" />
            ) : (
              <PiPlus className="w-4 h-4 mr-2" />
            )}
            Start Pattern
          </button>
        </div>
      )}
    </div>
  );
}