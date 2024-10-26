import React from 'react';

interface StitchButtonProps {
  id: string;
  abbr: string;
  onClick: (id: string) => void;
}

function StitchButton({ id, abbr, onClick }: StitchButtonProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-md text-sm font-medium transition-colors"
    >
      {abbr}
    </button>
  );
}

export default StitchButton;