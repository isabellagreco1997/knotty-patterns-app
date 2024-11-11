import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: object;
}

export default function SEOHead({
  title,
  description,
  image = '/social-preview.png',
  url = 'https://knottypatterns.com',
  type = 'website',
  schema
}: SEOHeadProps) {
  const fullTitle = `${title} | KnottyPatterns`;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "KnottyPatterns",
    "description": "Create, save, and share your crochet patterns with our intuitive pattern builder",
    "url": "https://knottypatterns.com",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "KnottyPatterns",
      "url": "https://knottypatterns.com"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO Meta Tags */}
      <meta name="keywords" content="crochet patterns, amigurumi, pattern maker, crochet designer, pattern generator, crochet tools, knitting patterns" />
      <meta name="author" content="KnottyPatterns" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Mobile Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#7C3AED" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>

      {/* Preconnect to Important Origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
}