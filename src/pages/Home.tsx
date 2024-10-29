import React from 'react';
import { Link } from 'react-router-dom';
import { PiSparkle, PiHeart, PiTrophy, PiStar, PiPencilSimple, PiQuotes } from 'react-icons/pi';
import ImageCarousel from '../components/ImageCarousel';
import PricingCards from '../components/PricingCards';
import BlogPreview from '../components/BlogPreview';
import ScrollFadeIn from '../components/ScrollFadeIn';

const carouselImages = [
  {
    url: "https://images.pexels.com/photos/7585853/pexels-photo-7585853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Colorful crochet blanket"
  },
  {
    url: "https://images.pexels.com/photos/10585181/pexels-photo-10585181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Crochet amigurumi toys"
  },
  {
    url: "https://images.pexels.com/photos/10585328/pexels-photo-10585328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Crochet supplies and yarn"
  },
  {
    url: "https://images.pexels.com/photos/10585047/pexels-photo-10585047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Handmade crochet items"
  },
  {
    url: "https://images.pexels.com/photos/10585168/pexels-photo-10585168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Crochet work in progress"
  }
];

const features = [
  {
    icon: <PiSparkle className="w-6 h-6 text-primary-500" />,
    label: "Easy to Use",
    description: "Intuitive pattern builder"
  },
  {
    icon: <PiTrophy className="w-6 h-6 text-primary-500" />,
    label: "Professional Tools",
    description: "Advanced pattern features"
  },
  {
    icon: <PiHeart className="w-6 h-6 text-primary-500" />,
    label: "Growing Community",
    description: "Share and discover patterns"
  },
  {
    icon: <PiStar className="w-6 h-6 text-primary-500" />,
    label: "Regular Updates",
    description: "New features monthly"
  }
];

const testimonials = [
  {
    quote: "This pattern builder has revolutionized how I create and share my crochet designs. It's intuitive and powerful!",
    author: "Sarah M.",
    role: "Professional Pattern Designer",
    image: "https://images.unsplash.com/photo-1582838038154-a88f9a755f89?auto=format&fit=crop&q=80&w=100"
  },
  {
    quote: "As a beginner, this tool helped me understand pattern creation. The 3D preview is amazing!",
    author: "Emily R.",
    role: "Hobbyist Crocheter",
    image: "https://images.unsplash.com/photo-1615646589661-0e7bc0b2b6c3?auto=format&fit=crop&q=80&w=100"
  },
  {
    quote: "The best investment for my crochet journey. The premium features are worth every penny.",
    author: "Michael K.",
    role: "Amigurumi Artist",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=100"
  }
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center">
        <ImageCarousel images={carouselImages} />
        <ScrollFadeIn direction="up" className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-6">
            Create Beautiful Crochet Patterns
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Design, save, and share your crochet patterns with our intuitive pattern builder
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pattern-builder"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
            >
              <PiPencilSimple className="mr-2" />
              Start Creating
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-primary-700 bg-white rounded-lg hover:bg-primary-50 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </ScrollFadeIn>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Pattern Builder?</h2>
          </ScrollFadeIn>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <ScrollFadeIn key={feature.label} delay={index * 100}>
                <div className="text-center group hover:-translate-y-1 transition-transform">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-3 group-hover:bg-primary-200 transition-colors">
                    {feature.icon}
                  </div>
                  <div className="text-lg font-semibold text-neutral-900 mb-1">{feature.label}</div>
                  <div className="text-sm text-neutral-600">{feature.description}</div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          </ScrollFadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step, index) => (
              <ScrollFadeIn key={step} direction="up" delay={index * 200}>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-primary-500 mb-4">{step}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {step === 1 && "Choose Your Start"}
                    {step === 2 && "Build Your Pattern"}
                    {step === 3 && "Share & Export"}
                  </h3>
                  <p className="text-neutral-600">
                    {step === 1 && "Begin with a magic ring, chain, or custom start for your pattern."}
                    {step === 2 && "Add stitches, rounds, and notes using our intuitive builder."}
                    {step === 3 && "Save your pattern, share with others, or export for offline use."}
                  </p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          </ScrollFadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollFadeIn key={index} direction="up" delay={index * 200}>
                <div className="bg-primary-800/50 p-6 rounded-lg">
                  <div className="flex items-start mb-4">
                    <PiQuotes className="w-8 h-8 text-primary-300 mr-2 flex-shrink-0" />
                    <p className="text-primary-100 italic">{testimonial.quote}</p>
                  </div>
                  <div className="flex items-center mt-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <div className="font-semibold text-primary-100">{testimonial.author}</div>
                      <div className="text-sm text-primary-300">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
            <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
              Choose the perfect plan for your crochet journey. All plans include access to our pattern builder and basic features.
            </p>
          </ScrollFadeIn>
          <ScrollFadeIn direction="up" delay={200}>
            <PricingCards />
          </ScrollFadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <ScrollFadeIn className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Creating?</h2>
          <p className="text-xl mb-8">Join our community of crochet enthusiasts and start creating beautiful patterns today.</p>
          <Link
            to="/pattern-builder"
            className="inline-flex items-center px-8 py-4 text-lg font-medium bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
          >
            Try Pattern Builder Free
          </Link>
        </ScrollFadeIn>
      </section>
    </div>
  );
}