import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  PiPencilSimple, 
  PiMagicWand, 
  PiTextT, 
  PiNote, 
  PiRepeat, 
  PiArrowRight,
  PiArrowsOutCardinal,
  PiPlus,
  PiCopy,
  PiTrash,
  PiCheck,
  PiWarning,
  PiDownload
} from 'react-icons/pi';
import SEOHead from '../components/SEOHead';
import { 
  MockPatternBuilder, 
  MockRepetitionGroup, 
  MockCustomText, 
  MockStitchControls,
  MockSectionManagement,
  MockStitchNotes,
  MockPatternExport,
  MockPatternPreview
} from '../components/how-it-works/MockComponents';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { getBreadcrumbPath } from '../utils/navigation';

export default function HowItWorks() {
  const location = useLocation();
  const breadcrumbItems = getBreadcrumbPath(location.pathname);

  return (
    <>
      <SEOHead 
        title="How to Use the Pattern Builder - KnottyPatterns"
        description="Learn how to use our pattern builder to create professional crochet patterns. Step-by-step guide with tips and best practices."
        type="article"
      />

      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Creating Patterns Made Easy
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Learn how to use our pattern builder to create professional crochet patterns. 
              Follow our step-by-step guide to get started.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
            >
              <PiPencilSimple className="w-5 h-5 mr-2" />
              Start Creating
            </Link>
          </div>

          {/* Features Grid */}
          <div className="space-y-12 mb-16">
            {/* Pattern Building */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Pattern Building</h2>
                  <p className="text-gray-600 mb-6">
                    Create professional crochet patterns with our intuitive builder. 
                    Start with a magic ring or chain, then build your pattern round by round.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <PiPencilSimple className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="text-gray-600">Add and edit stitches with a simple click</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <PiMagicWand className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="text-gray-600">Automatic stitch counting and round tracking</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <MockPatternBuilder />
                </div>
              </div>
            </div>

            {/* Repetition Groups */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-center justify-center">
                  <MockRepetitionGroup />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Repetition Groups</h2>
                  <p className="text-gray-600 mb-6">
                    Create complex stitch patterns by grouping and repeating stitches. 
                    Perfect for patterns that use repeated sequences.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <PiRepeat className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="text-gray-600">Select multiple stitches to repeat</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <PiCheck className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="text-gray-600">Set repeat count and preview instantly</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Text & Notes */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Custom Text & Notes</h2>
                  <p className="text-gray-600 mb-6">
                    Add detailed instructions, tips, and notes throughout your pattern 
                    to make it clear and easy to follow.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <PiTextT className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="text-gray-600">Insert text between rounds</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <PiNote className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="text-gray-600">Add round-specific notes and instructions</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <MockCustomText />
                </div>
              </div>
            </div>

            {/* Stitch Notes */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-center justify-center">
                  <MockStitchNotes />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Stitch Notes</h2>
                  <p className="text-gray-600 mb-6">
                    Add detailed notes and instructions to individual stitches for 
                    clarity and precision.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <PiNote className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="text-gray-600">Add before and after notes to any stitch</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <PiWarning className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="text-gray-600">Include important details and reminders</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Management */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Section Management</h2>
                  <p className="text-gray-600 mb-6">
                    Organize your pattern into logical sections for better structure 
                    and readability.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <PiArrowsOutCardinal className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="text-gray-600">Drag and drop to reorder sections</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <PiNote className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="text-gray-600">Add section-specific instructions</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <MockSectionManagement />
                </div>
              </div>
            </div>
          </div>

          {/* Tips & Best Practices */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Tips & Best Practices</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <PiCheck className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Use Sections Effectively</h3>
                    <p className="text-gray-600">Break down complex patterns into logical sections like 'Body', 'Arms', 'Head'.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <PiNote className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Add Detailed Notes</h3>
                    <p className="text-gray-600">Include stitch-specific notes and round instructions.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <PiMagicWand className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Preview Often</h3>
                    <p className="text-gray-600">Use the pattern preview to check how your instructions will look.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <PiDownload className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Save Regularly</h3>
                    <p className="text-gray-600">Save your work frequently to prevent losing any changes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Create Your Pattern?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start building your crochet patterns with our intuitive pattern builder.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
            >
              Get Started Now
              <PiArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}