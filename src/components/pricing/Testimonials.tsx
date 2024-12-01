import React from 'react';
import { PiStar, PiStarFill } from 'react-icons/pi';

interface Testimonial {
  name: string;
  rating: number;
  text: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "KnottyPatterns has transformed how I create crochet patterns. The AI features are incredible, and the pattern builder is so intuitive. Worth every penny!",
    verified: true
  },
  {
    name: "Emily R.",
    rating: 5,
    text: "As a professional pattern designer, this tool has cut my pattern creation time in half. The AI suggestions are surprisingly accurate and helpful.",
    verified: true
  },
  {
    name: "Michael K.",
    rating: 4,
    text: "Great platform for both beginners and experienced crocheters. The pattern builder is easy to use, and the AI features add a whole new dimension to pattern creation.",
    verified: true
  }
];

export default function Testimonials() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className="text-yellow-400">
        {index < rating ? (
          <PiStarFill className="w-5 h-5" />
        ) : (
          <PiStar className="w-5 h-5" />
        )}
      </span>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
          >
            <div className="flex mb-4">
              {renderStars(testimonial.rating)}
            </div>
            <p className="text-white/90 mb-4">"{testimonial.text}"</p>
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">{testimonial.name}</span>
              {testimonial.verified && (
                <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">
                  VERIFIED PURCHASE
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}