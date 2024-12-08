import React from 'react';
import { Link } from 'react-router-dom';
import { PiScissors, PiInstagramLogo, PiTwitterLogo, PiEnvelope, PiHeart, PiSparkle } from 'react-icons/pi';

const Footer: React.FC = () => {
  const productLinks = [
    { name: "Pattern Builder", path: "/pattern-builder" },
    { name: "AI Generator", path: "/get-inspiration" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" }
  ];

  const supportLinks = [
    { name: "Help Center", path: "/help" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms" }
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Stitch Glossary", path: "/stitch-glossary" },
    { name: "How It Works", path: "/how-it-works" }
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900 to-primary-900"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce">✨</div>
      <div className="absolute top-20 right-10 text-4xl animate-bounce delay-100">🧶</div>
      <div className="absolute bottom-10 left-1/4 text-4xl animate-bounce delay-200">🎨</div>

      <div className="relative max-w-6xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <PiScissors className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-primary-200 text-transparent bg-clip-text">
                KnottyPatterns
              </span>
            </Link>
            <p className="text-white/80">
              Create beautiful crochet patterns with AI-powered magic! ✨
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                <PiInstagramLogo className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                <PiTwitterLogo className="w-5 h-5 text-white" />
              </a>
              <a href="mailto:hello@knottypatterns.com" className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                <PiEnvelope className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center">
              <PiSparkle className="w-5 h-5 mr-2" />
              Product
            </h3>
            <ul className="space-y-4">
              {productLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center">
              <PiHeart className="w-5 h-5 mr-2" />
              Support
            </h3>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center">
              <PiSparkle className="w-5 h-5 mr-2" />
              Company
            </h3>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © {new Date().getFullYear()} KnottyPatterns. Made with 
              <PiHeart className="w-4 h-4 mx-1 inline text-red-400" />
              for crocheters
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;