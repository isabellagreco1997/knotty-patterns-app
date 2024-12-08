import React from 'react';
import SEOHead from '../components/SEOHead';
import Hero from '../components/pricing/Hero';
import PricingCards from '../components/PricingCards';
import ValueProposition from '../components/pricing/ValueProposition';
import Features from '../components/pricing/Features';
import FAQ from '../components/pricing/FAQ';
import Testimonials from '../components/pricing/Testimonials';
import CallToAction from '../components/pricing/CallToAction';

export default function Pricing() {
  return (
    <>
      <SEOHead 
        title="Pricing - KnottyPatterns"
        description="Get unlimited access to all KnottyPatterns features including AI pattern generation, PDF exports, and priority support."
        type="product"
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "KnottyPatterns Premium",
          "description": "Premium crochet pattern creation tools",
          "offers": {
            "@type": "Offer",
            "price": "8",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        }}
      />

      <div className="min-h-screen">
        <Hero />
        <PricingCards />
        <ValueProposition />
        <Features />
        <Testimonials />
        <FAQ />
        <CallToAction />
      </div>
    </>
  );
}