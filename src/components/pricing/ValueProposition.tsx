import React from 'react';
import { PiSparkle } from 'react-icons/pi';

const benefits = [
  {
    icon: "✨",
    title: "Create Like Magic!",
    description: "Say goodbye to messy spreadsheets! Our super-fun pattern builder makes creating patterns as easy as 1-2-3! 🎯",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: "🤖",
    title: "AI Magic Assistant!",
    description: "Writer's block? No problem! Our AI assistant is like having a creative genius by your side 24/7! ⚡️",
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    icon: "📈",
    title: "Grow Your Shop!",
    description: "Create stunning patterns in half the time! Perfect for Etsy, Ravelry, or your own amazing shop! 🌟",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: "💎",
    title: "Turn Passion to Profit!",
    description: "Your creativity deserves to shine (and earn)! Create pro patterns that your customers will love! 💝",
    gradient: "from-emerald-500 to-teal-500"
  }
];

const funFacts = [
  { number: "500+", text: "Happy Creators", emoji: "🎨" },
  { number: "1000+", text: "Patterns", emoji: "📝" },
  { number: "24/7", text: "AI Magic", emoji: "🤖" }
];

const features = [
  { emoji: "🚀", text: "No more pattern headaches!" },
  { emoji: "🎨", text: "AI design magic!" },
  { emoji: "💫", text: "Pro-quality PDFs!" },
  { emoji: "🎯", text: "All patterns in one place!" }
];

export default function ValueProposition() {
  return (
    <div className="py-12 md:py-20 bg-gradient-to-b from-white to-primary-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 relative">
          <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-white mb-6 animate-pulse text-sm md:text-base">
            <PiSparkle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Let's Make Magic! 🎉
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Ready to Create? 
            <span className="block mt-2 bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">
              Let's Get Started! ✨
            </span>
          </h2>
          <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Join our magical community of pattern creators! 🌈
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 relative">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 border border-gray-100 relative overflow-hidden"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white relative transform group-hover:rotate-12 transition-transform">
                    <span className="text-xl md:text-2xl">{benefit.icon}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-700 transition-colors">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fun Facts */}
        <div className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-8">
          {funFacts.map((fact, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text mb-2">
                {fact.number}
              </div>
              <div className="text-sm md:text-lg">
                {fact.emoji} {fact.text}
              </div>
            </div>
          ))}
        </div>

        {/* Features List */}
        <div className="mt-12 md:mt-16 bg-gradient-to-r from-primary-600 to-secondary-500 text-white rounded-2xl p-6 md:p-12 shadow-xl transform hover:scale-[1.02] transition-transform">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-4xl md:text-5xl mb-4 block animate-bounce">🌟</span>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Your Creative Journey Starts Here! 🚀
            </h3>
            <p className="text-base md:text-xl text-white/90 mb-8">
              Stop struggling with pattern creation - let's make it fun! ✨
            </p>
            <ul className="text-left space-y-4 md:space-y-6 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center transform hover:-translate-x-2 transition-transform">
                  <span className="w-8 h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-lg md:text-xl">
                    {feature.emoji}
                  </span>
                  <span className="text-white/90 text-sm md:text-lg">{feature.text}</span>
                </li>
              ))}
            </ul>
            <div className="text-base md:text-lg text-white/90 mt-8 font-medium">
              Join our magical community today! 🌈✨
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}