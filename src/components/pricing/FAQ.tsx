import React, { useState } from 'react';
import { PiCaretDown } from 'react-icons/pi';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What's included in the subscription?",
    answer: "Your subscription includes unlimited pattern creation, AI pattern generation, PDF exports, custom stitch creation, pattern version history, and priority support."
  },
  {
    question: "How does the 30-day guarantee work?",
    answer: "If you're not satisfied with KnottyPatterns within the first 30 days, we'll give you a full refund. No questions asked."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your current billing period."
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, all payments are processed securely through Stripe. We never store your credit card information directly."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay through our secure payment processor, Stripe."
  },
  {
    question: "Are my patterns private?",
    answer: "Yes, all your patterns are completely private and can only be accessed by you. We take data privacy very seriously."
  },
  {
    question: "Do you offer team or business plans?",
    answer: "Not yet, but we're working on it! Contact us if you're interested in a team or business subscription."
  }
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => setOpenItem(openItem === index ? null : index)}
              className="w-full py-6 flex justify-between items-center text-left"
            >
              <span className="text-lg font-medium text-gray-900">{item.question}</span>
              <PiCaretDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openItem === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openItem === index ? 'max-h-96 pb-6' : 'max-h-0'
              }`}
            >
              <p className="text-gray-600">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}