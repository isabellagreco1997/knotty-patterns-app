import React from 'react';
import { Link } from 'react-router-dom';
import { PiStar, PiChatCircle, PiArrowRight, PiCalendar } from 'react-icons/pi';
import type { FreePattern } from '../../types/freePattern';
import { 
  formatDifficulty,
  formatCreator,
  formatDate,
  getImageUrl
} from '../../utils/formatters';

interface PatternCardProps {
  pattern: FreePattern;
}

export default function PatternCard({ pattern }: PatternCardProps) {
  const { text: difficultyText, class: difficultyClass } = formatDifficulty(pattern.difficulty);
  const imageUrl = getImageUrl(pattern.images);
  const creator = formatCreator(pattern.creator);
  const formattedDate = formatDate(pattern.last_updated);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="aspect-square overflow-hidden relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={pattern.name}
            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center text-white text-sm">
            <PiCalendar className="w-4 h-4 mr-1" />
            {formattedDate}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {pattern.name}
            </h3>
            <p className="text-sm text-gray-500">
              by {creator.name}
            </p>
          </div>
        </div>

        {pattern.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {pattern.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyClass}`}>
            {difficultyText}
          </div>
          <div className="text-sm text-gray-500">
            {pattern.category} / {pattern.subcategory}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <PiStar className="w-4 h-4 mr-1" />
            {pattern.ratings?.average ? pattern.ratings.average.toFixed(1) : 'N/A'}
          </div>
          <div className="flex items-center">
            <PiChatCircle className="w-4 h-4 mr-1" />
            {pattern.reviews?.length || 0}
          </div>
        </div>

        <Link
          to={`/free-patterns/${pattern.id}`}
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          View Pattern
          <PiArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}