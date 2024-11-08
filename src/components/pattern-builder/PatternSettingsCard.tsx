import React from 'react';
import PatternSettings from './PatternSettings';
import type { Pattern } from '../../types/pattern';

interface PatternSettingsCardProps {
  pattern: Pattern;
  onUpdate: (settings: Partial<Pattern>) => void;
}

const PatternSettingsCard: React.FC<PatternSettingsCardProps> = ({ pattern, onUpdate }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <PatternSettings pattern={pattern} onUpdate={onUpdate} />
      </div>
    </div>
  );
};

export default PatternSettingsCard;
