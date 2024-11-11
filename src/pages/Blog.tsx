import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiCalendar, PiUser, PiArrowRight, PiSpinner, PiTag } from 'react-icons/pi';
import { getBlogPosts, BlogPost } from '../lib/contentful';
import SEOHead from '../components/SEOHead';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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

  // Extract unique tags from all posts
  const allTags = Array.from(new Set(posts.flatMap(post => post.fields.tags || [])));

  // Filter posts by selected tag
  const filteredPosts = selectedTag
    ? posts.filter(post => post.fields.tags?.includes(selectedTag))
    : posts;

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
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Crochet Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Discover tips, tutorials, and inspiration for your crochet journey
            </p>
            
            {/* Tags Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedTag 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Posts
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {filteredPosts[0] && (
            <div className="mb-16">
              <Link
                to={`/blog/${filteredPosts[0].fields.slug}`}
                className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                {filteredPosts[0].fields.featuredImage && (
                  <div className="relative h-[400px]">
                    <img
                      src={`https:${filteredPosts[0].fields.featuredImage.fields.file.url}`}
                      alt={filteredPosts[0].fields.featuredImage.fields.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h2 className="text-3xl font-bold mb-4">{filteredPosts[0].fields.title}</h2>
                      <p className="text-lg text-white/90 mb-4">{filteredPosts[0].fields.shortDescription}</p>
                      <div className="flex items-center text-sm text-white/80">
                        <span className="inline-flex items-center">
                          <PiCalendar className="w-4 h-4 mr-1" />
                          {new Date(filteredPosts[0].fields.publishedDate).toLocaleDateString()}
                        </span>
                        {filteredPosts[0].fields.author && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="inline-flex items-center">
                              <PiUser className="w-4 h-4 mr-1" />
                              {filteredPosts[0].fields.author.fields.name}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          )}

          {/* Grid of Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <article key={post.sys.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                {post.fields.featuredImage && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`https:${post.fields.featuredImage.fields.file.url}`}
                      alt={post.fields.featuredImage.fields.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  {post.fields.tags && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.fields.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          <PiTag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    <Link to={`/blog/${post.fields.slug}`}>
                      {post.fields.title}
                    </Link>
                  </h2>
                  
                  {post.fields.shortDescription && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.fields.shortDescription}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <PiCalendar className="w-4 h-4 mr-1" />
                      {new Date(post.fields.publishedDate).toLocaleDateString()}
                    </div>
                    <Link
                      to={`/blog/${post.fields.slug}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Read More
                      <PiArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}