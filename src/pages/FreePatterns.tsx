
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PiSpinner, PiSparkle, PiMagicWand, PiHeart, PiCaretLeft, PiCaretRight } from 'react-icons/pi';
import SEOHead from '../components/SEOHead';
import PatternCard from '../components/free-patterns/PatternCard';
import PromoCard from '../components/free-patterns/PromoCard';
import PatternFilters from '../components/free-patterns/PatternFilters';
import { useFreePatterns } from '../hooks/useFreePatterns';
import type { FreePatternFilters } from '../types/freePattern';
import Breadcrumbs from '../components/free-patterns/Breadcrumbs';

const ITEMS_PER_PAGE = 32;

export default function FreePatterns() {
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [sortBy, setSortBy] = useState('last_updated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  const filters: FreePatternFilters = {
    category,
    subcategory,
    difficulty,
    searchTerm: searchTerm.trim(),
    sortBy: sortBy as 'ratings' | 'reviews' | 'last_updated',
    sortOrder
  };

  const { patterns, loading, error, totalCount } = useFreePatterns(filters);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, subcategory, difficulty, sortBy, sortOrder]);

  // Calculate pagination
  const totalPages = Math.ceil((patterns?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPatterns = patterns.slice(startIndex, endIndex);

  // Pagination Controls
  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];
      let l;

      for (let i = 1; i <= totalPages; i++) {
        if (
          i === 1 ||
          i === totalPages ||
          (i >= currentPage - delta && i <= currentPage + delta)
        ) {
          range.push(i);
        }
      }

      range.forEach(i => {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push(null);
          }
        }
        rangeWithDots.push(i);
        l = i;
      });

      return rangeWithDots;
    };

    return (
      <nav className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PiCaretLeft className="w-5 h-5" />
        </button>

        {getVisiblePages().map((page, index) => 
          page === null ? (
            <span key={`ellipsis-${index}`} className="px-2">...</span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-primary-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PiCaretRight className="w-5 h-5" />
        </button>
      </nav>
    );
  };

  const breadcrumbItems = [
    { label: 'Free Patterns' }
  ];

  return (
    <>
      <SEOHead
        title="Free Crochet Patterns Directory"
        description="Discover a curated collection of free crochet patterns from around the web. Find your next project from our handpicked selection!"
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">

        <div className="max-w-7xl mx-auto px-4">
        <Breadcrumbs items={breadcrumbItems} />

          {/* Header */}
          <div className="text-center mb-16 relative">
            <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full text-primary-800 mb-6">
              <PiSparkle className="w-5 h-5 mr-2" />
              Discover Free Crochet Patterns! ✨
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Free Crochet Pattern Directory
              <span className="block mt-2 bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">
                Your Next Project Awaits! 🌟
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Explore our collection of {totalCount} handpicked free crochet patterns from talented creators around the web!
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-start space-x-3">
              <PiMagicWand className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div className="text-sm text-gray-600 text-left">
                <p className="font-medium text-primary-800 mb-2">
                  ✨ Pattern Directory Notice
                </p>
                <p>
                  These patterns are curated from various creators across the web. 
                  While not created by KnottyPatterns, we've organized them here to help you 
                  discover amazing free crochet patterns more easily! Each pattern links to the 
                  original creator's website.
                </p>
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
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PromoCard />
                {currentPatterns.map((pattern) => (
                  <PatternCard key={pattern.id} pattern={pattern} />
                ))}
              </div>
              {renderPagination()}
            </>
          )}
        </div>
      </div>
    </>
  );
}