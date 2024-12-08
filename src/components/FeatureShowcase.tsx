import React from 'react';
import { Link } from 'react-router-dom';
import { PiPencilSimple, PiMagicWand, PiDownload, PiDevices, PiSparkle } from 'react-icons/pi';
import Mock from '../../public/mock.png';

const features = [
  {
    icon: <PiMagicWand className="w-6 h-6" />,
    title: "AI Magic! ✨",
    description: "Get instant inspiration and pattern suggestions with our AI assistant! 🤖",
    color: "from-rose-500 to-pink-600"
  },
  {
    icon: <PiDevices className="w-6 h-6" />,
    title: "Real-time Preview 🎯",
    description: "Watch your pattern come to life as you create! Perfect every stitch! ✨",
    color: "from-violet-500 to-purple-600"
  },
  {
    icon: <PiDownload className="w-6 h-6" />,
    title: "Export Anywhere! 🚀",
    description: "Share your patterns in multiple formats! Sell on any platform! 💫",
    color: "from-blue-500 to-indigo-600"
  }
];

export default function FeatureShowcase() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px',
          animation: 'patternMove 60s linear infinite'
        }}
      />

      {/* Floating Emojis */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce">✨</div>
      <div className="absolute top-20 right-10 text-4xl animate-bounce delay-100">🧶</div>
      <div className="absolute bottom-10 left-1/4 text-4xl animate-bounce delay-200">🎨</div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white mb-6">
            <PiSparkle className="w-5 h-5 mr-2" />
            Create Like Magic! ✨
          </div>
          <h2 className="mt-2 text-5xl font-bold text-white sm:text-6xl mb-6">
            Create Beautiful Patterns
            <span className="block mt-2 bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">
              With Pure Magic! ✨
            </span>
          </h2>
          <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
            Our intuitive pattern builder helps you create professional-quality patterns in minutes, not hours! 🚀
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Pattern Builder Preview */}
          <div className="relative mx-auto max-w-2xl lg:max-w-none order-2 lg:order-1">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="relative w-full aspect-square bg-gray-50">
                <img
                  src={Mock}
                  alt="Pattern Builder Interface"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Decorative Glows */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary-500/30 rounded-full filter blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-secondary-500/30 rounded-full filter blur-3xl"></div>
          </div>

          {/* Features List */}
          <div className="space-y-8 order-1 lg:order-2">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/80">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/pattern-builder"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all transform hover:scale-105 group"
            >
              <PiPencilSimple className="w-5 h-5 mr-2" />
              Try Pattern Builder
              <span className="ml-2 group-hover:translate-x-1 transition-transform">✨</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}