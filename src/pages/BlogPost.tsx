import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PiCalendar, PiUser, PiArrowLeft, PiSpinner, PiTag, PiShare, PiCopy, PiTwitterLogo, PiFacebookLogo } from 'react-icons/pi';
import { getBlogPost, BlogPost } from '../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import SEOHead from '../components/SEOHead';

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text: React.ReactNode) => <u>{text}</u>,
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="px-2 py-1 bg-gray-100 rounded font-mono text-sm">{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
      <p className="mb-6 text-gray-700 leading-relaxed text-lg">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
      <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-12">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
      <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-10">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
      <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
      <ul className="mb-6 space-y-2 list-disc pl-4">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
      <ol className="mb-6 space-y-2 list-decimal pl-4">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
      <li className="text-gray-700 pl-1 marker:text-primary-500 text-lg">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
      <blockquote className="my-8 pl-6 border-l-4 border-primary-500 italic">
        <div className="text-xl text-gray-700">{children}</div>
      </blockquote>
    ),
    [BLOCKS.HR]: () => (
      <hr className="my-12 border-t-2 border-gray-100 w-1/3 mx-auto" />
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { title, description, file } = node.data.target.fields;
      const imageUrl = file?.url;
      if (!imageUrl) return null;

      return (
        <figure className="my-8">
          <div className="rounded-lg overflow-hidden bg-gray-100">
            <img
              src={`https:${imageUrl}`}
              alt={description || title}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          {description && (
            <figcaption className="mt-2 text-sm text-center text-gray-600 italic">
              {description}
            </figcaption>
          )}
        </figure>
      );
    },
    [BLOCKS.TABLE]: (node: any, children: React.ReactNode) => (
      <div className="my-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
          {children}
        </table>
      </div>
    ),
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => {
      const { uri } = node.data;
      const isExternal = uri.startsWith('http');
      return (
        <a
          href={uri}
          className="text-primary-600 hover:text-primary-700 underline"
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {children}
        </a>
      );
    },
  },
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  useEffect(() => {
    async function loadPost() {
      try {
        if (!slug) throw new Error('Post not found');
        const data = await getBlogPost(slug);
        if (!data) throw new Error('Post not found');
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.fields.title,
          text: post?.fields.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops!</h1>
          <p className="text-lg text-gray-600 mb-8">{error || 'Post not found'}</p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
          >
            <PiArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={post.fields.title}
        description={post.fields.shortDescription || ''}
        image={post.fields.featuredImage?.fields.file.url}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.fields.title,
          "image": post.fields.featuredImage?.fields.file.url,
          "datePublished": post.fields.publishedDate,
          "dateModified": post.fields.publishedDate,
          "author": {
            "@type": "Person",
            "name": post.fields.author?.fields.name
          }
        }}
      />

      <article className="min-h-screen bg-white">
        {/* Hero Section */}
        {post.fields.featuredImage && (
          <div className="relative h-[60vh] min-h-[400px] max-h-[600px]">
            <img
              src={`https:${post.fields.featuredImage.fields.file.url}`}
              alt={post.fields.featuredImage.fields.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          </div>
        )}

        {/* Content Container */}
        <div className="max-w-4xl mx-auto px-4 -mt-32 relative z-10">
          {/* Back to Blog Link */}
          <Link
            to="/blog"
            className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-600 hover:bg-white transition-colors mb-6"
          >
            <PiArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          {/* Article Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* Tags */}
            {post.fields.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.fields.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    <PiTag className="w-4 h-4 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.fields.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b">
              <div className="flex items-center">
                <PiCalendar className="w-4 h-4 mr-2" />
                {new Date(post.fields.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>

              {post.fields.author && (
                <div className="flex items-center">
                  <PiUser className="w-4 h-4 mr-2" />
                  {post.fields.author.fields.name}
                </div>
              )}

              {/* Share Button */}
              <div className="relative ml-auto">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <PiShare className="w-4 h-4 mr-1" />
                  Share
                </button>
                {showShareTooltip && (
                  <div className="absolute right-0 -top-10 bg-gray-800 text-white text-sm px-3 py-1 rounded">
                    Copied!
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {documentToReactComponents(post.fields.content, richTextOptions)}
            </div>

            {/* Social Share */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.fields.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <PiTwitterLogo className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <PiFacebookLogo className="w-5 h-5" />
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setShowShareTooltip(true);
                    setTimeout(() => setShowShareTooltip(false), 2000);
                  }}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <PiCopy className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {post.fields.relatedBlogPosts && post.fields.relatedBlogPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {post.fields.relatedBlogPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.fields.slug}
                    to={`/blog/${relatedPost.fields.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden group-hover:shadow-md transition-shadow">
                      {relatedPost.fields.featuredImage && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={`https:${relatedPost.fields.featuredImage.fields.file.url}`}
                            alt={relatedPost.fields.featuredImage.fields.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {relatedPost.fields.title}
                        </h3>
                        {relatedPost.fields.shortDescription && (
                          <p className="text-gray-600 line-clamp-2">
                            {relatedPost.fields.shortDescription}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}