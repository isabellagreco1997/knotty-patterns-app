import React from 'react';
import { PiPencilSimple, PiArrowsOutCardinal, PiRepeat, PiTextT, PiNote, PiInfo} from 'react-icons/pi';


export const InfoBox = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4 p-3 bg-primary-50 rounded-lg border border-primary-100">
      <div className="flex items-start">
        <PiInfo className="w-5 h-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
        <div className="text-sm text-primary-700">{children}</div>
      </div>
    </div>
  );
export const MockPatternBuilder = () => (
  <div className="border-2 border-primary-200 rounded-xl p-4 bg-white shadow-sm">
    <div className="border-b pb-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Pattern Settings</h3>
          <div className="text-sm text-gray-500">Configure basic pattern details</div>
        </div>
        <PiPencilSimple className="w-5 h-5 text-primary-600" />
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <button className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">sc</button>
        <button className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">dc</button>
        <button className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">inc</button>
      </div>
      <div className="border rounded-md p-3 bg-gray-50">
        <div className="text-sm text-gray-600">Current Round Preview</div>
      </div>
    </div>
  </div>
);

export const MockRepetitionGroup = () => (
  <div className="border-2 border-primary-200 rounded-xl p-4 bg-white shadow-sm">
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">2 sc</div>
        <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">1 inc</div>
        <PiRepeat className="w-5 h-5 text-primary-600" />
        <span className="text-sm text-gray-600">× 6</span>
      </div>
      <div className="text-sm text-gray-500">Selected stitches will repeat 6 times</div>
    </div>
  </div>
);

export const MockCustomText = () => (
  <div className="border-2 border-primary-200 rounded-xl p-4 bg-white shadow-sm">
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <PiTextT className="w-5 h-5 text-primary-600 mr-2" />
          <span className="text-sm font-medium">Custom Text</span>
        </div>
        <PiPencilSimple className="w-4 h-4 text-gray-400" />
      </div>
      <div className="p-2 bg-gray-50 rounded text-sm text-gray-600">
        Join with slip stitch to first sc
      </div>
    </div>
  </div>
);

export const MockStitchControls = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <div className="flex flex-wrap gap-2 mb-4">
      <button className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">sc</button>
      <button className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">dc</button>
      <button className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">hdc</button>
      <button className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">tr</button>
      <button className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">inc</button>
      <button className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">dec</button>
    </div>
    <div className="text-sm text-gray-500">Click to add stitches to your pattern</div>
  </div>
);

export const MockStitchNotes = () => (
  <div className="border-2 border-primary-200 rounded-xl p-4 bg-white shadow-sm">
    <div className="space-y-2">
      <div className="flex items-center">
        <PiNote className="w-5 h-5 text-primary-600 mr-2" />
        <span className="text-sm font-medium">Stitch Notes</span>
      </div>
      <div className="p-2 bg-gray-50 rounded text-sm text-gray-600">
        <div className="mb-2">
          <span className="text-primary-600">Before:</span> Insert hook in next stitch
        </div>
        <div>
          <span className="text-primary-600">After:</span> Pull tight
        </div>
      </div>
    </div>
  </div>
);

export const MockSectionManagement = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
    <InfoBox>
      Quick access to common stitches:
      <ul className="mt-2 ml-4 list-disc space-y-1">
        <li>Standard stitches (sc, dc, hdc, tr)</li>
        <li>Increases and decreases</li>
        <li>Custom stitch creation</li>
        <li>Frequently used combinations</li>
      </ul>
    </InfoBox>
    <div className="flex items-center justify-between p-2 bg-primary-50 rounded-md">
      <span className="font-medium">Body</span>
      <div className="flex space-x-2">
        <PiArrowsOutCardinal className="w-4 h-4 text-gray-400" />
        <PiPencilSimple className="w-4 h-4 text-gray-400" />
      </div>
    </div>
    <div className="flex items-center justify-between p-2 bg-primary-50 rounded-md">
      <span className="font-medium">Arms (make 2)</span>
      <div className="flex space-x-2">
        <PiArrowsOutCardinal className="w-4 h-4 text-gray-400" />
        <PiPencilSimple className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  </div>
);

export const MockPatternExport = () => (
  <div className="border-2 border-primary-200 rounded-xl p-4 bg-white shadow-sm">
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-medium">Export Options</span>
      </div>
      <div className="flex space-x-2">
        <button className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">PDF</button>
        <button className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">Copy</button>
        <button className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">Print</button>
      </div>
    </div>
  </div>
);

export const MockPatternPreview = () => (
  <div className="border-2 border-primary-200 rounded-xl p-4 bg-white shadow-sm">
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-medium">Pattern Preview</span>
      </div>
      <div className="p-2 bg-gray-50 rounded text-sm text-gray-600">
        <div className="mb-2">Round 1: 6 sc in magic ring (6)</div>
        <div>Round 2: *inc* 6 times (12)</div>
      </div>
    </div>
  </div>
);