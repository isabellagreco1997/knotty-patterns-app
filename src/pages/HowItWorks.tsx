import React from 'react';
import { Link } from 'react-router-dom';
import { PiPencilSimple, PiListBullets, PiTextT, PiMagicWand, PiDownload, PiArrowRight } from 'react-icons/pi';
import SEOHead from '../components/SEOHead';
import Mock from '../../public/mock.png';

const steps = [
  {
    icon: <PiListBullets className="w-8 h-8" />,
    title: "1. Create Sections",
    description: "Start by creating sections for your pattern (e.g., Body, Head, Arms). Each section helps organize your pattern into logical parts.",
    tips: [
      "Use descriptive names for sections",
      "Create sections in the order you'll crochet them",
      "Add notes to clarify special instructions"
    ]
  },
  {
    icon: <PiPencilSimple className="w-8 h-8" />,
    title: "2. Build Your Pattern",
    description: "Add stitches round by round using our intuitive stitch builder. Start with a magic ring or chain, then build your pattern one round at a time.",
    tips: [
      "Use the stitch panel for quick access to common stitches",
      "Add custom stitches for unique techniques",
      "Include stitch counts for each round"
    ]
  },
  {
    icon: <PiTextT className="w-8 h-8" />,
    title: "3. Add Notes & Instructions",
    description: "Enhance your pattern with detailed notes, special instructions, and helpful tips. Add text between rounds for clarity.",
    tips: [
      "Include gauge information",
      "Add notes for tricky parts",
      "Specify yarn and hook requirements"
    ]
  },
  {
    icon: <PiDownload className="w-8 h-8" />,
    title: "4. Export & Share",
    description: "Export your pattern in multiple formats, including PDF. Your pattern will include all necessary details, stitch counts, and notes.",
    tips: [
      "Preview before exporting",
      "Include materials list",
      "Add difficulty level"
    ]
  }
];

const features = [
  {
    title: "Real-time Preview",
    description: "See your pattern take shape as you build it. The live preview updates instantly as you add stitches and rounds."
  },
  {
    title: "Stitch Counter",
    description: "Automatic stitch counting ensures your pattern is accurate. The system tracks increases, decreases, and total stitches per round."
  },
  {
    title: "Custom Text",
    description: "Add custom text anywhere in your pattern for special instructions, notes, or clarifications."
  },
  {
    title: "Pattern Organization",
    description: "Organize your pattern into sections, making it easy to manage complex designs."
  }
];

export default function HowItWorks() {
  return (
    <>
      <SEOHead
        title="How to Use the Pattern Builder - KnottyPatterns"
        description="Learn how to use our pattern builder to create professional crochet patterns. Step-by-step guide with tips and best practices."
        type="article"
      />

      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How to Use the Pattern Builder
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create professional crochet patterns with our easy-to-use pattern builder. Follow these steps to get started.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mr-4">
                    {step.icon}
                  </div>
                  <h2 className="text-xl font-semibold">{step.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-center text-sm text-gray-600">
                      <PiArrowRight className="w-4 h-4 mr-2 text-primary-500" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Interface Preview */}
          <div className="mb-16">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 bg-primary-600 text-white">
                <h2 className="text-2xl font-semibold">Pattern Builder Interface</h2>
              </div>
              <div className="p-6">
                <img
                  src={Mock}
                  alt="Pattern Builder Interface"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Features */}
          <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-xl text-white p-8 mb-16">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                  <PiMagicWand className="w-8 h-8" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">AI Pattern Generation</h2>
                <p className="text-primary-100 mb-6">
                  Need inspiration? Our AI can help generate pattern ideas and basic instructions. Use the AI-generated patterns as a starting point and refine them with the pattern builder.
                </p>
                <Link
                  to="/get-inspiration"
                  className="inline-flex items-center px-6 py-3 bg-white text-primary-900 rounded-xl hover:bg-primary-50 transition-colors"
                >
                  Try AI Pattern Generation
                  <PiArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your Pattern?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Start building your crochet pattern with our intuitive pattern builder.
            </p>
            <Link
              to="/pattern-builder"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
            >
              <PiPencilSimple className="w-5 h-5 mr-2" />
              Start Building
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}