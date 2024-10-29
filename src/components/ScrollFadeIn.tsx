import React, { useEffect, useRef } from 'react';

interface ScrollFadeInProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export default function ScrollFadeIn({ 
  children, 
  direction = 'up', 
  delay = 0,
  className = '' 
}: ScrollFadeInProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  const getTransformInitial = () => {
    switch (direction) {
      case 'up': return 'translate3d(0, 50px, 0)';
      case 'down': return 'translate3d(0, -50px, 0)';
      case 'left': return 'translate3d(50px, 0, 0)';
      case 'right': return 'translate3d(-50px, 0, 0)';
      default: return 'translate3d(0, 0, 0)';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`opacity-0 ${className}`}
      style={{
        transform: getTransformInitial(),
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {children}
    </div>
  );
}