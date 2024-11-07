import React from 'react';
import { Link } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import PricingCards from '../components/PricingCards';
import ScrollFadeIn from '../components/ScrollFadeIn';
import { PiSparkle, PiHeart, PiTrophy, PiStar, PiPencilSimple, PiQuotes, PiCircle, PiCheck, PiShare } from 'react-icons/pi';
import SEOHead from '../components/SEOHead';

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
    title: "Start Your Pattern",
    description: "Begin with a magic ring or chain for your amigurumi. Our intuitive interface guides you through the initial setup.",
    icon: <PiCircle className="w-8 h-8 text-primary-500" />,
    features: [
      "Magic ring starter",
      "Chain foundation",
      "Custom text options",
      "Basic stitch setup"
    ]
  },
  {
    step: 2,
    title: "Build Round by Round",
    description: "Create your pattern with our comprehensive stitch library. Add increases, decreases, and notes as you go.",
    icon: <PiPencilSimple className="w-8 h-8 text-primary-500" />,
    features: [
      "Visual stitch builder",
      "Round-by-round creation",
      "Automatic stitch counting",
      "Pattern notes & annotations"
    ]
  },
  {
    step: 3,
    title: "Export & Share",
    description: "Save your pattern, export it in multiple formats, or share it with the crochet community.",
    icon: <PiShare className="w-8 h-8 text-primary-500" />,
    features: [
      "PDF export",
      "Text format",
      "Pattern versioning",
      "Easy sharing options"
    ]
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
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] max-h-[1000px]">
          <ImageCarousel images={carouselImages}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <ScrollFadeIn direction="up" delay={200}>
                  <span className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-8 border border-white/20">
                    Welcome to KnottyPatterns
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
                  <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light">
                    Design, save, and share your patterns with our intuitive builder
                  </p>
                </ScrollFadeIn>
                
                <ScrollFadeIn direction="up" delay={800}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
                    <Link
                      to="/pattern-builder"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-500 rounded-xl hover:bg-primary-600 transition-all transform hover:scale-105 hover:shadow-lg"
                    >
                      <PiPencilSimple className="w-5 h-5 mr-2" />
                      Start Creating
                    </Link>
                    <Link
                      to="/pricing"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-700 bg-white rounded-xl hover:bg-primary-50 transition-all transform hover:scale-105 hover:shadow-lg"
                    >
                      View Pricing
                    </Link>
                  </div>
                </ScrollFadeIn>
              </div>
            </div>
          </ImageCarousel>
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
<section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Create beautiful crochet patterns in three simple steps with our intuitive pattern builder.
            </p>
          </ScrollFadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSections.map((section, index) => (
              <ScrollFadeIn key={section.step} direction="up" delay={index * 200}>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      {section.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-primary-600">Step {section.step}</div>
                      <h3 className="text-xl font-semibold">{section.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  
                  <ul className="space-y-2">
                    {section.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <PiCheck className="w-4 h-4 text-primary-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollFadeIn>
            ))}
          </div>

          <ScrollFadeIn delay={600}>
            <div className="text-center mt-12">
              <Link
                to="/pattern-builder"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <PiPencilSimple className="w-5 h-5 mr-2" />
                Start Creating Your Pattern
              </Link>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-center mb-4">About Us</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              KnottyPatterns was born from a shared passion for crochet and technology. We recognized the need for a modern, 
              intuitive tool that could help both beginners and experienced crocheters create, manage, and share their patterns. 
              Our mission is to make pattern creation accessible to everyone while fostering a supportive community of makers.
            </p>
          </ScrollFadeIn>

          <div className="grid md:grid-cols-2 gap-12">
            {team.map((member, index) => (
              <ScrollFadeIn key={member.name} direction="up" delay={index * 200}>
                <div className="flex flex-col items-center text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full object-cover mb-6 shadow-lg"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 max-w-md">{member.description}</p>
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