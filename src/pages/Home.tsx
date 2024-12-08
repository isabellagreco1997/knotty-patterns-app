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
import ImageOverlay from '../components/ImageOverlay';
import SocialProof from '../components/SocialProof';
import HighlightedText from '../components/HighlightedText';
import Strawberry from './strawberry.jpg'
import Fox from './fox.jpg'
import Elephant from './elephant.jpg'
import GallerySection from '../components/home/GallerySection';
import ShowcaseSection from '../components/home/ShowcaseSection';
import Testimonials from '../components/pricing/Testimonials';
import HowItWorks from '../components/home/howItWorks/howItWorks'

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

const showcaseExamples = [
  {
    prompt: "Cute baby elephant with a flower crown",
    image: Elephant, 
    pattern: "Magic ring with 6 sc\nRound 1: inc in each st (12)\nRound 2: *sc, inc* repeat 6 times (18)..."
  },
  {
    prompt: "Kawaii strawberry with a happy face",
    image: Strawberry, 
    pattern: "Magic ring with 6 sc\nRound 1: inc in each st (12)\nRound 2: sc in each st..."
  },
  {
    prompt: "Small sleeping fox amigurumi",
    image: Fox, 
    pattern: "Magic ring with 8 sc\nRound 1: inc in each st (16)\nRound 2: *sc, inc* repeat 8 times..."
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
    image: "https://images.unsplash.com/photo-1714415182234-0672970be61a?auto=format&fit=crop&q=80&w=100"
  },
  {
    quote: "As a beginner, this tool helped me understand pattern creation. The AI suggestions are really helpful!",
    author: "Emily R.",
    role: "Hobbyist Crocheter",
    image: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&q=80&w=100"
  },
  {
    quote: "The best investment for my crochet journey. The AI features and premium tools are worth every penny.",
    author: "Michael K.",
    role: "Amigurumi Artist",
    image: "https://images.unsplash.com/photo-1711645169736-53327e726205?auto=format&fit=crop&q=80&w=100"
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
     <ImageOverlay
        image="https://images.pexels.com/photos/7585853/pexels-photo-7585853.jpeg"
        alt="Crochet background"
        overlayOpacity="0.85"
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 py-24 text-center">
            <ScrollFadeIn direction="up" delay={200}>
              <span className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8 border border-white/20">
                Now with AI-Powered Pattern Generation
              </span>
            </ScrollFadeIn>
            
            <ScrollFadeIn direction="up" delay={400}>
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-8 leading-none">
                Create Beautiful
                <br />
                <span className="text-primary-300">Crochet Patterns</span>
              </h1>
            </ScrollFadeIn>
            
            <ScrollFadeIn direction="up" delay={600}>
              <p className="text-xl sm:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-light">
              <HighlightedText 
                  text="Design, test, and sell your patterns with our intuitive builder and AI software"
                  highlight="AI"
                />
              </p>
            </ScrollFadeIn>
            
            <ScrollFadeIn direction="up" delay={800}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-600/90 backdrop-blur-sm rounded-xl hover:bg-primary-600 transition-all transform hover:scale-105 hover:shadow-lg"
                >
                  <PiPencilSimple className="w-5 h-5 mr-2" />
                  Start Creating
                </Link>
                <Link
                  to="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all transform hover:scale-105 hover:shadow-lg border border-white/20"
                >
                  <PiSparkle className="w-5 h-5 mr-2" />
                  View Pricing
                </Link>
              </div>
              <SocialProof />

            </ScrollFadeIn>
          </div>
        </div>
      </ImageOverlay>

           {/* Gallery Section */}
           <GallerySection />
<FeaturePreview />



            <ShowcaseSection />

            
            <HowItWorks />

   
<Testimonials />





      

    

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


    </div>
  );
}