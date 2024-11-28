import React from 'react';

interface ImageOverlayProps {
  children: React.ReactNode;
  image: string;
  alt: string;
  overlayOpacity?: string;
}

export default function ImageOverlay({ children, image, alt, overlayOpacity = '0.75' }: ImageOverlayProps) {
  return (
    <div className="relative">
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}