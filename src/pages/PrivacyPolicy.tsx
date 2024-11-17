import React from 'react';
import SEOHead from '../components/SEOHead';

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="Learn about how we collect, use, and protect your personal information at KnottyPatterns."
        type="website"
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-primary max-w-none">
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you:
            </p>
            <ul>
              <li>Create an account</li>
              <li>Create and save patterns</li>
              <li>Make a purchase</li>
              <li>Contact us for support</li>
              <li>Subscribe to our newsletter</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process your payments</li>
              <li>Send you important updates</li>
              <li>Improve our services</li>
              <li>Respond to your requests</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell your personal information. We share your information only with:
            </p>
            <ul>
              <li>Service providers who assist in operating our platform</li>
              <li>Payment processors for subscription management</li>
              <li>Analytics providers to improve our services</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information, including:
            </p>
            <ul>
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Secure data storage</li>
              <li>Access controls</li>
            </ul>

            <h2>5. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data</li>
            </ul>

            <h2>6. Cookies</h2>
            <p>
              We use cookies and similar technologies to:
            </p>
            <ul>
              <li>Keep you signed in</li>
              <li>Remember your preferences</li>
              <li>Understand how you use our service</li>
              <li>Improve your experience</li>
            </ul>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: privacy@knottypatterns.com<br />
              Address: [Your Business Address]
            </p>

            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}