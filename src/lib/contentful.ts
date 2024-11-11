import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID!,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN!,
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
});

export interface BlogPost {
  sys: {
    id: string;
  };
  fields: {
    internalName: string;
    seoFields?: {
      fields: {
        title: string;
        description: string;
        image?: {
          fields: {
            file: {
              url: string;
            };
          };
        };
      };
    };
    slug: string;
    author?: {
      fields: {
        name: string;
        avatar?: {
          fields: {
            file: {
              url: string;
            };
          };
        };
      };
    };
    publishedDate: string;
    title: string;
    shortDescription?: string;
    featuredImage: {
      fields: {
        file: {
          url: string;
        };
        title: string;
      };
    };
    content: any; // Rich text content
    relatedBlogPosts?: Array<{
      fields: BlogPost['fields'];
    }>;
  };
}

export async function getBlogPosts() {
  try {
    const response = await client.getEntries<BlogPost>({
      content_type: 'pageBlogPost',
      order: '-fields.publishedDate',
      include: 2,
    });

    return response.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export async function getBlogPost(slug: string) {
  try {
    const response = await client.getEntries<BlogPost>({
      content_type: 'pageBlogPost',
      'fields.slug': slug,
      include: 2,
    });

    return response.items[0];
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}