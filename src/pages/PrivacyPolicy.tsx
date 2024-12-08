import React from 'react';
import SEOHead from '../components/SEOHead';
import { PiShieldCheck, PiLockSimple, PiCookie, PiUserCircle, PiEnvelope } from 'react-icons/pi';

export default function PrivacyPolicy() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <SEOHead
        title="Privacy Policy - KnottyPatterns"
        description="Learn about how we collect, use, and protect your personal information at KnottyPatterns. Our commitment to your privacy and data security."
        type="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Privacy Policy - KnottyPatterns",
          "description": "Our commitment to protecting your privacy and personal data",
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
                <PiShieldCheck className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-gray-600">Last updated: {lastUpdated}</p>
            </div>

            <div className="prose prose-primary max-w-none">
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <PiUserCircle className="w-6 h-6 text-primary-600 mr-2" />
                  <h2 className="text-2xl font-bold">Information We Collect</h2>
                </div>
                <div className="bg-primary-50 rounded-xl p-6 mb-6">
                  <p className="mb-4">We collect information that you provide directly to us when you:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Create and manage your account
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Create and save crochet patterns
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Make purchases or subscribe to our services
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Contact our support team
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Subscribe to our newsletters or updates
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <PiLockSimple className="w-6 h-6 text-primary-600 mr-2" />
                  <h2 className="text-2xl font-bold">How We Use Your Information</h2>
                </div>
                <div className="bg-primary-50 rounded-xl p-6 mb-6">
                  <p className="mb-4">We use your information to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Provide and improve our pattern creation services
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Process your payments and subscriptions
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Send important updates about our services
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Enhance your pattern creation experience
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Respond to your support requests and feedback
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <PiCookie className="w-6 h-6 text-primary-600 mr-2" />
                  <h2 className="text-2xl font-bold">Cookies and Similar Technologies</h2>
                </div>
                <div className="bg-primary-50 rounded-xl p-6 mb-6">
                  <p className="mb-4">We use cookies and similar tracking technologies to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Keep you signed in securely
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Remember your preferences
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Understand how you use our service
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Improve your experience
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <PiEnvelope className="w-6 h-6 text-primary-600 mr-2" />
                  <h2 className="text-2xl font-bold">Contact Us</h2>
                </div>
                <div className="bg-primary-50 rounded-xl p-6">
                  <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at:</p>
                  <ul className="space-y-2">
                    <li>Email: isabellasilvagreco@gmail.com</li>
                  </ul>
                </div>
              </div>

              <div className="text-sm text-gray-600 mt-8">
                <p>This privacy policy was last updated on {lastUpdated}. We may update this policy from time to time by publishing a new version on our website. You should check this page occasionally to ensure you are happy with any changes to this policy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}