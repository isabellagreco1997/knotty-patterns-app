import React from 'react';
import { PiLightbulb } from 'react-icons/pi';

const tips = [
  {
    title: "Use Sections Effectively",
    description: "Break down complex patterns into logical sections like 'Body', 'Arms', 'Head' for better organization."
  },
  {
    title: "Add Detailed Notes",
    description: "Include stitch-specific notes and round instructions to make your pattern clear and easy to follow."
  },
  {
    title: "Preview Often",
    description: "Use the pattern preview to check how your instructions will look to other crocheters."
  },
  {
    title: "Save Regularly",
    description: "Save your work frequently to prevent losing any changes. The pattern builder autosaves, but manual saves are recommended."
  }
];

export default function TipsAndTricks() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h3 className="text-2xl font-bold mb-6">Tips & Best Practices</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {tips.map((tip, index) => (
          <div key={index} className="bg-primary-50 p-6 rounded-xl">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <PiLightbulb className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}