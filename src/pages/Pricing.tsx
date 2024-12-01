import React from 'react';
import PricingCards from '../components/PricingCards';
import FAQ from '../components/pricing/FAQ';
import Testimonials from '../components/pricing/Testimonials';
import SEOHead from '../components/SEOHead';

export default function Pricing() {
  return (
    <>
      <SEOHead 
        title="Pricing Plans - KnottyPatterns"
        description="Choose the perfect plan for your crochet journey. Free and premium options available with features like unlimited patterns, PDF export, and more."
        type="product"
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "KnottyPatterns Premium",
          "description": "Premium crochet pattern creation tools",
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "0",
            "highPrice": "8",
            "priceCurrency": "USD",
            "offerCount": "2"
          }
        }}
      />

      <div className="min-h-screen">
        {/* Pricing Section */}
        <div className="py-20 bg-gradient-to-b from-primary-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the perfect plan for your crochet journey. All plans include access to our pattern builder and basic features.
              </p>
            </div>

            <PricingCards />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <FAQ />
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">What Our Users Say</h2>
            <Testimonials />
          </div>
        </div>
      </div>
    </>
  );
}