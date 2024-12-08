import React from 'react';
import { Link } from 'react-router-dom';
import { PiArrowRight, PiSparkle } from 'react-icons/pi';
import Strawberry from '../../pages/strawberry.jpg';
import Fox from '../../pages/fox.jpg';
import Elephant from '../../pages/elephant.jpg';

const showcaseItems = [
  {
    prompt: "Cute baby elephant with a flower crown 🌸",
    image: Elephant
  },
  {
    prompt: "Kawaii strawberry with a happy face 🍓",
    image: Strawberry
  },
  {
    prompt: "Small sleeping fox amigurumi 🦊",
    image: Fox
  }
];

export default function ShowcaseSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
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
      <div className="absolute top-20 right-10 text-4xl animate-bounce delay-100">🎨</div>
      <div className="absolute bottom-10 left-1/4 text-4xl animate-bounce delay-200">🌟</div>
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white mb-6">
            <PiSparkle className="w-5 h-5 mr-2" />
            From Idea to Reality! ✨
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            See What's Possible
            <span className="block mt-2 bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">
              With AI-Powered Magic! 🌟
            </span>
          </h2>
        </div>

        {/* Showcase Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {showcaseItems.map((item, index) => (
            <div 
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 border border-white/10"
            >
              <div className="relative aspect-square overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
                <img
                  src={item.image}
                  alt={item.prompt}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-white font-medium">
                      <span className="text-primary-200 text-sm block mb-1">Prompt:</span>
                      {item.prompt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Link
            to="/get-inspiration"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all transform hover:scale-105 group"
          >
            <PiSparkle className="w-5 h-5 mr-2" />
            Try AI Pattern Generation
            <PiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}