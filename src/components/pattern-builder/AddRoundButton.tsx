import React from 'react';
import { PiPlus } from 'react-icons/pi';

interface AddRoundButtonProps {
  onClick: () => void;
}

export default function AddRoundButton({ onClick }: AddRoundButtonProps) {
  return (
    <div>
      <button
        onClick={onClick}
        className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
      >
        <PiPlus className="w-4 h-4 mr-2" />
        Add Round
      </button>
    </div>
  );
}