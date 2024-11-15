import { writeFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';
import { STATIC_URLS, getBlogUrls, generateSitemapXml } from '../src/utils/sitemap';

// Load environment variables
dotenv.config();

async function generateSitemap(): Promise<void> {
  try {
    // Get blog post URLs
    const blogUrls = await getBlogUrls();

    // Combine all URLs
    const allUrls = [...STATIC_URLS, ...blogUrls];

    // Generate sitemap XML
    const sitemap = generateSitemapXml(allUrls);

    // Write sitemap to public directory
    writeFileSync(join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();