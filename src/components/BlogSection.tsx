import { useState } from 'react';
import { Calendar, User, ArrowRight, Clock, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  likes: number;
  comments: number;
  isNew?: boolean;
}

interface BlogSectionProps {
  isDark?: boolean;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Pet Fashion Trends for 2024',
    excerpt: 'Discover the latest trends in pet fashion that will make your furry friend the most stylish on the block.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Fashion Trends',
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    likes: 124,
    comments: 18,
    isNew: true
  },
  {
    id: '2',
    title: 'How to Choose the Right Size for Your Pet',
    excerpt: 'A comprehensive guide to measuring your pet and selecting the perfect fit for maximum comfort.',
    author: 'Dr. Michael Chen',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'Size Guide',
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    likes: 89,
    comments: 12
  },
  {
    id: '3',
    title: 'Seasonal Pet Care: Winter Fashion Tips',
    excerpt: 'Keep your pets warm and stylish during the cold months with our expert winter fashion advice.',
    author: 'Emma Rodriguez',
    date: '2024-01-05',
    readTime: '4 min read',
    category: 'Seasonal Care',
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    likes: 156,
    comments: 23,
    isNew: true
  }
];

export default function BlogSection({ isDark = false }: BlogSectionProps) {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  return (
    <section className={`py-16 px-4 md:px-8 lg:px-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-coiny mb-4 gradient-text`}>
            Latest News & Events
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Stay updated with the latest trends, tips, and news from the world of pet fashion
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.id}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover-lift transition-all duration-300 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {post.isNew && (
                    <Badge className="bg-green-500 text-white font-semibold">NEW</Badge>
                  )}
                  <Badge className={`${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                    {post.category}
                  </Badge>
                </div>

                {/* Like Button */}
                <button
                  onClick={() => handleLike(post.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-semibold line-clamp-2 group-hover:text-green-500 transition-colors ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className={`text-sm line-clamp-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {post.excerpt}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-1 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <Heart className="w-4 h-4" />
                      <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                    </div>
                    <div className={`flex items-center space-x-1 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 p-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="gradient-primary hover:opacity-90 hover:scale-105 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => {
              window.location.href = '/blog';
            }}
          >
            View All Articles <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}