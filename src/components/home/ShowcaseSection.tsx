import React from 'react';
import { Link } from 'react-router-dom';
import { PiMagicWand, PiArrowRight } from 'react-icons/pi';
import Strawberry from '../../pages/strawberry.jpg';
import Fox from '../../pages/fox.jpg';
import Elephant from '../../pages/elephant.jpg';

const showcaseItems = [
  {
    prompt: "Cute baby elephant with a flower crown",
    image: Elephant,
    tags: ["Beginner-friendly", "Amigurumi", "Cute"]
  },
  {
    prompt: "Kawaii strawberry with a happy face",
    image: Strawberry,
    tags: ["Intermediate", "Food", "Kawaii"]
  },
  {
    prompt: "Small sleeping fox amigurumi",
    image: Fox,
    tags: ["Advanced", "Animals", "Realistic"]
  }
];

export default function ShowcaseSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary-400 font-semibold tracking-wide uppercase text-sm">Showcase</span>
          <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl">
            From Idea to Creation
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Transform your creative ideas into detailed crochet patterns with our AI-powered design assistant
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {showcaseItems.map((item, index) => (
            <div 
              key={index} 
              className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border border-white/10"
            >
              <div className="relative aspect-square overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <img
                  src={item.image}
                  alt={item.prompt}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <p className="text-white font-medium">
                      <span className="text-primary-400 text-sm block mb-1">Prompt:</span>
                      {item.prompt}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-primary-900/50 text-primary-300 rounded-full text-sm font-medium border border-primary-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-400">
                    <PiMagicWand className="w-4 h-4 mr-2" />
                    AI Generated Design
                  </div>
                  <Link
                    to="/get-inspiration"
                    className="text-primary-400 hover:text-primary-300 font-medium text-sm inline-flex items-center group"
                  >
                    Try it yourself
                    <PiArrowRight className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Each design is generated with AI assistance and refined through human expertise. 
            Start with AI-generated suggestions and make them your own.
          </p>
          <Link
            to="/get-inspiration"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
          >
            Try AI Pattern Generation
            <PiArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}