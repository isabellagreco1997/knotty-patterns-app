import React from 'react';
import { PiSparkle, PiShoppingCart, PiStar } from 'react-icons/pi';
import type { CrochetKit } from '../../types/affiliate';

interface KitCardProps {
  kit: CrochetKit;
}

export default function KitCard({ kit }: KitCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="aspect-square overflow-hidden">
        <img
          src={kit.image}
          alt={kit.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
          kit.difficulty === 'beginner' 
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {kit.difficulty.charAt(0).toUpperCase() + kit.difficulty.slice(1)} Friendly
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">{kit.name}</h2>
        <p className="text-gray-600 mb-4">{kit.description}</p>

        <div className="flex items-center mb-4">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <PiStar
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(kit.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {kit.rating} ({kit.reviews} reviews)
          </span>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-2">Kit Includes:</h3>
          <ul className="space-y-2">
            {kit.includes.map((item, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <PiSparkle className="w-4 h-4 text-primary-500 mr-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            ${kit.price}
          </div>
          <a
            href={kit.affiliateLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <PiShoppingCart className="w-5 h-5 mr-2" />
            View on Amazon
          </a>
        </div>
      </div>
    </div>
  );
}