import React from 'react';
import { Link } from 'react-router-dom';
import { PiCalendar, PiUser, PiArrowRight } from 'react-icons/pi';

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Tips for Amigurumi Beginners",
    excerpt: "Master the basics of amigurumi with these beginner-friendly tips and tricks that will help you create adorable crochet creatures.",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=600",
    author: "Emma Thompson",
    date: "2024-02-20",
    category: "Tutorials"
  },
  {
    id: 2,
    title: "Understanding Crochet Pattern Terminology",
    excerpt: "A comprehensive guide to reading and understanding crochet patterns, from basic abbreviations to complex instructions.",
    image: "https://images.unsplash.com/photo-1615646589661-0e7bc0b2b6c3?auto=format&fit=crop&q=80&w=600",
    author: "Sarah Parker",
    date: "2024-02-18",
    category: "Education"
  },
  {
    id: 3,
    title: "Color Theory in Crochet Projects",
    excerpt: "Learn how to choose and combine colors effectively to create stunning crochet projects that catch the eye.",
    image: "https://images.unsplash.com/photo-1612870466688-277d0f8f5082?auto=format&fit=crop&q=80&w=600",
    author: "Michael Chen",
    date: "2024-02-15",
    category: "Design"
  }
];

export default function Blog() {
  return (
    <div className="py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Crochet Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover tips, tutorials, and inspiration for your crochet journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="inline-flex items-center">
                    <PiCalendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="inline-flex items-center">
                    <PiUser className="w-4 h-4 mr-1" />
                    {post.author}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.id}`}
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
  );
}