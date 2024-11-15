import { writeFileSync } from 'fs';
import { join } from 'path';
import contentful from 'contentful';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const BASE_URL = 'https://knottypatterns.com';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

interface BlogPost {
  fields: {
    slug: string;
    publishedDate: string;
  };
}

const STATIC_URLS: SitemapUrl[] = [
  {
    loc: `${BASE_URL}/`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '1.0'
  },
  {
    loc: `${BASE_URL}/pattern-builder`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    loc: `${BASE_URL}/blog`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    loc: `${BASE_URL}/pricing`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.7'
  }
];

async function generateSitemap(): Promise<void> {
  try {
    // Initialize Contentful client
    const client = contentful.createClient({
      space: process.env.VITE_CONTENTFUL_SPACE_ID!,
      accessToken: process.env.VITE_CONTENTFUL_ACCESS_TOKEN!,
      environment: process.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'
    });

    // Get all published blog posts
    const entries = await client.getEntries<BlogPost>({
      content_type: 'pageBlogPost',
      order: '-fields.publishedDate',
      include: 1
    });

    // Generate blog post URLs
    const blogUrls: SitemapUrl[] = entries.items.map(post => ({
      loc: `${BASE_URL}/blog/${post.fields.slug}`,
      lastmod: new Date(post.fields.publishedDate).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.6'
    }));

    // Combine all URLs
    const allUrls = [...STATIC_URLS, ...blogUrls];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

    // Write sitemap to public directory
    writeFileSync(join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();