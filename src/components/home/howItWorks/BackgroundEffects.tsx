import React from 'react';

export default function BackgroundEffects() {
  return (
    <>
      {/* Floating Emojis */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce">✨</div>
      <div className="absolute top-20 right-10 text-4xl animate-bounce delay-100">🧶</div>
      <div className="absolute bottom-10 left-1/4 text-4xl animate-bounce delay-200">🎨</div>
      <div className="absolute bottom-20 right-1/4 text-4xl animate-bounce delay-300">💫</div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary-100/50 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-secondary-100/50 rounded-full filter blur-3xl"></div>
    </>
  );
}