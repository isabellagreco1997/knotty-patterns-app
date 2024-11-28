import React from 'react';
import { Link } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import PricingCards from '../components/PricingCards';
import ScrollFadeIn from '../components/ScrollFadeIn';
import { PiMagicWand, PiDevices, PiDownload, PiSparkle, PiHeart, PiTrophy, PiTextT, PiPencilSimple, PiQuotes, PiStar, PiArrowRight, PiCircle, PiCheck, PiShare, PiRobot } from 'react-icons/pi';
import SEOHead from '../components/SEOHead';
import Mock from '../../public/mock.png'
import FeaturePreview from '../components/FeaturePreview';
import FeedbackBanner from '../components/FeedbackBanner';

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

const howItWorksSections = [
  {
    step: 1,
    icon: <PiRobot className="w-8 h-8" />,
    title: "Get Inspired",
    description: "Start with AI-generated design ideas or create your own pattern from scratch. Our AI assistant helps spark creativity.",
    color: "from-rose-500 to-pink-600",
    features: [
      "AI pattern generation",
      "Design visualization",
      "Pattern suggestions"
    ]
  },
  {
    step: 2,
    icon: <PiTextT className="w-8 h-8" />,
    title: "Build Your Pattern",
    description: "Create your pattern with our comprehensive stitch library. Add increases, decreases, and notes as you go.",
    color: "from-violet-500 to-purple-600",
    features: [
      "Visual stitch builder",
      "Round-by-round creation",
      "Pattern notes"
    ]
  },
  {
    step: 3,
    icon: <PiShare className="w-8 h-8" />,
    title: "Export & Share",
    description: "Save your pattern, export it in multiple formats, or share it with the crochet community.",
    color: "from-blue-500 to-indigo-600",
    features: [
      "PDF export",
      "Pattern versioning",
      "Easy sharing"
    ]
  }
];

const features = [
  {
    icon: <PiRobot className="w-8 h-8" />,
    label: "AI-Powered Design",
    description: "Get inspired with AI-generated pattern ideas and designs. Transform your concepts into detailed patterns instantly.",
    color: "from-rose-500 to-pink-600",
    benefits: ["Pattern generation", "Design visualization", "Quick prototyping"]
  },
  {
    icon: <PiSparkle className="w-8 h-8" />,
    label: "Intuitive Design",
    description: "Create patterns effortlessly with our user-friendly interface designed specifically for crocheters.",
    color: "from-violet-500 to-purple-600",
    benefits: ["Drag-and-drop interface", "Real-time preview", "Mobile-friendly"]
  },
  {
    icon: <PiTrophy className="w-8 h-8" />,
    label: "Professional Tools",
    description: "Access advanced features that help you create detailed, professional-quality patterns.",
    color: "from-blue-500 to-indigo-600",
    benefits: ["Stitch library", "Pattern versioning", "Export options"]
  },
  {
    icon: <PiHeart className="w-8 h-8" />,
    label: "Growing Community",
    description: "Join a vibrant community of crochet enthusiasts and share your creative patterns.",
    color: "from-emerald-500 to-green-600",
    benefits: ["Pattern sharing", "Community feedback", "Inspiration gallery"]
  }
];

const testimonials = [
  {
    quote: "The AI pattern generator is amazing! It helps me quickly prototype new ideas before I start crocheting.",
    author: "Sarah M.",
    role: "Professional Pattern Designer",
    image: "https://images.unsplash.com/photo-1582838038154-a88f9a755f89?auto=format&fit=crop&q=80&w=100"
  },
  {
    quote: "As a beginner, this tool helped me understand pattern creation. The AI suggestions are really helpful!",
    author: "Emily R.",
    role: "Hobbyist Crocheter",
    image: "https://images.unsplash.com/photo-1615646589661-0e7bc0b2b6c3?auto=format&fit=crop&q=80&w=100"
  },
  {
    quote: "The best investment for my crochet journey. The AI features and premium tools are worth every penny.",
    author: "Michael K.",
    role: "Amigurumi Artist",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=100"
  }
];

const team = [
  {
    name: "Isabella Greco",
    role: "Founder & CEO",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGGO7Gx_CBFEQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1689498610769?e=1735776000&v=beta&t=h5-I_25ANNdUx4F8KHNtOEVxG87F0ZgkzjBW2W2-f0M",
    description: "A passionate crocheter with a background in software development, Isabella founded KnottyPatterns to bridge the gap between traditional crafting and modern technology."
  },
  {
    name: "Omrit Sarangi",
    role: "Co-Founder & CTO",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQENCl1tKK9Z9g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1707227181115?e=1735776000&v=beta&t=Xxie8-tU-TH9yY6qjjL0GJ8iqm350kvyuCaeAWkD0ak",
    description: "With expertise in both UI/UX design and crochet pattern creation, Omrit brings a unique perspective to making pattern design more accessible and enjoyable for everyone."
  }
];

export default function Home() {
  return (
    <div className="w-full">
      <SEOHead 
        title="Create Beautiful Crochet Patterns with AI"
        description="Design and share professional crochet patterns with our intuitive pattern builder and AI-powered design assistant. Perfect for beginners and experienced crocheters alike."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "KnottyPatterns",
          "description": "Create and share crochet patterns online with AI assistance",
          "url": "https://knottypatterns.com",
          "applicationCategory": "DesignApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }}
      />

     {/* Hero Section */}
     <section className="relative min-h-screen bg-gradient-to-br from-rose-50 via-primary-50 to-violet-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Geometric Shapes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary-200/20 to-primary-300/20 rounded-full mix-blend-multiply animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-rose-200/20 to-rose-300/20 rounded-full mix-blend-multiply animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-violet-200/20 to-violet-300/20 rounded-full mix-blend-multiply animate-float-slow"></div>
          
          {/* Decorative Lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(124, 58, 237, 0.05)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Images */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          {/* Top Right Image */}
          <div className="absolute top-[15%] right-[10%] w-64 h-64 transform rotate-6 hover:rotate-0 transition-transform duration-500">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl"></div>
              <img
                src="https://images.pexels.com/photos/7585853/pexels-photo-7585853.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&dpr=2&fit=crop"
                alt="Crochet Example 1"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
                loading="eager"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
          </div>

          {/* Bottom Left Image */}
          <div className="absolute bottom-[20%] left-[5%] w-48 h-48 transform -rotate-12 hover:rotate-0 transition-transform duration-500">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent rounded-2xl"></div>
              <img
                src="https://images.pexels.com/photos/10585181/pexels-photo-10585181.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2&fit=crop"
                alt="Crochet Example 2"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
                loading="eager"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
          </div>

          {/* Middle Right Image */}
          <div className="absolute top-[50%] right-[20%] w-56 h-56 transform rotate-12 hover:rotate-0 transition-transform duration-500">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent rounded-2xl"></div>
              <img
                src="https://images.pexels.com/photos/10585328/pexels-photo-10585328.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&dpr=2&fit=crop"
                alt="Crochet Example 3"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
                loading="eager"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen text-center">
          <ScrollFadeIn direction="up" delay={200}>
            <span className="inline-block px-6 py-2 rounded-full bg-primary-500/10 text-primary-700 text-sm font-medium mb-8 border border-primary-200">
              Now with AI-Powered Pattern Generation
            </span>
          </ScrollFadeIn>
          
          <ScrollFadeIn direction="up" delay={400}>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900 mb-8 leading-none">
              Create Beautiful
              <br />
              <span className="text-primary-600">Crochet Patterns</span>
            </h1>
          </ScrollFadeIn>
          
          <ScrollFadeIn direction="up" delay={600}>
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto font-light">
              Design, save, and share your patterns with our intuitive builder and AI assistant
            </p>
          </ScrollFadeIn>
          
          <ScrollFadeIn direction="up" delay={800}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
              <Link
                to="/get-inspiration"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all transform hover:scale-105 hover:shadow-lg"
              >
                <PiRobot className="w-5 h-5 mr-2" />
                Try AI Pattern Generation
              </Link>
              <Link
                to="/pattern-builder"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-700 bg-white rounded-xl hover:bg-primary-50 transition-all transform hover:scale-105 hover:shadow-lg border border-primary-200"
              >
                <PiPencilSimple className="w-5 h-5 mr-2" />
                Start Creating
              </Link>
            </div>
          </ScrollFadeIn>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-1 h-16 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-primary-200/0 via-primary-300/50 to-primary-200/0"></div>
            </div>
          </div>
        </div>
      </section>

<FeaturePreview />

         {/* How It Works Section */}
 <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollFadeIn>
            <div className="text-center mb-16">
              <span className="text-primary-600 font-semibold tracking-wide uppercase text-sm">How It Works</span>
              <h2 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
                Create in Three Simple Steps
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                From AI-generated ideas to finished patterns, we make it easy to bring your crochet designs to life
              </p>
            </div>
          </ScrollFadeIn>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-violet-500 to-blue-500 hidden md:block"></div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
              {howItWorksSections.map((section, index) => (
                <ScrollFadeIn key={section.step} delay={index * 200}>
                  <div className="relative group">
                    {/* Combined Number and Icon */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                      <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-sm font-bold text-gray-900 mb-4">
                        {section.step}
                      </div>
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${section.color} text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                        {section.icon}
                      </div>
                    </div>

                    {/* Card */}
                    <div className="pt-32 h-full">
                      {/* Content */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 mb-6 text-center">
                        {section.description}
                      </p>

                      {/* Features List */}
                      <ul className="space-y-3">
                        {section.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600 justify-center">
                            <PiArrowRight className="w-4 h-4 mr-2 text-gray-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Connector Line (visible on mobile) */}
                    {index < howItWorksSections.length - 1 && (
                      <div className="absolute -bottom-6 left-1/2 w-px h-12 bg-gradient-to-b from-gray-200 to-transparent md:hidden"></div>
                    )}
                  </div>
                </ScrollFadeIn>
              ))}
            </div>
          </div>

          <ScrollFadeIn delay={600}>
            <div className="text-center mt-16">
              <Link
                to="/get-inspiration"
                className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all transform hover:scale-105 hover:shadow-lg"
              >
                <PiRobot className="w-5 h-5 mr-2" />
                Try AI Pattern Generation
              </Link>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
 

     {/* Features Section */}
     <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMEw2MCAzMEwzMCA2MEwwIDMwTDMwIDB6IiBmaWxsPSIjMDAwIi8+PC9zdmc+')] bg-repeat"></div>
          
          <div className="max-w-7xl mx-auto px-4">
            <ScrollFadeIn>
              <div className="text-center mb-16">
                <span className="text-primary-600 font-semibold tracking-wide uppercase text-sm">Why Choose Us</span>
                <h2 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
                  Crafted for Crocheters
                </h2>
                <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                  Our pattern builder combines AI assistance with powerful features, making pattern creation a joy
                </p>
              </div>
            </ScrollFadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <ScrollFadeIn key={feature.label} delay={index * 100}>
                  <div className="relative group text-center">
                    {/* Card */}
                    <div className="h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 p-8 relative z-10 border border-gray-100">
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 ">
                        {feature.label}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {feature.description}
                      </p>
                      
                      {/* Benefits List */}
                      <ul className="space-y-3 text-center ">
                        {feature.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <PiArrowRight className="w-4 h-4 mr-2 text-gray-400" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Decorative Background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl transform group-hover:scale-105 -z-10`}></div>
                  </div>
                </ScrollFadeIn>
              ))}
            </div>
          </div>
        </section>

{/* Testimonials */}
<section className="py-24 bg-primary-900 relative overflow-hidden">
  {/* Background Pattern */}
  <div 
    className="absolute inset-0 opacity-5"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
      backgroundSize: '30px 30px'
    }}
  />
  
  <div className="max-w-6xl mx-auto px-4 relative">
    <ScrollFadeIn>
      <div className="text-center mb-16">
        <span className="text-primary-300 font-semibold tracking-wide uppercase text-sm">Testimonials</span>
        <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl">
          What Our Users Say
        </h2>
        <p className="mt-4 text-xl text-primary-200 max-w-3xl mx-auto">
          Join thousands of crocheters who are creating amazing patterns with KnottyPatterns
        </p>
      </div>
    </ScrollFadeIn>

    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <ScrollFadeIn key={index} direction="up" delay={index * 200}>
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-800/50 to-primary-700/50 rounded-2xl transform rotate-1 -z-10" />
            <div className="absolute -inset-4 bg-gradient-to-l from-primary-800/50 to-primary-700/50 rounded-2xl transform -rotate-1 -z-10" />
            
            {/* Card Content */}
            <div className="bg-primary-800/50 backdrop-blur-sm p-8 rounded-xl border border-primary-700/50">
              {/* Quote Icon */}
              <div className="mb-6">
                <svg className="w-10 h-10 text-primary-500 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              
              {/* Quote Text */}
              <p className="text-primary-100 text-lg italic mb-8 min-h-[100px]">
                "{testimonial.quote}"
              </p>
              
              {/* Author Info */}
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/100?text=User';
                    }}
                  />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-primary-300 text-sm">
                    {testimonial.role}
                  </div>
                </div>
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
          <p className="text-xl mb-8">Try our AI-powered pattern generator and join our community of crochet enthusiasts today.</p>
          <Link
            to="/get-inspiration"
            className="inline-flex items-center px-8 py-4 text-lg font-medium bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
          >
            <PiRobot className="w-5 h-5 mr-2" />
            Try AI Pattern Generation
          </Link>
        </ScrollFadeIn>
      </section>

      <FeedbackBanner />

    </div>
  );
}