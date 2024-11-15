import { Handler, schedule } from '@netlify/functions';
import { writeFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';
import { STATIC_URLS, getBlogUrls, generateSitemapXml } from '../../src/utils/sitemap';

dotenv.config();

const generateSitemap: Handler = async (event, context) => {
  try {
    // Get blog post URLs
    const blogUrls = await getBlogUrls();

    // Combine all URLs
    const allUrls = [...STATIC_URLS, ...blogUrls];

    // Generate sitemap XML
    const sitemap = generateSitemapXml(allUrls);
    
    // Write sitemap to the public directory
    writeFileSync(join(process.cwd(), 'public', 'sitemap.xml'), sitemap);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Sitemap generated successfully' })
    };
  } catch (error) {
    console.error('Error in sitemap generation:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate sitemap' })
    };
  }
};

// Schedule the function to run daily at midnight
export const handler = schedule('0 0 * * *', generateSitemap);