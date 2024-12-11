import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PiArrowLeft, PiStar, PiChatCircle, PiLink, PiCalendar, PiSpinner } from 'react-icons/pi';
import { supabase } from '../lib/supabase';
import type { FreePattern } from '../types/freePattern';
import SEOHead from '../components/SEOHead';
import PatternDetailAd from '../components/free-patterns/PatternDetailAd';
import { 
  formatDifficulty,
  formatCreator,
  formatDate,
  getImageUrl
} from '../utils/formatters';
import { parseArrayData } from '../utils/json-parser';

export default function FreePatternDetail() {
  const { id } = useParams<{ id: string }>();
  const [pattern, setPattern] = useState<FreePattern | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchPattern() {
      if (!id) return;

      try {
        const { data, error: fetchError } = await supabase
          .from('freepatterns')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;
        if (!data) throw new Error('Pattern not found');

        setPattern(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load pattern');
      } finally {
        setLoading(false);
      }
    }

    fetchPattern();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PiSpinner className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error || !pattern) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Pattern not found'}</p>
          <Link
            to="/free-patterns"
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            <PiArrowLeft className="w-5 h-5 mr-2" />
            Back to Patterns
          </Link>
        </div>
      </div>
    );
  }

  const { text: difficultyText, class: difficultyClass } = formatDifficulty(pattern.difficulty);
  const creator = formatCreator(pattern.creator);
  const formattedDate = formatDate(pattern.last_updated);
  const images = parseArrayData(pattern.images);
  const materials = parseArrayData(pattern.materials);
  const techniques = parseArrayData(pattern.techniques);

  return (
    <>
      <SEOHead
        title={`${pattern.name} - Free Crochet Pattern`}
        description={pattern.description || `Free crochet pattern for ${pattern.name}`}
        type="article"
      />

      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            to="/free-patterns"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
          >
            <PiArrowLeft className="w-5 h-5 mr-2" />
            Back to Patterns
          </Link>

          <PatternDetailAd />

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  {images.length > 0 ? (
                    <img
                      src={images[currentImageIndex]}
                      alt={`${pattern.name} - View ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image available
                    </div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`aspect-square rounded-lg overflow-hidden ${
                          index === currentImageIndex ? 'ring-2 ring-primary-500' : ''
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${pattern.name} - Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Pattern Details */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {pattern.name}
                </h1>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-gray-500">
                    <PiStar className="w-4 h-4 mr-1" />
                    {pattern.ratings?.average ? pattern.ratings.average.toFixed(1) : 'N/A'}
                    <span className="text-sm ml-1">
                      ({pattern.ratings?.count || 0} {pattern.ratings?.count === 1 ? 'rating' : 'ratings'})
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <PiChatCircle className="w-4 h-4 mr-1" />
                    {pattern.reviews?.length || 0} {pattern.reviews?.length === 1 ? 'review' : 'reviews'}
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    {creator.profileImage ? (
                      <img
                        src={creator.profileImage}
                        alt={creator.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-primary-600 font-medium">
                        {creator.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{creator.name}</p>
                    <p className="text-sm text-gray-500">Pattern Designer</p>
                  </div>
                </div>

                {pattern.description && (
                  <p className="text-gray-600 mb-6">{pattern.description}</p>
                )}

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-2">Difficulty</h3>
                    <div className={`inline-flex px-2 py-1 rounded-full text-sm ${difficultyClass}`}>
                      {difficultyText}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-2">Time to Complete</h3>
                    <p className="text-gray-600">{pattern.time_to_complete || 'Not specified'}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {materials.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Materials Needed</h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {materials.map((material, index) => (
                          <li key={index}>{material}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {techniques.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Techniques Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {techniques.map((technique, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                          >
                            {technique}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <PiCalendar className="w-4 h-4 mr-1" />
                      Last updated: {formattedDate}
                    </div>
                  </div>

                  <a
                    href={pattern.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                  >
                    <PiLink className="w-5 h-5 mr-2" />
                    View Pattern on Creator's Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}