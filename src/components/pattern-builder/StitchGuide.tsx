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
      <div className="mt-6">
        <img
          src="https://images.unsplash.com/photo-1604940500627-d3f44d1d21c7?auto=format&fit=crop&q=80&w=400&h=300"
          alt="Crochet Stitches"
          className="w-full rounded-md"
        />
      </div>
    </div>
  );
}

export default StitchGuide;