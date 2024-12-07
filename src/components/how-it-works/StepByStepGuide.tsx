import React from 'react';

interface StepGuideProps {
  title: string;
  description: string;
  steps: string[];
  visual: React.ReactNode;
}

export default function StepByStepGuide({ title, description, steps, visual }: StepGuideProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="mb-6">{visual}</div>
      <ol className="space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start">
            <span className="w-6 h-6 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm">
              {i + 1}
            </span>
            <span className="text-gray-600">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}