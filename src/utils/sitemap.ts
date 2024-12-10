import { stitchData } from '../data/stitchData';
import contentful from 'contentful';
import { supabase } from '../lib/supabase-node';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export interface BlogPost {
  fields: {
    slug: string;
    publishedDate: string;
  };
}

const BASE_URL = 'https://knottypatterns.com';

export const STATIC_URLS: SitemapUrl[] = [
  {
    loc: BASE_URL,
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
    loc: `${BASE_URL}/stitch-glossary`,
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
  },
  {
    loc: `${BASE_URL}/free-patterns`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '0.9'
  },
  ...stitchData.map(stitch => ({
    loc: `${BASE_URL}/stitch/${stitch.slug}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.8'
  }))
];

export async function getFreePatternUrls(): Promise<SitemapUrl[]> {
  try {
    const { data: patterns, error } = await supabase
      .from('freepatterns')
      .select('id, last_updated')
      .eq('approved', true);

    if (error) throw error;

    return (patterns || []).map(pattern => ({
      loc: `${BASE_URL}/free-patterns/${pattern.id}`,
      lastmod: new Date(pattern.last_updated).toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8'
    }));
  } catch (error) {
    console.error('Error fetching free patterns:', error);
    return [];
  }
}

export async function getBlogUrls(): Promise<SitemapUrl[]> {
  const client = contentful.createClient({
    space: process.env.VITE_CONTENTFUL_SPACE_ID!,
    accessToken: process.env.VITE_CONTENTFUL_ACCESS_TOKEN!,
    environment: process.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'
  });

  try {
    const entries = await client.getEntries<BlogPost>({
      content_type: 'pageBlogPost',
      order: '-fields.publishedDate',
      include: 1
    });

    return entries.items.map(post => ({
      loc: `${BASE_URL}/blog/${post.fields.slug}`,
      lastmod: new Date(post.fields.publishedDate).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.6'
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getAllUrls(): Promise<SitemapUrl[]> {
  try {
    const [blogUrls, freePatternUrls] = await Promise.all([
      getBlogUrls(),
      getFreePatternUrls()
    ]);

    return [...STATIC_URLS, ...blogUrls, ...freePatternUrls];
  } catch (error) {
    console.error('Error getting all URLs:', error);
    return STATIC_URLS;
  }
}

export function generateSitemapXml(urls: SitemapUrl[]): string {
  const cleanUrls = urls.map(url => ({
    ...url,
    loc: url.loc.replace(/([^:]\/)\/+/g, '$1') // Remove duplicate slashes
  }));

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${cleanUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}