import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiBook, PiArrowRight, PiRuler, PiStar, PiMagnifyingGlass, PiSliders } from 'react-icons/pi';
import SEOHead from '../components/SEOHead';
import { stitchData } from '../data/stitchData';
import Breadcrumbs from '../components/free-patterns/Breadcrumbs';

type Difficulty = 'all' | 'beginner' | 'intermediate' | 'advanced';
type Category = 'all' | string;

export default function StitchGlossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  // Get unique categories
  const categories = ['all', ...new Set(stitchData.map(stitch => stitch.category))];

  // Filter stitches based on search, difficulty, and category
  const filteredStitches = stitchData.filter(stitch => {
    const matchesSearch = stitch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stitch.abbreviation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || stitch.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || stitch.category === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  // Group stitches by category
  const stitchCategories = filteredStitches.reduce((acc, stitch) => {
    if (!acc[stitch.category]) {
      acc[stitch.category] = [];
    }
    acc[stitch.category].push(stitch);
    return acc;
  }, {} as Record<string, typeof stitchData>);

  const breadcrumbItems = [
    { label: 'Crochet Stitch Glossary' }
  ];

  return (
    <>
      <SEOHead 
        title="Crochet Stitch Glossary"
        description="Learn about different crochet stitches, from basic to advanced. Detailed instructions, tips, and video tutorials for each stitch."
        type="article"
      />

      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
      

        <div className="max-w-7xl mx-auto px-4">
        <Breadcrumbs items={breadcrumbItems} />
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Crochet Stitch Glossary
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn about different crochet stitches, from basic to advanced. Each stitch includes detailed instructions, tips, and video tutorials.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <PiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search stitches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Difficulty Filter */}
              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Difficulties</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-gray-600">
            Found {filteredStitches.length} {filteredStitches.length === 1 ? 'stitch' : 'stitches'}
          </div>

          <div className="space-y-16">
            {Object.entries(stitchCategories).map(([categoryName, stitches]) => (
              <div key={categoryName}>
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <PiBook className="w-6 h-6 mr-2 text-primary-600" />
                  {categoryName}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stitches.map((stitch) => (
                    <Link
                      key={stitch.slug}
                      to={`/stitch/${stitch.slug}`}
                      className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {stitch.name}
                          </h3>
                          <p className="text-sm text-primary-600 font-mono">
                            {stitch.abbreviation}
                          </p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          stitch.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                          stitch.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {stitch.difficulty}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {stitch.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <PiRuler className="w-4 h-4 mr-1" />
                          {stitch.height}
                        </div>
                        <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-1 transition-transform">
                          Learn More
                          <PiArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}