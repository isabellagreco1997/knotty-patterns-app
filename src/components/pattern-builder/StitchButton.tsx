import React from 'react';

interface StitchButtonProps {
  id: string;
  abbr: string;
  onClick: (id: string) => void;
  isCustom?: boolean;
}

function StitchButton({ id, abbr, onClick, isCustom }: StitchButtonProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`px-3 py-2 ${
        isCustom 
          ? 'bg-primary-50 hover:bg-primary-100 text-primary-700' 
          : 'bg-rose-50 hover:bg-rose-100 text-rose-700'
      } rounded-md text-sm font-medium transition-colors`}
    >
      {abbr}
    </button>
  );
}

export default StitchButton;