import React from 'react';
import { Link } from 'react-router-dom';
import { PiMagicWand, PiArrowRight, PiCheck, PiSparkle, PiPencilSimple } from 'react-icons/pi';
import Strawberry from '../../pages/strawberry.jpg';
import Fox from '../../pages/fox.jpg';
import Elephant from '../../pages/elephant.jpg';

export default function PatternGeneratorHero() {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden md:m-20 m-6">
      <div className="grid lg:grid-cols-2 gap-8 p-8 md:p-12">
        {/* Left Column - Content */}
        <div className="space-y-8">
          <div>
            <div className="text-rose-500 font-medium mb-4">AI-Powered Design Inspiration</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Inspired with AI Magic
            </h2>
            <p className="text-lg text-gray-600">
              Spark your creativity with AI-generated design ideas. Get visual inspiration and pattern suggestions, then use our pattern builder to craft your perfect pattern.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'AI-generated design visualization',
              'Pattern suggestions as starting points',
              'Refine in pattern builder',
              'Full creative control',
              'Human expertise + AI assistance'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <PiCheck className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <Link
            to="/get-inspiration"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <PiMagicWand className="w-5 h-5 mr-2" />
            Try AI Assistant
            <PiArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Right Column - Generator Interface */}
        <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
          {/* Inspiration Input */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe your crochet idea
            </label>
            <div className="space-y-4">
              <textarea
                placeholder="e.g., A cute baby elephant with a flower crown"
                className="w-full p-2 border border-gray-200 rounded-lg h-24"
              />
              <button className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
                <PiSparkle className="w-5 h-5 mr-2" />
                Get Inspiration
              </button>
            </div>
          </div>

          {/* AI Generated Preview */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4">AI Generated Inspiration</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="aspect-square bg-gray-100 rounded-lg"><img src={Fox} /></div>
                <p className="text-sm text-gray-500 text-center">Visual Design</p>
              </div>
              <div className="space-y-2">
                <div className="aspect-square bg-gray-100 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    <div className="h-2 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 text-center">Pattern Suggestion</p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ready to create your pattern?</span>
                <button className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm">
                  <PiPencilSimple className="w-4 h-4 mr-2" />
                  Open in Pattern Builder
                </button>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-2">
              <PiSparkle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                AI suggestions are starting points. Use your expertise to refine and perfect the pattern in our pattern builder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}