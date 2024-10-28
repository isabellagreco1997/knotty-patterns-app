import React from 'react';
import { Link } from 'react-router-dom';
import { PiCalendar, PiArrowRight } from 'react-icons/pi';

const featuredPosts = [
  {
    id: 1,
    title: "10 Essential Tips for Amigurumi Beginners",
    excerpt: "Master the basics of amigurumi with these beginner-friendly tips...",
    image: "https://images.pexels.com/photos/10585162/pexels-photo-10585162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "2024-02-20"
  },
  {
    id: 2,
    title: "Understanding Crochet Pattern Terminology",
    excerpt: "A comprehensive guide to reading and understanding crochet patterns...",
    image: "https://images.pexels.com/photos/10585162/pexels-photo-10585162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "2024-02-18"
  },
  {
    id: 3,
    title: "Color Theory in Crochet Projects",
    excerpt: "Learn how to choose and combine colors effectively...",
    image: "https://images.pexels.com/photos/10585162/pexels-photo-10585162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "2024-02-15"
  }
];

export default function BlogPreview() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Latest from Our Blog</h2>
          <Link
            to="/blog"
            className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium"
          >
            View All Posts
            <PiArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <PiCalendar className="w-4 h-4 mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
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
    </section>
  );
}