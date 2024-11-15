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
    content: any;
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
      'fields.slug[match]': slug,
      include: 2,
    });

    if (!response.items.length) {
      throw new Error('Post not found');
    }

    return response.items[0];
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}

export async function createBlogPost(post: any) {
  try {
    const entry = await client.getSpace(import.meta.env.VITE_CONTENTFUL_SPACE_ID!).then(space => 
      space.createEntry('pageBlogPost', {
        fields: post
      })
    );
    
    // Trigger sitemap regeneration via Netlify function
    await fetch('/.netlify/functions/generate-sitemap', {
      method: 'POST'
    });
    
    return entry;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

export async function updateBlogPost(id: string, updates: any) {
  try {
    const space = await client.getSpace(import.meta.env.VITE_CONTENTFUL_SPACE_ID!);
    const entry = await space.getEntry(id);
    
    Object.keys(updates).forEach(key => {
      entry.fields[key] = updates[key];
    });
    
    const updatedEntry = await entry.update();
    
    // Trigger sitemap regeneration via Netlify function
    await fetch('/.netlify/functions/generate-sitemap', {
      method: 'POST'
    });
    
    return updatedEntry;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

export async function deleteBlogPost(id: string) {
  try {
    const space = await client.getSpace(import.meta.env.VITE_CONTENTFUL_SPACE_ID!);
    await space.getEntry(id).then(entry => entry.delete());
    
    // Trigger sitemap regeneration via Netlify function
    await fetch('/.netlify/functions/generate-sitemap', {
      method: 'POST'
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}