import React from 'react';

interface FeatureItem {
  icon: React.ReactNode;
  text: string;
}

interface FeatureSectionProps {
  title: string;
  description: string;
  visual: React.ReactNode;
  items: FeatureItem[];
}

export default function FeatureSection({ title, description, visual, items }: FeatureSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{description}</p>
          <ul className="space-y-4">
            {items.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center mr-3">
                  {item.icon}
                </span>
                <span className="text-gray-600">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center">
          {visual}
        </div>
      </div>
    </div>
  );
}