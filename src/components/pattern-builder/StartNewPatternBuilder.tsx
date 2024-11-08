import React, { useState } from 'react';
import { PiPlus, PiWarning } from 'react-icons/pi';

interface StartNewPatternButtonProps {
  onReset: () => void;
  hasAutosave: boolean;
}

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ConfirmModal({ isOpen, onClose, onConfirm }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-center text-amber-600 mb-4">
          <PiWarning className="w-12 h-12" />
        </div>
        <h3 className="text-xl font-semibold text-center mb-4">Start New Pattern?</h3>
        <p className="text-gray-600 mb-6 text-center">
          You have unsaved changes. Starting a new pattern will clear your current work. Are you sure you want to continue?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Start New Pattern
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StartNewPatternButton({ onReset, hasAutosave }: StartNewPatternButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    if (hasAutosave) {
      setShowConfirm(true);
    } else {
      onReset();
    }
  };

  const handleConfirm = () => {
    onReset();
    setShowConfirm(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
      >
        <PiPlus className="w-4 h-4 mr-2" />
        New Pattern
      </button>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}