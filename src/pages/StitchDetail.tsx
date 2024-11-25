import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PiArrowLeft, PiYoutubeLogo, PiWarning, PiCheckCircle, PiBook } from 'react-icons/pi';
import SEOHead from '../components/SEOHead';
import { stitchData } from '../data/stitchData';

export default function StitchDetail() {
  const { slug } = useParams<{ slug: string }>();
  const stitch = stitchData.find(s => s.slug === slug);

  if (!stitch) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Stitch not found</h1>
          <Link
            to="/stitch-glossary"
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            <PiArrowLeft className="w-5 h-5 mr-2" />
            Back to Stitch Glossary
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${stitch.name} (${stitch.abbreviation}) - Crochet Stitch Guide`}
        description={stitch.description}
        type="article"
      />

      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            to="/stitch-glossary"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
          >
            <PiArrowLeft className="w-5 h-5 mr-2" />
            Back to Stitch Glossary
          </Link>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{stitch.name}</h1>
                  <p className="text-lg text-primary-600 font-mono">{stitch.abbreviation}</p>
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {stitch.category}
                </div>
              </div>
              <p className="text-lg text-gray-600">{stitch.description}</p>
            </div>

            {/* Main Content */}
            <div className="p-8 space-y-12">
              {/* Difficulty and Key Info */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">Difficulty</h3>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    stitch.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    stitch.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {stitch.difficulty.charAt(0).toUpperCase() + stitch.difficulty.slice(1)}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">Category</h3>
                  <p className="text-gray-600">{stitch.category}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">Height</h3>
                  <p className="text-gray-600">{stitch.height}</p>
                </div>
              </div>

              {/* Video Tutorial */}
              {stitch.videoUrl && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Video Tutorial</h2>
                  <a
                    href={stitch.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <PiYoutubeLogo className="w-5 h-5 mr-2" />
                    Watch Video Tutorial
                  </a>
                </div>
              )}

              {/* Step by Step Instructions */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Step by Step Instructions</h2>
                <ol className="space-y-4">
                  {stitch.steps.map((step, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary-100 text-primary-800 rounded-full mr-3 font-medium">
                        {index + 1}
                      </span>
                      <p className="text-gray-600 pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tips */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Pro Tips</h2>
                <ul className="space-y-3">
                  {stitch.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <PiCheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Mistakes */}
              {stitch.commonMistakes && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
                  <ul className="space-y-3">
                    {stitch.commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start">
                        <PiWarning className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Uses */}
              {stitch.usedFor && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Common Uses</h2>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {stitch.usedFor.map((use, index) => (
                      <li key={index} className="bg-gray-50 p-4 rounded-xl text-gray-600">
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Stitches */}
              {stitch.relatedStitches && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Related Stitches</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {stitch.relatedStitches.map((related, index) => {
                      const relatedStitch = stitchData.find(s => s.abbreviation === related);
                      if (!relatedStitch) return null;
                      return (
                        <Link
                          key={index}
                          to={`/stitch/${relatedStitch.slug}`}
                          className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <h3 className="font-medium text-gray-900">{relatedStitch.name}</h3>
                          <p className="text-sm text-primary-600 font-mono">{relatedStitch.abbreviation}</p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}