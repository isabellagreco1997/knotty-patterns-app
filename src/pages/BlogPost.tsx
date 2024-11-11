import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PiCalendar, PiUser, PiArrowLeft } from 'react-icons/pi';
import { getBlogPost, BlogPost } from '../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text: React.ReactNode) => <u>{text}</u>,
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="px-2 py-1 bg-gray-100 rounded">{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
      <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-8">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
      <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
      <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-primary-500 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-t border-gray-200" />,
    [BLOCKS.TABLE]: (node: any, children: React.ReactNode) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200">
          {children}
        </table>
      </div>
    ),
  },
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
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
    <div className="max-w-4xl mx-auto px-4 py-16">
      <article>
        {post.fields.featuredImage && (
          <img
            src={`https:${post.fields.featuredImage.fields.file.url}`}
            alt={post.fields.featuredImage.fields.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
          />
        )}

        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.fields.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
          <span className="inline-flex items-center">
            <PiCalendar className="w-4 h-4 mr-1" />
            {new Date(post.fields.publishedDate).toLocaleDateString()}
          </span>

          {post.fields.author && (
            <span className="inline-flex items-center">
              <PiUser className="w-4 h-4 mr-1" />
              {post.fields.author.fields.name}
            </span>
          )}
        </div>

        {post.fields.shortDescription && (
          <p className="text-xl text-gray-600 mb-8 font-light">
            {post.fields.shortDescription}
          </p>
        )}

        <div className="prose prose-lg max-w-none">
          {documentToReactComponents(post.fields.content, richTextOptions)}
        </div>

        {post.fields.relatedBlogPosts && post.fields.relatedBlogPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {post.fields.relatedBlogPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.fields.slug}
                  to={`/blog/${relatedPost.fields.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden group-hover:shadow-md transition-shadow">
                    {relatedPost.fields.featuredImage && (
                      <img
                        src={`https:${relatedPost.fields.featuredImage.fields.file.url}`}
                        alt={relatedPost.fields.featuredImage.fields.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
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
      </article>
    </div>
  );
}