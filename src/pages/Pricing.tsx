import React from 'react';
import { useLocation } from 'react-router-dom';
import PricingCards from '../components/PricingCards';
import SEOHead from '../components/SEOHead';
import BaseLayout from '../components/layouts/BaseLayout';

export default function Pricing() {
  const location = useLocation();
  const hideNavbar = location.search.includes('redirect=');

  return (
    <BaseLayout hideNavbar={hideNavbar}>
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
      <div className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your crochet journey. All plans include access to our pattern builder and basic features.
            </p>
          </div>

          <PricingCards />

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto grid gap-6 mt-8">
              <div className="text-left">
                <h3 className="text-lg font-medium text-gray-900">Can I switch plans later?</h3>
                <p className="mt-2 text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-medium text-gray-900">What payment methods do you accept?</h3>
                <p className="mt-2 text-gray-600">We accept all major credit cards, PayPal, and Apple Pay.</p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-medium text-gray-900">Is there a contract or commitment?</h3>
                <p className="mt-2 text-gray-600">No, all plans are month-to-month and you can cancel anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}