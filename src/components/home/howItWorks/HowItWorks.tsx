import React from 'react';
import { Link } from 'react-router-dom';
import { PiPencilSimple, PiMagicWand, PiArrowRight, PiSparkle, PiDownload } from 'react-icons/pi';
import Strawberry from '../../../pages/strawberry.jpg';
export default function HowItWorksHero() {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden md:m-20 m-6">
      <div className="grid lg:grid-cols-2 gap-8 p-8 md:p-12">
        {/* Left Column - Content */}
        <div className="space-y-8">
          <div>
            <div className="text-primary-500 font-medium mb-4">Easy as 1-2-3</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Create in Three Simple Steps
            </h2>
            <p className="text-lg text-gray-600">
              From inspiration to finished pattern, we make it easy to bring your crochet designs to life. Get started with AI inspiration, refine in our pattern builder, and share your creations.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Get Inspired",
                description: "Start with AI-generated design ideas or create from scratch",
                icon: <PiMagicWand className="w-6 h-6" />
              },
              {
                step: 2,
                title: "Build Your Pattern",
                description: "Use our pattern builder to create detailed instructions",
                icon: <PiPencilSimple className="w-6 h-6" />
              },
              {
                step: 3,
                title: "Share & Export",
                description: "Download, print, or share your finished pattern",
                icon: <PiDownload className="w-6 h-6" />
              }
            ].map((step) => (
              <div key={step.step} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {step.step}. {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/how-it-works"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <PiSparkle className="w-5 h-5 mr-2" />
            Learn More
            <PiArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Right Column - Interactive Demo */}
        <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
          {/* Step 1: AI Inspiration */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">1</div>
              <h3 className="font-medium">Get AI Inspiration</h3>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg mb-2">
<img src={Strawberry} />
            </div>
            <p className="text-sm text-gray-500">AI generates design ideas and suggestions</p>
          </div>

          {/* Step 2: Pattern Builder */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">2</div>
              <h3 className="font-medium">Build Your Pattern</h3>
            </div>
            <div className="space-y-2 mb-2">
              <div className="flex gap-2">
                {['sc', 'dc', 'inc', 'dec'].map((stitch) => (
                  <button
                    key={stitch}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm"
                  >
                    {stitch}
                  </button>
                ))}
              </div>
              <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm">
                Round 1: 6 sc in magic ring (6)
              </div>
            </div>
            <p className="text-sm text-gray-500">Create detailed pattern instructions</p>
          </div>

          {/* Step 3: Export & Share */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">3</div>
              <h3 className="font-medium">Export & Share</h3>
            </div>
            <div className="flex gap-2 mb-2">
              <button className="flex items-center px-3 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm">
                <PiDownload className="w-4 h-4 mr-1" />
                PDF
              </button>
              <button className="flex items-center px-3 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm">
                <PiSparkle className="w-4 h-4 mr-1" />
                Share
              </button>
            </div>
            <p className="text-sm text-gray-500">Download and share your patterns</p>
          </div>

          {/* Pro Tip */}
          <div className="bg-amber-50 rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-2">
              <PiSparkle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                Pro Tip: Use AI inspiration as a starting point, then customize every detail in the pattern builder to make it uniquely yours!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}