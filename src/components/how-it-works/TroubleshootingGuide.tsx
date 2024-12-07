import React from 'react';
import { PiWarning } from 'react-icons/pi';

const troubleshootingItems = [
  {
    problem: "Changes not saving",
    solution: "Click the 'Save' button manually or check your internet connection. All changes are automatically saved, but manual saves are recommended."
  },
  {
    problem: "Repetition group not working",
    solution: "Ensure you've selected at least two stitches and set a repeat count greater than 1."
  },
  {
    problem: "Pattern preview not updating",
    solution: "Try refreshing the page or check if you have unsaved changes."
  },
  {
    problem: "Custom text not editable",
    solution: "Click the edit icon next to the text to enable editing mode."
  }
];

export default function TroubleshootingGuide() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h3 className="text-2xl font-bold mb-6">Troubleshooting Guide</h3>
      <div className="space-y-6">
        {troubleshootingItems.map((item, index) => (
          <div key={index} className="bg-red-50 p-6 rounded-xl">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <PiWarning className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.problem}</h4>
                <p className="text-gray-600">{item.solution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}