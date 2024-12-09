import React from 'react';
import { PiMagnifyingGlass, PiSortAscending, PiX } from 'react-icons/pi';

interface PatternFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  subcategory: string;
  onSubcategoryChange: (value: string) => void;
  difficulty: string;
  onDifficultyChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (value: 'asc' | 'desc') => void;
}

const categories = ['All', 'Clothing', 'Amigurumi', 'Home Decor', 'Accessories'];
const subcategories = ['All', 'Cardigans', 'Gnomes', 'Blankets', 'Scarves'];
const difficulties = ['All', 'level-1', 'level-2', 'level-3'];
const sortOptions = [
  { value: 'last_updated', label: 'Last Updated' },
  { value: 'ratings', label: 'Rating' },
  { value: 'reviews', label: 'Reviews' }
];

export default function PatternFilters({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  subcategory,
  onSubcategoryChange,
  difficulty,
  onDifficultyChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
}: PatternFiltersProps) {
  const hasActiveFilters = category || subcategory || difficulty || searchTerm;

  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('');
    onSubcategoryChange('');
    onDifficultyChange('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <PiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search patterns..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <PiX className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-gray-900">Filters</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat === 'All' ? '' : cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subcategory
            </label>
            <select
              value={subcategory}
              onChange={(e) => onSubcategoryChange(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              {subcategories.map((sub) => (
                <option key={sub} value={sub === 'All' ? '' : sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff === 'All' ? '' : diff}>
                  {diff === 'All' ? diff : diff.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="mt-4 flex items-center justify-end space-x-2">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                Sort by {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            title={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
          >
            <PiSortAscending className={`w-5 h-5 transform transition-transform ${
              sortOrder === 'desc' ? 'rotate-180' : ''
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
}