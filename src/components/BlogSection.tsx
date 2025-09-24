import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Digital Innovation",
      excerpt: "Explore how emerging technologies are reshaping the business landscape and creating new opportunities for growth.",
      author: "John Smith",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Technology"
    },
    {
      id: 2,
      title: "Building Sustainable Business Models",
      excerpt: "Learn how companies are integrating sustainability into their core business strategies for long-term success.",
      author: "Sarah Johnson",
      date: "March 12, 2024",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Business"
    },
    {
      id: 3,
      title: "Customer Experience in the Digital Age",
      excerpt: "Discover strategies for creating exceptional customer experiences that drive loyalty and business growth.",
      author: "Mike Chen",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Customer Success"
    }
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay updated with our latest thoughts on industry trends, best practices, and innovative solutions.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                  <span>Read More</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
            View All Posts
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;