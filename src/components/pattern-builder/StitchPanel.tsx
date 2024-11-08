import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StitchButton from './StitchButton';
import { stitchTypes } from '../../data/stitches';
import { PiPlus, PiX, PiSparkle } from 'react-icons/pi';
import { useSubscriptionStatus } from '../../hooks/useSubscriptionStatus';

interface StitchPanelProps {
  onStitchSelect: (type: string) => void;
}

function StitchPanel({ onStitchSelect }: StitchPanelProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customStitch, setCustomStitch] = useState('');
  const { status: subscriptionStatus } = useSubscriptionStatus();
  const isPremium = subscriptionStatus === 'active';

  const handleCustomStitchAdd = () => {
    if (customStitch.trim()) {
      onStitchSelect(customStitch.trim().toLowerCase());
      setCustomStitch('');
      setShowCustomInput(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCustomStitchAdd();
    }
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-2">
        {stitchTypes.map((stitch) => (
          <StitchButton
            key={stitch.id}
            id={stitch.id}
            abbr={stitch.abbr}
            onClick={onStitchSelect}
          />
        ))}
        {isPremium ? (
          <button
            onClick={() => setShowCustomInput(true)}
            className="px-3 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
          >
            <PiPlus className="w-4 h-4 mr-1" />
            Custom
          </button>
        ) : (
          <div className="group relative">
            <Link
              to="/pricing"
              className="px-3 py-2 bg-gray-50 text-gray-400 rounded-md text-sm font-medium transition-colors flex items-center justify-center cursor-not-allowed"
            >
              <PiSparkle className="w-4 h-4 mr-1" />
              Custom
            </Link>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Available with Premium
            </div>
          </div>
        )}
      </div>

      {showCustomInput && (
        <div className="mt-2 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={customStitch}
              onChange={(e) => setCustomStitch(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter custom stitch (e.g., puff, bobble)"
              className="w-full px-3 py-2 border border-primary-200 rounded-md text-sm focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              autoFocus
            />
          </div>
          <button
            onClick={handleCustomStitchAdd}
            className="px-3 py-2 bg-primary-500 text-white rounded-md text-sm hover:bg-primary-600 transition-colors"
          >
            Add
          </button>
          <button
            onClick={() => {
              setShowCustomInput(false);
              setCustomStitch('');
            }}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <PiX className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default StitchPanel;