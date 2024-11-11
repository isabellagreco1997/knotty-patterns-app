import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiCalendar, PiUser, PiArrowRight, PiSpinner } from 'react-icons/pi';
import { getBlogPosts, BlogPost } from '../lib/contentful';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <PiSpinner className="w-8 h-8 animate-spin text-primary-600" />
          <span>Loading posts...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops!</h1>
            <p className="text-lg text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <SEOHead 
        title="Crochet Blog - Tips, Tutorials & Inspiration"
        description="Discover crochet tips, tutorials, and inspiration. Learn new techniques, find free patterns, and improve your crochet skills."
        type="blog"
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "KnottyPatterns Blog",
          "description": "Crochet tips, tutorials, and inspiration",
          "url": "https://knottypatterns.com/blog"
        }}
      />
    <div className="py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Crochet Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover tips, tutorials, and inspiration for your crochet journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.sys.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              {post.fields.featuredImage && (
                <img
                  src={`https:${post.fields.featuredImage.fields.file.url}`}
                  alt={post.fields.featuredImage.fields.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="inline-flex items-center">
                    <PiCalendar className="w-4 h-4 mr-1" />
                    {new Date(post.fields.publishedDate).toLocaleDateString()}
                  </span>
                  {post.fields.author && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="inline-flex items-center">
                        <PiUser className="w-4 h-4 mr-1" />
                        {post.fields.author.fields.name}
                      </span>
                    </>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.fields.title}
                </h2>
                {post.fields.shortDescription && (
                  <p className="text-gray-600 mb-4">
                    {post.fields.shortDescription}
                  </p>
                )}
                <Link
                  to={`/blog/${post.fields.slug}`}
                  className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium"
                >
                  Read More
                  <PiArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}