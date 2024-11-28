import React from 'react';

interface HighlightedTextProps {
  text: string;
  highlight: string;
}

export default function HighlightedText({ text, highlight }: HighlightedTextProps) {
  const parts = text.split(highlight);
  return (
    <span>
      {parts[0]}
      <span className="relative inline-block">
        <span className="relative z-10 text-primary-300 font-semibold">{highlight}</span>
        <span className="absolute inset-0 bg-primary-600/20 rounded-lg backdrop-blur-sm -skew-x-6 transform scale-110" />
      </span>
      {parts[1]}
    </span>
  );
}