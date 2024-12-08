import React from 'react';
import SEOHead from '../components/SEOHead';
import { PiShieldCheck, PiHandshake, PiScroll, PiWarning, PiCreditCard } from 'react-icons/pi';

export default function Terms() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <SEOHead
        title="Terms of Service - KnottyPatterns"
        description="Read our Terms of Service to understand your rights and responsibilities when using KnottyPatterns."
        type="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Terms of Service - KnottyPatterns",
          "description": "Terms and conditions for using KnottyPatterns",
          "publisher": {
            "@type": "Organization",
            "name": "KnottyPatterns",
            "logo": {
              "@type": "ImageObject",
              "url": "https://knottypatterns.com/logo.svg"
            }
          },
          "dateModified": lastUpdated
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <PiScroll className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
              <p className="text-gray-600">Last updated: {lastUpdated}</p>
            </div>

            <div className="prose prose-primary max-w-none">
              {/* Agreement Section */}
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <PiHandshake className="w-6 h-6 text-primary-600 mr-2" />
                  <h2 className="text-2xl font-bold">1. Agreement to Terms</h2>
                </div>
                <div className="bg-primary-50 rounded-xl p-6 mb-6">
                  <p className="mb-4">By accessing or using KnottyPatterns, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      You must be at least 13 years old to use this service
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      You are responsible for maintaining the security of your account
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      You must provide accurate and complete information
                    </li>
                  </ul>
                </div>
              </div>

              {/* Intellectual Property Section */}
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <PiShieldCheck className="w-6 h-6 text-primary-600 mr-2" />
                  <h2 className="text-2xl font-bold">2. Intellectual Property Rights</h2>
                </div>
                <div className="bg-primary-50 rounded-xl p-6 mb-6">
                  <p className="mb-4">When using our pattern builder and AI tools:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      You own the patterns you create
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      You can sell patterns created with our tools
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      AI-generated patterns must be tested before selling
                    </li>
                  </ul>
                </div>
              </div>

              {/* Subscription Terms */}
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <PiCreditCard className="w-6 h-6 text-primary-600 mr-2" />
                  <h2 className="text-2xl font-bold">3. Subscription Terms</h2>
                </div>
                <div className="bg-primary-50 rounded-xl p-6 mb-6">
                  <p className="mb-4">Our subscription service includes:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Monthly billing with auto-renewal
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Cancel anytime with no penalty
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      30-day money-back guarantee
                    </li>
                  </ul>
                </div>
              </div>

              {/* Acceptable Use */}
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <PiWarning className="w-6 h-6 text-primary-600 mr-2" />
                  <h2 className="text-2xl font-bold">4. Acceptable Use</h2>
                </div>
                <div className="bg-primary-50 rounded-xl p-6">
                  <p className="mb-4">You agree not to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Share untested AI-generated patterns
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Use the service for any unlawful purpose
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Share your account credentials
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <PiHandshake className="w-6 h-6 text-primary-600 mr-2" />
                  <h2 className="text-2xl font-bold">5. Contact Us</h2>
                </div>
                <div className="bg-primary-50 rounded-xl p-6">
                  <p className="mb-4">For any questions about these Terms, please contact us at:</p>
                  <ul className="space-y-2">
                    <li>Email: isabellasilvagreco@gmail.com</li>
                  </ul>
                </div>
              </div>

              <div className="text-sm text-gray-600 mt-8">
                <p>These terms of service were last updated on {lastUpdated}. We reserve the right to update these terms at any time. You should check this page regularly to stay informed of any changes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}