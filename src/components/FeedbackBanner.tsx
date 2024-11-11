import React, { useState } from 'react';
import { PiEnvelope, PiArrowRight, PiSpinner, PiX } from 'react-icons/pi';

interface FeedbackFormState {
  name: string;
  email: string;
  message: string;
}

export default function FeedbackBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FeedbackFormState>({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/.netlify/functions/send-feedback', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to send feedback');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error sending feedback:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border-t border-primary-100">
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
          {/* Left side with text and button */}
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-primary-900 mb-2">
              Help us improve!
            </h3>
            <p className="text-primary-700 mb-6 max-w-xl">
              Found a bug? Have a suggestion? We'd love to hear from you! Your feedback helps us make KnottyPatterns better for everyone.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all transform hover:scale-105"
            >
              <PiEnvelope className="w-5 h-5 mr-2" />
              Send Feedback
              <PiArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>

          {/* Right side with SVG illustration */}
          <div className="w-64 h-64 relative">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background circle */}
              <circle cx="100" cy="100" r="80" fill="#EDE9FE" />
              
              {/* Yarn ball */}
              <circle cx="100" cy="100" r="40" fill="#7C3AED" />
              <path
                d="M60 100C60 77.9086 77.9086 60 100 60"
                stroke="#DDD6FE"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M140 100C140 122.091 122.091 140 100 140"
                stroke="#DDD6FE"
                strokeWidth="4"
                strokeLinecap="round"
              />
              
              {/* Crochet hook */}
              <path
                d="M140 60L160 40M160 40L180 60M160 40L160 140"
                stroke="#7C3AED"
                strokeWidth="4"
                strokeLinecap="round"
              />
              
              {/* Decorative stitches */}
              <circle cx="70" cy="70" r="4" fill="#7C3AED" />
              <circle cx="130" cy="130" r="4" fill="#7C3AED" />
              <circle cx="70" cy="130" r="4" fill="#7C3AED" />
              <circle cx="130" cy="70" r="4" fill="#7C3AED" />
              
              {/* Heart */}
              <path
                d="M95 85C95 85 90 75 80 75C70 75 65 85 65 85C65 85 80 105 95 85Z"
                fill="#EC4899"
              />
              <path
                d="M105 85C105 85 110 75 120 75C130 75 135 85 135 85C135 85 120 105 105 85Z"
                fill="#EC4899"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Send Feedback</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <PiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name (optional)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {submitStatus === 'error' && (
                <div className="text-red-600 text-sm">
                  Failed to send feedback. Please try again.
                </div>
              )}

              {submitStatus === 'success' && (
                <div className="text-green-600 text-sm">
                  Thank you for your feedback!
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <PiSpinner className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <PiEnvelope className="w-5 h-5 mr-2" />
                      Send Feedback
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}