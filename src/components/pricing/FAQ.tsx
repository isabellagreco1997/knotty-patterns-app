import React, { useState } from 'react';
import { PiCaretDown, PiSparkle, PiQuestionMark } from 'react-icons/pi';

const faqItems = [
  {
    question: "What's included in the subscription? 🎁",
    answer: "Everything you need to create amazing patterns! You get unlimited pattern creation, AI pattern generation, PDF exports, custom stitches, version history, and priority support. Plus, you can sell your patterns anywhere! ✨",
    emoji: "🎨"
  },
  {
    question: "How does the 30-day guarantee work? 💫",
    answer: "It's super simple! If you're not absolutely in love with KnottyPatterns within the first 30 days, we'll give you a full refund. No questions asked, no hard feelings! 💝",
    emoji: "🎯"
  },
  {
    question: "Can I cancel my subscription anytime? 🤔",
    answer: "Absolutely! While we'd be sad to see you go, you can cancel your subscription with just a click. No hidden fees, no complicated process. You'll keep access until the end of your billing period! 🌟",
    emoji: "✨"
  },
  {
    question: "Is my payment information secure? 🔒",
    answer: "Super secure! We use Stripe, the same payment system trusted by millions of businesses worldwide. Your payment info is encrypted and never stored on our servers! 🛡️",
    emoji: "🔐"
  },
  {
    question: "What payment methods do you accept? 💳",
    answer: "We accept all major credit cards, PayPal, and Apple Pay through our secure payment processor. Easy peasy! 🌈",
    emoji: "💰"
  },
  {
    question: "Can I make money selling my patterns? 💎",
    answer: "Yes, absolutely! Many of our creators earn $1000+ monthly selling patterns on Etsy, Ravelry, and other platforms. Your patterns, your profits! 🚀",
    emoji: "💫"
  }
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <div className="py-20 bg-gradient-to-b from-white to-primary-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce">❓</div>
      <div className="absolute top-20 right-10 text-4xl animate-bounce delay-100">💭</div>
      <div className="absolute bottom-10 left-1/4 text-4xl animate-bounce delay-200">💫</div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-primary-100 text-primary-800 rounded-full mb-6">
            <PiQuestionMark className="w-5 h-5 mr-2" />
            Got Questions? We've Got Answers! 🎯
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
            <span className="block mt-2 bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">
              Everything You Need to Know! ✨
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-primary-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenItem(openItem === index ? null : index)}
                className="w-full py-6 px-8 flex justify-between items-center text-left relative group"
              >
                <div className="flex items-center pr-8">
                  <span className="text-2xl mr-4">{item.emoji}</span>
                  <span className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                    {item.question}
                  </span>
                </div>
                <PiCaretDown
                  className={`w-6 h-6 text-primary-500 transition-transform duration-300 ${
                    openItem === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openItem === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-8 pt-0 text-gray-600 bg-gradient-to-b from-white to-primary-50/30">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl text-primary-800">
            <PiSparkle className="w-5 h-5 mr-2" />
            <span className="font-medium">Still have questions? We're here to help! 💫</span>
          </div>
        </div>
      </div>
    </div>
  );
}