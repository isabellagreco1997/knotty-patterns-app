import React from 'react';
import type { Pattern } from '../../types/pattern';

interface PatternSettingsProps {
  pattern: Pattern;
  onUpdate: (settings: Partial<Pattern>) => void;
}

function PatternSettings({ pattern, onUpdate }: PatternSettingsProps) {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
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
          onChange={(e) => onUpdate({ difficulty: e.target.value })}
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
        <select
          value={pattern.hookSize}
          onChange={(e) => onUpdate({ hookSize: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="2.25mm">2.25mm (B-1)</option>
          <option value="2.75mm">2.75mm (C-2)</option>
          <option value="3.25mm">3.25mm (D-3)</option>
          <option value="3.5mm">3.5mm (E-4)</option>
          <option value="3.75mm">3.75mm (F-5)</option>
          <option value="4.0mm">4.0mm (G-6)</option>
          <option value="4.5mm">4.5mm (7)</option>
          <option value="5.0mm">5.0mm (H-8)</option>
          <option value="5.5mm">5.5mm (I-9)</option>
          <option value="6.0mm">6.0mm (J-10)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Yarn Weight
        </label>
        <select
          value={pattern.yarnWeight}
          onChange={(e) => onUpdate({ yarnWeight: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="lace">Lace (0)</option>
          <option value="superfine">Super Fine (1)</option>
          <option value="fine">Fine (2)</option>
          <option value="light">Light (3)</option>
          <option value="worsted">Worsted (4)</option>
          <option value="bulky">Bulky (5)</option>
          <option value="super-bulky">Super Bulky (6)</option>
          <option value="jumbo">Jumbo (7)</option>
        </select>
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
  );
}

export default PatternSettings;