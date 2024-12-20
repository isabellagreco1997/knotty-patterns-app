import React from 'react';
import { Link } from 'react-router-dom';
import { PiPackage, PiArrowRight } from 'react-icons/pi';
import SEOHead from '../components/SEOHead';
import KitCard from '../components/affiliate/KitCard';
import AffiliateDisclosure from '../components/affiliate/AffiliateDisclosure';
import { kits } from '../data/kits';

export default function CrochetKits() {
  return (
    <>
      <SEOHead
        title="Amigurumi Crochet Kits - Start Your Journey"
        description="Get started with curated amigurumi crochet kits perfect for beginners. Complete sets with everything you need to start crocheting today!"
        type="product"
      />

      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-primary-100 text-primary-800 rounded-full mb-6">
              <PiPackage className="w-5 h-5 mr-2" />
              Complete Starter Kits
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Not Ready for Creating Patterns?
              <span className="block mt-2 bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">
                Start with These Amigurumi Kits! 🧶
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get everything you need to start crocheting in one box. Perfect for beginners!
            </p>
          </div>

          <AffiliateDisclosure />

          {/* Kits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {kits.map((kit) => (
              <KitCard key={kit.id} kit={kit} />
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Create Your Own Patterns?
            </h2>
            <p className="text-gray-600 mb-8">
              Once you're comfortable with the basics, try our pattern builder to create your own designs!
            </p>
            <Link
              to="/pattern-builder"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
            >
              Try Pattern Builder
              <PiArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}