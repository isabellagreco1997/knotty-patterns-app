import React, { useState } from 'react';
import { PiCaretDown } from 'react-icons/pi';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How does the free plan work?",
    answer: "The free plan allows you to create up to 5 patterns and includes basic features like pattern creation and text export. You also get 3 AI pattern generations per month."
  },
  {
    question: "What's included in the Premium plan?",
    answer: "Premium includes unlimited pattern storage, PDF exports, custom stitch creation, unlimited AI pattern generations, and priority support."
  },
  {
    question: "Can I upgrade or downgrade anytime?",
    answer: "Yes! You can upgrade to Premium whenever you want. You can also cancel your Premium subscription at any time - you'll keep access until the end of your billing period."
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, all payments are processed securely through Stripe. We never store your credit card information directly."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with your Premium subscription."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay through our secure payment processor, Stripe."
  },
  {
    question: "Are my patterns private?",
    answer: "Yes, all your patterns are completely private and can only be accessed by you. We take data privacy very seriously."
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