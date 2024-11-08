import React from 'react';
import { Link } from 'react-router-dom';
import ScrollFadeIn from './ScrollFadeIn';
import { PiPencilSimple, PiMagicWand, PiDownload, PiDevices } from 'react-icons/pi';
import Mock from '../../public/mock.png'

export default function FeaturePreview() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-primary-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollFadeIn>
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold tracking-wide uppercase text-sm">Pattern Builder</span>
            <h2 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
              Create Beautiful Patterns with Ease
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our intuitive pattern builder helps you create professional-quality crochet patterns
            </p>
          </div>
        </ScrollFadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollFadeIn direction="right">
            <div className="relative mx-auto max-w-2xl lg:max-w-none">
              {/* Pattern Builder Mockup */}
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-primary-600 text-white p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="relative w-full h-[400px] md:h-[400px] h-[200px]" style={{backgroundColor:"rgb(249 250 251 / var(--tw-bg-opacity))"}}>
  <img
    src={Mock}
    alt="Pattern Builder Interface"
    className="absolute inset-0 w-full h-full object-contain"
  />
</div>

              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary-100 rounded-full filter blur-3xl opacity-50"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-secondary-100 rounded-full filter blur-3xl opacity-50"></div>
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn direction="left">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <PiMagicWand className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Intuitive Design</h3>
                    <p className="mt-2 text-gray-600">
                      Our drag-and-drop interface makes pattern creation simple and enjoyable. Add stitches, rounds, and notes with ease.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <PiDevices className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Real-time Preview</h3>
                    <p className="mt-2 text-gray-600">
                      See your pattern come to life as you build it. Our live preview helps you catch mistakes before they happen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <PiDownload className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Export Anywhere</h3>
                    <p className="mt-2 text-gray-600">
                      Export your patterns in multiple formats, including PDF and plain text. Share your creations with the world.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
  <Link
    to="/pattern-builder"
    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all transform hover:scale-105"
  >
    <PiPencilSimple className="w-5 h-5 mr-2" />
    Try Pattern Builder
  </Link>
</div>

            </div>
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
}