import React from 'react';
import { PiCheckCircle, PiSparkle } from 'react-icons/pi';

const features = [
  {
    emoji: "✨",
    title: "Pattern Builder",
    description: "Create beautiful patterns with our magical drag-and-drop builder!",
    features: [
      "Intuitive interface",
      "Real-time preview",
      "Auto stitch counting",
      "Custom notes & sections"
    ]
  },
  {
    emoji: "🤖",
    title: "AI Assistant",
    description: "Get instant inspiration and pattern suggestions!",
    features: [
      "Pattern generation",
      "Design visualization",
      "Smart suggestions",
      "24/7 availability"
    ]
  },
  {
    emoji: "📱",
    title: "Premium Features",
    description: "Everything you need to create amazing patterns!",
    features: [
      "PDF export",
      "Custom stitches",
      "Version history",
      "Priority support"
    ]
  }
];

export default function Features() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-primary-100 text-primary-800 rounded-full mb-6">
            <PiSparkle className="w-5 h-5 mr-2" />
            Packed with Magic! ✨
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to Create 
            <span className="block mt-2 bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">
              Amazing Patterns! 🎨
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="text-4xl mb-4">{feature.emoji}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.features.map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <PiCheckCircle className="w-5 h-5 text-primary-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}