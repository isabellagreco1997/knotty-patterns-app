import React from 'react';
import { Link } from 'react-router-dom';
import { PiSparkle, PiArrowRight } from 'react-icons/pi';

const profileImages = [
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&h=100&auto=format&fit=crop"
];

const crochetImages = [
  {
    src: "https://images.pexels.com/photos/7585853/pexels-photo-7585853.jpeg",
    alt: "Crochet Project 1",
    className: "lg:translate-x-8 lg:translate-y-4 animate-float"
  },
  {
    src: "https://images.pexels.com/photos/10585181/pexels-photo-10585181.jpeg",
    alt: "Crochet Project 2",
    className: "lg:-translate-x-8 lg:translate-y-8 animate-float-delayed"
  },
  {
    src: "https://images.pexels.com/photos/10585328/pexels-photo-10585328.jpeg",
    alt: "Crochet Project 3",
    className: "lg:translate-x-4 lg:-translate-y-2 animate-float-slow"
  },
  {
    src: "https://images.pexels.com/photos/10585047/pexels-photo-10585047.jpeg",
    alt: "Crochet Project 4",
    className: "lg:-translate-x-4 lg:translate-y-6 animate-float"
  }
];

export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-primary-900 to-gray-900 relative overflow-hidden flex items-center pt-32 pb-20">
      {/* Animated Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px',
          animation: 'patternMove 60s linear infinite'
        }}
      />

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/30 rounded-full filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary-500/30 rounded-full filter blur-[100px] animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-500/20 rounded-full filter blur-[120px] animate-pulse delay-500"></div>

  
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white mb-8 animate-bounce">
            <PiSparkle className="w-5 h-5 mr-2" />
            Create Like Magic! ✨
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            #1 most used
            <span className="block mt-2 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 text-transparent bg-clip-text animate-gradient">
              builder tool and AI for crochet patterns
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
            Generate <span className="text-primary-300">pattern designs</span>,{' '}
            <span className="text-secondary-300">visual inspiration</span>, and{' '}
            <span className="text-accent-300">instructions</span> that help you create amazing crochet patterns.
          </p>

          {/* Floating Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {crochetImages.map((image, index) => (
              <div key={index} className={`relative group ${image.className}`}>
                <div className="aspect-square rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-0.5 shadow-xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-xl transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            to="/get-inspiration"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white rounded-xl hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transition-all transform hover:scale-105 shadow-lg group mb-12"
          >
            <PiSparkle className="w-5 h-5 mr-2" />
            Try For Free Now
            <PiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Social Proof */}
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="flex -space-x-4">
                {profileImages.map((image, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 overflow-hidden ring-2 ring-primary-500/20">
                    <img src={image} alt={`Crocheter ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-white/90 text-lg">
                Join over <span className="font-bold text-white">1,000</span> happy crocheters!
              </p>
            </div>

            {/* Marketplace Logos */}
            <div>
              <p className="text-white/80 text-sm mb-4">
                Sell your patterns on popular marketplaces:
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl transform hover:scale-105 transition-all duration-300">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Etsy_logo.svg/1280px-Etsy_logo.svg.png" alt="Etsy" className="h-6 opacity-90 hover:opacity-100 transition-opacity" />
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl transform hover:scale-105 transition-all duration-300">
                  <img src="https://style-cdn.ravelrycache.com/images/assets/features/brand-resources/primary-logo-red.svg" alt="Ravelry" className="h-6 opacity-90 hover:opacity-100 transition-opacity" />
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl transform hover:scale-105 transition-all duration-300">
                  <img src="https://image.pitchbook.com/cky0tqdVanSWLcGI0vf3nhZT57G1628684421357_200x200" alt="LoveCrafts" className="h-6 opacity-90 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}