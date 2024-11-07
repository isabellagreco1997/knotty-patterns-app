import React, { useState, useEffect, useCallback } from 'react';
import { PiCaretLeft, PiCaretRight, PiPause, PiPlay } from 'react-icons/pi';

interface Image {
  url: string;
  alt: string;
}

interface ImageCarouselProps {
  images: Image[];
  children?: React.ReactNode;
}

export default function ImageCarousel({ images, children }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const goToNext = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((current) => (current + 1) % images.length);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  }, [images.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((current) => (current - 1 + images.length) % images.length);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  }, [images.length, isTransitioning]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
      setTouchStart(null);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(goToNext, 6000);
    }
    return () => clearInterval(interval);
  }, [goToNext, isPaused]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={image.url}
          className={`absolute inset-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.45,0.05,0.55,0.95)] ${
            index === currentIndex 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-110'
          }`}
          aria-hidden={index !== currentIndex}
        >
          {/* Main Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[1.5s] ease-[cubic-bezier(0.45,0.05,0.55,0.95)]"
            style={{
              backgroundImage: `url("${image.url}")`,
              transform: isTransitioning ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          
          {/* Animated Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-10 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px',
              animation: 'patternMove 60s linear infinite',
            }}
          />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 sm:px-8 pointer-events-none">
        <button
          onClick={goToPrevious}
          className="group p-2 sm:p-3 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 transform hover:scale-110 pointer-events-auto"
          aria-label="Previous slide"
        >
          <PiCaretLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform group-hover:-translate-x-1" />
        </button>
        <button
          onClick={goToNext}
          className="group p-2 sm:p-3 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 transform hover:scale-110 pointer-events-auto"
          aria-label="Next slide"
        >
          <PiCaretRight className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 inset-x-0 flex flex-col items-center space-y-4">
        {/* Slide Indicators */}
        <div className="flex items-center space-x-3 px-4 py-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'w-12 h-1.5 bg-white'
                  : 'w-3 h-1.5 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-all duration-300"
          aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
        >
          {isPaused ? (
            <PiPlay className="w-4 h-4 text-white" />
          ) : (
            <PiPause className="w-4 h-4 text-white" />
          )}
        </button>
      </div>

      {/* Progress Bar */}
      {!isPaused && (
        <div className="absolute bottom-0 left-0 w-full h-0.5">
          <div className="relative w-full h-full bg-white/20">
            <div
              className="absolute top-0 left-0 h-full bg-white/80 transition-all duration-[6000ms] ease-linear"
              style={{
                width: '100%',
                transform: isTransitioning ? 'scaleX(0)' : 'scaleX(1)',
                transformOrigin: 'left',
              }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes patternMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </div>
  );
}