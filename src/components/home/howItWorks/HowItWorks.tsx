import React from 'react';
import { Link } from 'react-router-dom';
import ScrollFadeIn from '../../ScrollFadeIn';
import { PiRobot, PiArrowRight } from 'react-icons/pi';
import StepCard from './StepCard';
import SectionHeader from './SectionHeader';
import BackgroundEffects from './BackgroundEffects';

const steps = [
  {
    step: 1,
    icon: "🎨",
    title: "Get Inspired",
    description: "Start with AI-generated design ideas or create your own pattern from scratch! Our AI assistant helps spark creativity! ✨",
    color: "from-rose-500 to-pink-600",
    features: [
      "AI pattern generation 🤖",
      "Design visualization 🎨",
      "Smart suggestions ✨",
      "Instant inspiration! 💫"
    ]
  },
  {
    step: 2,
    icon: "📝",
    title: "Create Magic",
    description: "Build your pattern with our fun and easy-to-use tools! Add stitches, notes, and make it perfect! 🌟",
    color: "from-violet-500 to-purple-600",
    features: [
      "Drag-and-drop builder 🎯",
      "Real-time preview ✨",
      "Auto stitch counting 🔢",
      "Pattern notes! 📝"
    ]
  },
  {
    step: 3,
    icon: "🚀",
    title: "Share & Earn",
    description: "Export your patterns, share with the world, and start earning from your creativity! 💫",
    color: "from-blue-500 to-indigo-600",
    features: [
      "Professional PDFs 📄",
      "Multiple formats 📱",
      "Sell anywhere! 💰",
      "Track success! 📈"
    ]
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-primary-50 relative overflow-hidden">
      <BackgroundEffects />
      
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader />

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-violet-500 to-blue-500 hidden md:block"></div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
            {steps.map((step, index) => (
              <ScrollFadeIn key={step.step} delay={index * 200}>
                <StepCard {...step} />
              </ScrollFadeIn>
            ))}
          </div>
        </div>

        <ScrollFadeIn delay={600}>
          <div className="text-center mt-16">
            <Link
              to="/get-inspiration"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all transform hover:scale-105 group"
            >
              <PiRobot className="w-5 h-5 mr-2" />
              Try AI Pattern Generation
              <PiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}