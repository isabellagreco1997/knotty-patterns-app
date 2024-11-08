import React, { useState } from 'react';
import { PiCaretDown, PiPlus } from 'react-icons/pi';
import type { Pattern } from '../../types/pattern';

interface PatternSettingsProps {
  pattern: Pattern;
  onUpdate: (settings: Partial<Pattern>) => void;
}

function PatternSettings({ pattern, onUpdate }: PatternSettingsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showCustomHookSize, setShowCustomHookSize] = useState(false);
  const [showCustomYarnWeight, setShowCustomYarnWeight] = useState(false);
  const [customHookSize, setCustomHookSize] = useState('');
  const [customYarnWeight, setCustomYarnWeight] = useState('');

  const handleCustomHookSize = () => {
    if (customHookSize.trim()) {
      onUpdate({ hookSize: customHookSize.trim() });
      setCustomHookSize('');
      setShowCustomHookSize(false);
    }
  };

  const handleCustomYarnWeight = () => {
    if (customYarnWeight.trim()) {
      onUpdate({ yarnWeight: customYarnWeight.trim() });
      setCustomYarnWeight('');
      setShowCustomYarnWeight(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left mb-4"
      >
        <h2 className="text-xl font-semibold">Pattern Details</h2>
        <PiCaretDown className={`w-5 h-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
      </button>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300 ease-in-out overflow-hidden ${
        isExpanded ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0'
      }`}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pattern Name
          </label>
          <input
            type="text"
            value={pattern.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level
          </label>
          <select
            value={pattern.difficulty}
            onChange={(e) => onUpdate({ difficulty: e.target.value as Pattern['difficulty'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hook Size
          </label>
          {showCustomHookSize ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={customHookSize}
                onChange={(e) => setCustomHookSize(e.target.value)}
                placeholder="Enter custom hook size..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleCustomHookSize}
                className="px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Add
              </button>
              <button
                onClick={() => setShowCustomHookSize(false)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <select
                value={pattern.hookSize}
                onChange={(e) => onUpdate({ hookSize: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="1.25mm">1.25mm (Steel 10)</option>
                <option value="1.5mm">1.5mm (Steel 7)</option>
                <option value="1.75mm">1.75mm (Steel 5)</option>
                <option value="2.0mm">2.0mm (Steel 4)</option>
                <option value="2.25mm">2.25mm (B-1)</option>
                <option value="2.75mm">2.75mm (C-2)</option>
                <option value="3.0mm">3.0mm (D-3)</option>
                <option value="3.25mm">3.25mm (D-3)</option>
                <option value="3.5mm">3.5mm (E-4)</option>
                <option value="3.75mm">3.75mm (F-5)</option>
                <option value="4.0mm">4.0mm (G-6)</option>
                <option value="4.25mm">4.25mm (G-6)</option>
                <option value="4.5mm">4.5mm (7)</option>
                <option value="5.0mm">5.0mm (H-8)</option>
                <option value="5.5mm">5.5mm (I-9)</option>
                <option value="6.0mm">6.0mm (J-10)</option>
                <option value="6.5mm">6.5mm (K-10½)</option>
                <option value="7.0mm">7.0mm (L-11)</option>
                <option value="8.0mm">8.0mm (L-11)</option>
                <option value="9.0mm">9.0mm (M-13)</option>
                <option value="10.0mm">10.0mm (N-15)</option>
                <option value="12.0mm">12.0mm (P-17)</option>
                <option value="15.0mm">15.0mm (P-17)</option>
                <option value="16.0mm">16.0mm (Q)</option>
                <option value="19.0mm">19.0mm (S)</option>
                <option value="25.0mm">25.0mm (U)</option>
              </select>
              <button
                onClick={() => setShowCustomHookSize(true)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <PiPlus className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Yarn Weight
          </label>
          {showCustomYarnWeight ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={customYarnWeight}
                onChange={(e) => setCustomYarnWeight(e.target.value)}
                placeholder="Enter custom yarn weight..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleCustomYarnWeight}
                className="px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Add
              </button>
              <button
                onClick={() => setShowCustomYarnWeight(false)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <select
                value={pattern.yarnWeight}
                onChange={(e) => onUpdate({ yarnWeight: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="thread">Thread (0)</option>
                <option value="lace">Lace (0)</option>
                <option value="light-fingering">Light Fingering (1)</option>
                <option value="fingering">Fingering (1)</option>
                <option value="sock">Sock (1)</option>
                <option value="sport">Sport (2)</option>
                <option value="baby">Baby (2)</option>
                <option value="dk">DK (3)</option>
                <option value="light-worsted">Light Worsted (3)</option>
                <option value="worsted">Worsted (4)</option>
                <option value="afghan">Afghan (4)</option>
                <option value="aran">Aran (4)</option>
                <option value="chunky">Chunky (5)</option>
                <option value="craft">Craft (5)</option>
                <option value="rug">Rug (5)</option>
                <option value="bulky">Bulky (5)</option>
                <option value="super-bulky">Super Bulky (6)</option>
                <option value="roving">Roving (6)</option>
                <option value="jumbo">Jumbo (7)</option>
                <option value="giant">Giant (7)</option>
              </select>
              <button
                onClick={() => setShowCustomYarnWeight(true)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <PiPlus className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pattern Description
          </label>
          <textarea
            value={pattern.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
            placeholder="Describe your pattern..."
          />
        </div>
      </div>
    </div>
  );
}

export default PatternSettings;