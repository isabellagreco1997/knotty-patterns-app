import React, { useState } from 'react';
import { PiSpinner, PiSparkle, PiMagicWand, PiHeart } from 'react-icons/pi';
import SEOHead from '../components/SEOHead';
import PatternCard from '../components/free-patterns/PatternCard';
import PatternFilters from '../components/free-patterns/PatternFilters';
import PromoCard from '../components/free-patterns/PromoCard';
import { useFreePatterns } from '../hooks/useFreePatterns';
import type { FreePatternFilters } from '../types/freePattern';
import Breadcrumbs from '../components/free-patterns/Breadcrumbs';

export default function FreePatterns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [sortBy, setSortBy] = useState('last_updated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filters: FreePatternFilters = {
    category,
    subcategory,
    difficulty,
    searchTerm: searchTerm.trim(),
    sortBy: sortBy as 'ratings' | 'reviews' | 'last_updated',
    sortOrder
  };

  const { patterns, loading, error, totalCount } = useFreePatterns(filters);

  // Prepare grid items with PromoCard first
  const gridItems = [
    <PromoCard key="promo" />,
    ...(patterns || []).map((pattern) => (
      <PatternCard key={pattern.id} pattern={pattern} />
    ))
  ];

  return (
    <>
     <SEOHead 
  title="Free Crochet Patterns Directory | KnottyPatterns"
  description="Browse our curated collection of free crochet patterns. Find amigurumi, blankets, clothing, accessories and more. Perfect for beginners and experienced crocheters."
  type="website"
  schema={{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Crochet Patterns Directory",
    "description": "Browse our curated collection of free crochet patterns",
    "numberOfItems": totalCount,
  }}
/>


      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
  <Breadcrumbs />
  {/* Rest of the content */}
</div>
        <div className="max-w-7xl mx-auto px-4">
          {/* Fun Header Section */}
          <div className="text-center mb-16 relative">
            {/* Floating Emojis */}
            <div className="absolute top-0 left-1/4 text-4xl animate-bounce delay-100">🧶</div>
            <div className="absolute top-12 right-1/4 text-4xl animate-bounce delay-200">✨</div>
            <div className="absolute bottom-0 left-1/3 text-4xl animate-bounce delay-300">🎨</div>

            <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full text-primary-800 mb-6">
              <PiSparkle className="w-5 h-5 mr-2" />
              Discover Free Patterns! ✨
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Free Crochet Pattern Directory
              <span className="block mt-2 bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">
                Your Next Project Awaits! 🌟
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Explore our collection of {totalCount} handpicked free patterns from talented creators around the web!
            </p>

            {/* Disclaimer Box */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-start space-x-3">
                <PiMagicWand className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <div className="text-sm text-gray-600 text-left">
                  <p className="font-medium text-primary-800 mb-2">
                    ✨ Pattern Directory Notice
                  </p>
                  <p>
                    These patterns are curated from various creators across the web. While not created by KnottyPatterns, 
                    we've organized them here to help you discover amazing free patterns more easily! 
                    Each pattern links to the original creator's website.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-primary-600 mb-1">{totalCount}</div>
                <div className="text-sm text-gray-600">Free Patterns</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  <PiHeart className="w-6 h-6 mx-auto" />
                </div>
                <div className="text-sm text-gray-600">Curated with Love</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-primary-600 mb-1">100%</div>
                <div className="text-sm text-gray-600">Free Forever</div>
              </div>
            </div>
          </div>

          <PatternFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            category={category}
            onCategoryChange={setCategory}
            subcategory={subcategory}
            onSubcategoryChange={setSubcategory}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <PiSpinner className="w-8 h-8 animate-spin text-primary-600" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : patterns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No patterns found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridItems}
            </div>
          )}
        </div>
      </div>
    </>
  );
}