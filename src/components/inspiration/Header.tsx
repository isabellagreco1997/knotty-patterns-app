import React from 'react';
import SEOHead from '../SEOHead';

export function Header() {
  return (
    <>
      <SEOHead
        title="Get AI Inspiration - Generate Crochet Ideas"
        description="Generate unique crochet and amigurumi design ideas using AI. Get inspired for your next project with our AI-powered image generator."
        type="website"
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get AI Inspiration</h1>
        <p className="text-xl text-gray-600">
          Generate unique crochet and amigurumi designs using AI
        </p>
      </div>
    </>
  );
}
