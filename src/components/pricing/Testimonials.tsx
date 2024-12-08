import React from 'react';
import { PiQuotes, PiStar, PiSparkle } from 'react-icons/pi';

const testimonials = [
  {
    quote: "KnottyPatterns is a game-changer! The AI helps me create patterns so quickly, and my Etsy shop is thriving! 🚀",
    author: "Sarah M.",
    role: "Professional Pattern Designer",
    image: "https://images.unsplash.com/photo-1723856001946-3b53c9fe3bc9",
    rating: 5,
    earnings: "$2,400/month",
    emoji: "💫"
  },
  {
    quote: "I was skeptical about AI, but wow! It's like having a creative partner. My patterns are selling better than ever! ✨",
    author: "Emily R.",
    role: "Indie Crochet Artist",
    image: "https://images.unsplash.com/photo-1491349174775-aaafddd81942",
    rating: 5,
    earnings: "$1,800/month",
    emoji: "🌟"
  },
  {
    quote: "The pattern builder is so fun to use! I've created 20+ patterns and my customers love them! 🎯",
    author: "Michael K.",
    role: "Amigurumi Artist",
    image: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&q=80&w=100",
    rating: 5,
    earnings: "$3,200/month",
    emoji: "✨"
  }
];

export default function Testimonials() {
  return (
    <div className="py-20 bg-primary-900 relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Floating Emojis */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce">✨</div>
      <div className="absolute top-20 right-10 text-4xl animate-bounce delay-100">💫</div>
      <div className="absolute bottom-10 left-1/4 text-4xl animate-bounce delay-200">🌟</div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white mb-6">
            <PiSparkle className="w-5 h-5 mr-2" />
            Success Stories! 🌟
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Creators Love KnottyPatterns! 
            <span className="block mt-2 text-primary-300">
              See What's Possible! ✨
            </span>
          </h2>
          <p className="text-xl text-primary-200 max-w-3xl mx-auto">
            Join our amazing community of successful pattern creators! 🚀
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center transform -rotate-12">
                <PiQuotes className="w-4 h-4 text-white" />
              </div>

              {/* Emoji Decoration */}
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                {testimonial.emoji}
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <PiStar key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/90 mb-6 text-lg">
                {testimonial.quote}
              </p>

              {/* Author Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-500"
                />
                <div className="ml-4">
                  <div className="font-semibold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-primary-300 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Earnings Badge */}
              <div className="absolute top-4 right-4 bg-primary-500/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-primary-300 text-sm font-medium">
                  {testimonial.earnings}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="text-4xl font-bold text-primary-300 mb-2 sm:text-sm text-lg">500+</div>
            <div className="text-white">Happy Creators 🎨</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-4xl font-bold text-primary-300 mb-2 sm:text-sm text-lg">1000+</div>
            <div className="text-white">Patterns Created 📝</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-4xl font-bold text-primary-300 mb-2 sm:text-sm text-lg">24/7</div>
            <div className="text-white ">AI Assistant 🤖</div>
          </div>
        </div>
      </div>
    </div>
  );
}