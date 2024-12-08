import React from 'react';
import { PiArrowRight } from 'react-icons/pi';

interface StepCardProps {
  step: number;
  icon: string;
  title: string;
  description: string;
  color: string;
  features: string[];
}

export default function StepCard({ step, icon, title, description, color, features }: StepCardProps) {
  return (
    <div className="relative group">
      {/* Step Number and Icon */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-sm font-bold text-gray-900 mb-4">
          {step}
        </div>
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${color} text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 text-2xl`}>
          {icon}
        </div>
      </div>

      {/* Card Content */}
      <div className="pt-32 h-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          {description}
        </p>

        {/* Features List */}
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center text-sm text-gray-600 justify-center group-hover:-translate-x-2 transition-transform">
              <PiArrowRight className="w-4 h-4 mr-2 text-gray-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}