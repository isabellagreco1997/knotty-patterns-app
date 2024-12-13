

import React from 'react';
import { Link } from 'react-router-dom';
import { PiPencilSimple, PiMagicWand, PiDownload, PiDevices, PiSparkle, PiArrowRight } from 'react-icons/pi';
import Mock from '../../public/mock.png';

export default function FeaturePreview() {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden md:m-20 m-6">
      <div className="grid lg:grid-cols-2 gap-8 p-8 md:p-12">
        {/* Left Column - Content */}
        <div className="space-y-8">
          <div>
            <div className="text-primary-500 font-medium mb-4">Pattern Builder Features</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need
              <span className="block mt-2 text-primary-600">In One Place</span>
            </h2>
            <p className="text-lg text-gray-600">
              Create professional crochet patterns with our comprehensive suite of tools. From AI-powered inspiration to detailed pattern building and sharing.
            </p>
          </div>

          <div className="grid gap-6">
            {[
              {
                icon: <PiMagicWand className="w-6 h-6" />,
                title: "AI Magic Assistant",
                description: "Get instant inspiration and pattern suggestions with our AI helper",
                color: "from-rose-500 to-pink-600"
              },
              {
                icon: <PiDevices className="w-6 h-6" />,
                title: "Real-time Preview",
                description: "See your pattern come to life as you create with live preview",
                color: "from-violet-500 to-purple-600"
              },
              {
                icon: <PiDownload className="w-6 h-6" />,
                title: "Export Anywhere",
                description: "Download as PDF, print, or share your patterns easily",
                color: "from-blue-500 to-indigo-600"
              }
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/pattern-builder"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg group"
          >
            <PiPencilSimple className="w-5 h-5 mr-2" />
            Try Pattern Builder
            <PiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right Column - Interface Preview */}
        <div className="relative">
          {/* Pattern Builder Preview */}
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="relative w-full aspect-square bg-gray-50">
              <img
                src={Mock}
                alt="Pattern Builder Interface"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary-500/30 rounded-full filter blur-3xl"></div>
          <div className="absolute -top-6 -left-6 w-48 h-48 bg-secondary-500/30 rounded-full filter blur-3xl"></div>

          {/* Feature Highlights */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex items-center space-x-2 text-sm">
              <PiSparkle className="w-4 h-4 text-primary-600" />
              <span>AI-Powered Magic</span>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex items-center space-x-2 text-sm">
              <PiDevices className="w-4 h-4 text-primary-600" />
              <span>Live Preview</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}