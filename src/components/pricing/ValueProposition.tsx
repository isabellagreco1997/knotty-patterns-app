import React from 'react';
import { PiPencilSimple, PiRobot, PiChartLineUp, PiCurrencyDollar, PiSparkle, PiStar } from 'react-icons/pi';

const benefits = [
  {
    icon: <PiPencilSimple className="w-6 h-6" />,
    emoji: "✨",
    title: "Create Like Magic! ✨",
    description: "Say goodbye to messy spreadsheets! Our super-fun pattern builder makes creating patterns as easy as 1-2-3! 🎯",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: <PiRobot className="w-6 h-6" />,
    emoji: "🤖",
    title: "AI Magic at Your Fingertips! 🪄",
    description: "Writer's block? No problem! Our AI assistant is like having a creative genius by your side 24/7! ⚡️",
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    icon: <PiChartLineUp className="w-6 h-6" />,
    emoji: "📈",
    title: "Watch Your Shop Grow! 🚀",
    description: "Create stunning patterns in half the time! Perfect for Etsy, Ravelry, or your own amazing shop! 🌟",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <PiCurrencyDollar className="w-6 h-6" />,
    emoji: "💎",
    title: "Turn Passion into Profit! 💫",
    description: "Your creativity deserves to shine (and earn)! Create pro patterns that your customers will absolutely love! 💝",
    gradient: "from-emerald-500 to-teal-500"
  }
];

const features = [
  { emoji: "🚀", text: "No more pattern headaches - our builder makes it fun!" },
  { emoji: "🎨", text: "Get amazing design ideas from our AI friend!" },
  { emoji: "💫", text: "Create gorgeous PDFs your customers will love" },
  { emoji: "🎯", text: "Keep all your awesome patterns in one magical place" }
];

const funFacts = [
  { number: "1000+", text: "Happy Creators", emoji: "🎨" },
  { number: "50,000+", text: "Patterns Created", emoji: "📝" },
  { number: "24/7", text: "AI Assistant", emoji: "🤖" },
];

export default function ValueProposition() {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-primary-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 left-1/4 w-8 h-8 text-2xl animate-bounce">🧶</div>
          <div className="absolute top-0 right-1/4 w-8 h-8 text-2xl animate-bounce delay-100">✨</div>
          <div className="absolute -top-5 left-1/2 w-8 h-8 text-2xl animate-bounce delay-200">💫</div>

          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-white mb-6 animate-pulse">
            <PiStar className="w-5 h-5 mr-2" />
            Let's Make Pattern Creation Fun! 🎉
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Ready to Make Your Crochet Dreams Come True? 
            <span className="block mt-2 bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">
              Let's Create Magic Together! ✨
            </span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Join our amazing community of creative crocheters and turn your passion into incredible patterns! 🌈
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Floating decorative elements */}
          <div className="absolute -left-10 top-1/3 text-4xl animate-bounce">🧶</div>
          <div className="absolute -right-10 top-2/3 text-4xl animate-bounce delay-150">✨</div>

          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                   style={{backgroundImage: `linear-gradient(to right, ${benefit.gradient})`}}></div>
              <div className="flex items-start relative z-10">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white relative transform group-hover:rotate-12 transition-transform">
                    {benefit.icon}
                    <span className="absolute -top-2 -right-2 text-2xl animate-bounce" role="img" aria-label="emoji">
                      {benefit.emoji}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fun Facts Section */}
        <div className="mt-16 grid grid-cols-3 gap-8">
          {funFacts.map((fact, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text mb-2">
                {fact.number}
              </div>
              <div className="text-lg">
                {fact.emoji} {fact.text}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-500 text-white rounded-2xl p-8 md:p-12 shadow-xl transform hover:scale-[1.02] transition-transform">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-5xl mb-4 block animate-bounce">🌟</span>
            <h3 className="text-3xl font-bold mb-4">
              Your Pattern Creation Adventure Starts Here! 🚀
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Stop struggling with pattern creation - let's make it fun and magical! ✨
            </p>
            <ul className="text-left space-y-6 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center transform hover:-translate-x-2 transition-transform">
                  <span className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-xl">
                    {feature.emoji}
                  </span>
                  <span className="text-white/90 text-lg">{feature.text}</span>
                </li>
              ))}
            </ul>
            <div className="text-lg text-white/90 mt-8 font-medium">
              Join our magical community of pattern creators! 🌈✨
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}