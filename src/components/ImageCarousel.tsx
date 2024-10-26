import React, { useState, useEffect } from 'react';

interface Image {
  url: string;
  alt: string;
}

interface ImageCarouselProps {
  images: Image[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={image.url}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${image.url}")`,
              backgroundBlendMode: 'overlay',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
      ))}
    </div>
  );
}