import React from 'react';
import { stitchTypes } from '../../data/stitches';

function StitchGuide() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Stitch Guide</h2>
      <div className="space-y-3">
        <div className="grid grid-cols-[80px_1fr] gap-4">
          {stitchTypes.map((stitch) => (
            <React.Fragment key={stitch.id}>
              <div className="font-medium text-primary-600">
                {stitch.abbr}
              </div>
              <div className="text-neutral-600">
                {stitch.name}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default StitchGuide;