import React from 'react';
import StitchButton from './StitchButton';
import { stitchTypes } from '../../data/stitches';

interface StitchPanelProps {
  onStitchSelect: (type: string) => void;
}

function StitchPanel({ onStitchSelect }: StitchPanelProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
      {stitchTypes.map((stitch) => (
        <StitchButton
          key={stitch.id}
          id={stitch.id}
          abbr={stitch.abbr}
          onClick={onStitchSelect}
        />
      ))}
    </div>
  );
}

export default StitchPanel;