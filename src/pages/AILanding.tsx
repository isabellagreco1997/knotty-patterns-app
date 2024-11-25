import React from 'react';
import { Link } from 'react-router-dom';
import { PiLightning, PiRobot, PiMagicWand, PiPencilSimple, PiArrowRight, PiSparkle, PiHeart, PiHandshake, PiLightbulb, PiShieldCheck } from 'react-icons/pi';
import SEOHead from '../components/SEOHead';

const features = [
  {
    icon: <PiRobot className="w-6 h-6" />,
    title: "AI-Powered Design Generation",
    description: "Transform your ideas into visual designs using advanced AI technology. Simply describe your amigurumi idea, and watch it come to life."
  },
  {
    icon: <PiMagicWand className="w-6 h-6" />,
    title: "Pattern Creation",
    description: "Get AI-generated crochet patterns based on the generated designs. A great starting point for your creative projects."
  },
  {
    icon: <PiPencilSimple className="w-6 h-6" />,
    title: "Pattern Testing Tools",
    description: "Use our pattern builder to test and refine AI-generated patterns, ensuring they're perfect for your needs."
  }
];

const artistBenefits = [
  {
    icon: <PiLightbulb className="w-8 h-8" />,
    title: "Inspiration, Not Replacement",
    description: "AI is a tool to spark creativity, not replace your artistic vision. Use it to explore new ideas and overcome creative blocks."
  },
  {
    icon: <PiHandshake className="w-8 h-8" />,
    title: "Supporting Artists",
    description: "Our AI tool is designed to complement human creativity, not compete with it. It helps streamline the design process while keeping you in control."
  },
  {
    icon: <PiHeart className="w-8 h-8" />,
    title: "Community-Focused",
    description: "We believe in empowering crochet artists. AI-generated patterns require human expertise to test, refine, and perfect."
  },
  {
    icon: <PiShieldCheck className="w-8 h-8" />,
    title: "Ethical Guidelines",
    description: "We enforce strict guidelines requiring all AI-generated patterns to be human-tested and properly credited when shared."
  }
];

const showcaseExamples = [
  {
    prompt: "Cute baby elephant with a flower crown",
    image: "https://files.oaiusercontent.com/file-ErHhvnKBSQHd8Zu46TsLim?se=2024-11-25T08%3A46%3A43Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Df7ce8862-89b1-463f-b7cb-18892aae970b.webp&sig=4TCylArw3VxxoFhSEfreopt86JDYmQTnuCTPpGVVDdc%3D",
    pattern: "Magic ring with 6 sc\nRound 1: inc in each st (12)\nRound 2: *sc, inc* repeat 6 times (18)..."
  },
  {
    prompt: "Kawaii strawberry with a happy face",
    image: "https://files.oaiusercontent.com/file-AQBGmTD4hZYWQ9qqcLaF5S?se=2024-11-25T08%3A48%3A49Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D2bb384ce-f6a9-455e-a01c-7edc67186046.webp&sig=MoukmUQm7XDZW0GCCxGOPD0f9MZNoATgcbpiZplseqc%3D",
    pattern: "Magic ring with 6 sc\nRound 1: inc in each st (12)\nRound 2: sc in each st..."
  },
  {
    prompt: "Small sleeping fox amigurumi",
    image: "https://files.oaiusercontent.com/file-44YQGEFwuavLDLV67iqBqN?se=2024-11-25T08%3A49%3A29Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D84b7183b-f183-4c57-84cc-c19b069b5688.webp&sig=KYw/ljB81yz8KB1c%2BUm1HJRp1repyHX74iPVe92Is4U%3D",
    pattern: "Magic ring with 8 sc\nRound 1: inc in each st (16)\nRound 2: *sc, inc* repeat 8 times..."
  }
];

const testimonials = [
  {
    quote: "AI helps me quickly prototype new ideas. I still create the final patterns myself, but it's a great starting point for inspiration.",
    author: "Sarah M.",
    role: "Professional Pattern Designer",
    image: "https://images.unsplash.com/photo-1582838038154-a88f9a755f89?auto=format&fit=crop&q=80&w=100"
  },
  {
    quote: "I was skeptical at first, but I've found AI to be a helpful brainstorming tool. It's like having a creative assistant.",
    author: "Emily R.",
    role: "Indie Crochet Artist",
    image: "https://images.unsplash.com/photo-1615646589661-0e7bc0b2b6c3?auto=format&fit=crop&q=80&w=100"
  }
];

export default function AILanding() {
  return (
    <>
      <SEOHead
        title="Create Patterns with AI - KnottyPatterns"
        description="Transform your crochet ideas into reality with our AI-powered pattern generation. A tool to enhance, not replace, your creative process."
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        {/* Hero Section */}
      {/* Hero Section */}
      <div className="relative min-h-[80vh] bg-gradient-to-b from-primary-50 to-white overflow-hidden">
        {/* Floating Image Boxes - Desktop Only */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {/* Top Right Image */}
          <div className="absolute top-20 right-[15%] w-48 h-48 rotate-6 transform hover:rotate-0 transition-transform duration-500">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-primary-100 rounded-2xl opacity-20"></div>
              <img
                src="https://images.pexels.com/photos/7585853/pexels-photo-7585853.jpeg"
                alt="Crochet Example 1"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Bottom Left Image */}
          <div className="absolute bottom-32 left-[10%] w-40 h-40 -rotate-12 transform hover:rotate-0 transition-transform duration-500">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-secondary-100 rounded-2xl opacity-20"></div>
              <img
                src="https://images.pexels.com/photos/10585181/pexels-photo-10585181.jpeg"
                alt="Crochet Example 2"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Middle Right Image */}
          <div className="absolute top-1/2 right-[5%] w-36 h-36 rotate-12 transform hover:rotate-0 transition-transform duration-500">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-accent-100 rounded-2xl opacity-20"></div>
              <img
                src="https://images.pexels.com/photos/10585328/pexels-photo-10585328.jpeg"
                alt="Crochet Example 3"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary-200 rounded-full animate-pulse"></div>
            <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-secondary-200 rounded-full animate-pulse delay-75"></div>
            <div className="absolute bottom-1/4 left-1/2 w-5 h-5 bg-accent-200 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>

        {/* Mobile Background */}
        <div className="absolute inset-0 md:hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-600/10 to-primary-50/50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.1),transparent_30%),radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.1),transparent_30%)]"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-primary-800 mb-8">
              <PiRobot className="w-5 h-5 mr-2" />
              AI-Assisted Pattern Creation
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Enhance Your Creative Process
              <span className="block text-primary-600">with AI Assistance</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A tool designed to support, not replace, crochet artists. Get inspiration, prototype ideas faster, and focus on what matters most - your creativity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login?redirect=/get-inspiration"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors transform hover:scale-105"
              >
                <PiSparkle className="w-5 h-5 mr-2" />
                Try AI Pattern Generation
              </Link>
              <Link
                to="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-50 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-gradient-to-b from-white to-primary-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-primary-600 font-semibold tracking-wide uppercase text-sm">Showcase</span>
              <h2 className="mt-2 text-4xl font-bold text-gray-900">From Idea to Creation</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                See how AI assists in transforming simple prompts into detailed crochet patterns
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {showcaseExamples.map((example, index) => (
                <div 
                  key={index} 
                  className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    <img
                      src={example.image}
                      alt={example.prompt}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-white font-medium">
                          <span className="text-primary-200 text-sm block mb-1">Prompt:</span>
                          {example.prompt}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pattern Preview */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Generated Pattern</h3>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10" />
                        <div className="bg-gray-50 rounded-xl p-4 overflow-hidden max-h-32">
                          <pre className="text-xs text-gray-600 font-mono whitespace-pre-wrap">
                            {example.pattern}
                          </pre>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                        Beginner-friendly pattern
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                        Complete stitch counts
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-2" />
                        Step-by-step instructions
                      </div>
                    </div>

                  
                 
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-16 text-center">
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Each pattern is generated with AI assistance and refined through human expertise. 
                Start with AI-generated suggestions and make them your own.
              </p>
              <Link
                to="/login?redirect=/get-inspiration"
                className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
              >
                Try Pattern Generation
                <svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI as Your Creative Assistant
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how AI can enhance your crochet pattern creation process while keeping you in full creative control.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <PiLightning className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Rapid Prototyping</h3>
              <p className="text-gray-600">
                Generate initial pattern ideas quickly and iterate on them with AI assistance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-secondary-50 to-white p-8 rounded-2xl">
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-6">
                <PiMagicWand className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Creative Inspiration</h3>
              <p className="text-gray-600">
                Get fresh ideas and unique perspectives while maintaining your artistic vision.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent-50 to-white p-8 rounded-2xl">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-6">
                <PiSparkle className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Pattern Testing</h3>
              <p className="text-gray-600">
                Use AI-generated patterns as a starting point and refine them with your expertise.
              </p>
            </div>
          </div>
        </div>
      </section>


  

        {/* Artist Benefits Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">For Artists, By Artists</h2>
              <p className="text-xl text-gray-600">Understanding and addressing the concerns of the crochet community</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {artistBenefits.map((benefit, index) => (
                <div key={index} className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-xl">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                        {benefit.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        

        {/* How It Works Section */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">Your creative process, enhanced by AI</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Commitment Section */}
        <div className="py-24 bg-primary-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Commitment to Artists</h2>
              <p className="text-xl text-primary-100">We believe in ethical AI that empowers, not replaces, human creativity</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-primary-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Human-First Approach</h3>
                <p className="text-primary-100">AI-generated patterns require human testing and refinement. Your expertise is irreplaceable.</p>
              </div>
              <div className="bg-primary-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Fair Attribution</h3>
                <p className="text-primary-100">Clear guidelines for crediting both AI assistance and human refinement in all patterns.</p>
              </div>
              <div className="bg-primary-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Community Support</h3>
                <p className="text-primary-100">Regular updates based on artist feedback to better serve the crochet community.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Artists Say</h2>
              <p className="text-xl text-gray-600">Real experiences from the crochet community</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-xl">
                  <div className="flex items-start">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <p className="text-gray-600 italic mb-4">{testimonial.quote}</p>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

  

        {/* FAQ Section */}
        <div className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Questions</h2>
              <p className="text-xl text-gray-600">Addressing your concerns about AI in crochet</p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Will AI replace crochet artists?</h3>
                <p className="text-gray-600">No. AI is a tool to enhance your creative process, not replace it. The human touch, expertise, and creativity are irreplaceable in creating quality crochet patterns.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">How does AI benefit crochet artists?</h3>
                <p className="text-gray-600">AI helps streamline the ideation process, provides inspiration, and handles repetitive tasks. This lets you focus more on the creative aspects you love.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Are AI-generated patterns safe to sell?</h3>
                <p className="text-gray-600">AI-generated patterns should only be sold after thorough human testing and refinement. We encourage treating AI patterns as starting points that require your expertise to perfect.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-primary-900 text-white py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Creative Process?</h2>
            <p className="text-xl mb-8 text-primary-100">
              Join KnottyPatterns today and discover how AI can support your crochet journey while respecting your artistry.
            </p>
            <Link
              to="/login?redirect=/get-inspiration"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-900 rounded-xl hover:bg-primary-50 transition-colors"
            >
              Get Started Now
              <PiArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}