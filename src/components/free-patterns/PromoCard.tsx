import React from 'react';
import { Link } from 'react-router-dom';
import { PiPencilSimple, PiRobot, PiArrowRight, PiSparkle } from 'react-icons/pi';

export default function PromoCard() {
  return (
    <div className="h-full bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-primary-100 group">
      <div className="h-full p-8 flex flex-col justify-between">
        {/* Header */}
        <div className="space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full text-primary-600 shadow-sm">
            <PiSparkle className="w-4 h-4 mr-2" />
            Create Your Own Patterns
          </div>

          <h3 className="text-2xl font-bold text-gray-900">
            Pattern Builder
            <span className="block text-primary-600 mt-1">+ AI Assistant</span>
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <PiPencilSimple className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Easy Pattern Creation</p>
                  <p className="text-sm text-gray-600">Drag-and-drop interface</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <PiRobot className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">AI Design Assistant</p>
                  <p className="text-sm text-gray-600">Get inspired instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          to="/pattern-builder"
          className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors group-hover:scale-105 transform duration-300 mt-6"
        >
          Try Pattern Builder
          <PiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}