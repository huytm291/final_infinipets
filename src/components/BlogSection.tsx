import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Clock, Heart, MessageCircle, Share2, Bookmark, Eye } from 'lucide-react';
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
  views: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface BlogSectionProps {
  isDark?: boolean;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Pet Fashion Trends for 2024',
    excerpt: 'Discover the latest trends in pet fashion that will make your furry friend the most stylish on the block. From sustainable materials to smart accessories, explore what\'s trending this year.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Fashion Trends',
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    likes: 124,
    comments: 18,
    views: 2847,
    isNew: true,
    isFeatured: true
  },
  {
    id: '2',
    title: 'How to Choose the Right Size for Your Pet',
    excerpt: 'A comprehensive guide to measuring your pet and selecting the perfect fit for maximum comfort. Learn professional tips from veterinarians and pet stylists.',
    author: 'Dr. Michael Chen',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'Size Guide',
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    likes: 89,
    comments: 12,
    views: 1923
  },
  {
    id: '3',
    title: 'Seasonal Pet Care: Winter Fashion Tips',
    excerpt: 'Keep your pets warm and stylish during the cold months with our expert winter fashion advice. Discover the best materials and designs for cold weather.',
    author: 'Emma Rodriguez',
    date: '2024-01-05',
    readTime: '4 min read',
    category: 'Seasonal Care',
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    likes: 156,
    comments: 23,
    views: 3156,
    isNew: true
  }
];

export default function BlogSection({ isDark = false }: BlogSectionProps) {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    // Staggered animation for cards appearing
    BLOG_POSTS.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 200);
    });
  }, []);

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

  const handleBookmark = (postId: string) => {
    setBookmarkedPosts(prev => {
      const newBookmarked = new Set(prev);
      if (newBookmarked.has(postId)) {
        newBookmarked.delete(postId);
      } else {
        newBookmarked.add(postId);
      }
      return newBookmarked;
    });
  };

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    }
  };

  return (
    <section className={`py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-200/10 to-emerald-200/10 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-teal-200/10 to-cyan-200/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-lime-200/10 to-green-200/10 rounded-full animate-float-reverse"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-emerald-200/10 to-teal-200/10 rounded-full animate-float-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-coiny text-4xl md:text-5xl mb-6 gradient-text animate-text-glow relative">
            Latest News & Events 📰
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 mx-auto mb-6 rounded-full animate-expand"></div>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Stay updated with the latest trends, tips, and news from the world of pet fashion. 
            Discover expert insights and community stories.
          </p>
        </div>

        {/* Enhanced Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {BLOG_POSTS.map((post, index) => (
            <article 
              key={post.id}
              className={`group relative overflow-hidden cursor-pointer transform transition-all duration-700 ${
                visibleCards.includes(index)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              } ${
                hoveredCard === index 
                  ? 'scale-105 shadow-2xl' 
                  : 'hover:scale-102 hover:shadow-xl'
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Newspaper-style card with premium effects */}
              <div className={`relative rounded-2xl overflow-hidden shadow-lg border-0 ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}>
                
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-emerald-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Animated border */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-border-glow"></div>
                <div className={`absolute inset-[1px] rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}></div>

                {/* Content wrapper */}
                <div className="relative z-10">
                  {/* Enhanced Image Section */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        hoveredCard === index 
                          ? 'scale-110 brightness-110' 
                          : 'scale-100'
                      }`}
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Enhanced Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {post.isFeatured && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold shadow-lg animate-pulse">
                          ⭐ FEATURED
                        </Badge>
                      )}
                      {post.isNew && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg">
                          ✨ NEW
                        </Badge>
                      )}
                      <Badge className={`backdrop-blur-sm font-medium ${
                        isDark ? 'bg-gray-800/80 text-gray-200' : 'bg-white/80 text-gray-700'
                      }`}>
                        {post.category}
                      </Badge>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(post.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                          likedPosts.has(post.id) 
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' 
                            : 'bg-white/80 text-gray-600 hover:bg-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmark(post.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                          bookmarkedPosts.has(post.id) 
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
                            : 'bg-white/80 text-gray-600 hover:bg-white'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedPosts.has(post.id) ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(post);
                        }}
                        className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white backdrop-blur-sm transition-all duration-300 hover:scale-110"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Reading time overlay */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Content Section */}
                  <div className="p-6 space-y-4">
                    {/* Enhanced Meta Info */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className={`flex items-center space-x-1 transition-colors duration-300 ${
                          isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-700'
                        }`}>
                          <User className="w-4 h-4" />
                          <span className="font-medium">{post.author}</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <Eye className="w-4 h-4" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Enhanced Title */}
                    <h3 className={`text-xl font-bold line-clamp-2 transition-all duration-300 ${
                      isDark ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-600'
                    }`}>
                      {post.title}
                    </h3>

                    {/* Enhanced Excerpt - REMOVED the sliding green bar effect */}
                    <div className="relative">
                      <p className={`text-sm line-clamp-3 leading-relaxed ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Enhanced Stats & Action */}
                    <div className={`flex items-center justify-between pt-4 border-t transition-colors duration-300 ${
                      isDark ? 'border-gray-700 group-hover:border-gray-600' : 'border-gray-200 group-hover:border-gray-300'
                    }`}>
                      <div className="flex items-center space-x-4">
                        <div className={`flex items-center space-x-1 text-sm transition-colors duration-300 ${
                          likedPosts.has(post.id) 
                            ? 'text-red-500' 
                            : isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
                        }`}>
                          <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                          <span className="font-medium">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                        </div>
                        <div className={`flex items-center space-x-1 text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <MessageCircle className="w-4 h-4" />
                          <span className="font-medium">{post.comments}</span>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 p-2 transition-all duration-300 hover:scale-110"
                      >
                        <span className="sr-only">Read more</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center animate-fade-in-up-delayed">
          <div className="flex justify-center space-x-2 mb-6">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
          <Button 
            size="lg" 
            className="gradient-primary hover:opacity-90 hover:scale-105 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden group"
            onClick={() => {
              window.location.href = '/blog';
            }}
          >
            <span className="relative z-10 flex items-center">
              View All Articles 
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
          <p className={`mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Discover more stories and insights from our community! 📖
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(90deg); }
        }
        
        @keyframes text-glow {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
            transform: scale(1);
          }
          50% { 
            text-shadow: 0 0 30px rgba(34, 197, 94, 0.6), 0 0 40px rgba(16, 185, 129, 0.4);
            transform: scale(1.02);
          }
        }
        
        @keyframes expand {
          0% { width: 0; }
          100% { width: 8rem; }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up-delayed {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes border-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 2s;
        }
        
        .animate-float-reverse {
          animation: float-reverse 7s ease-in-out infinite 1s;
        }
        
        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }
        
        .animate-expand {
          animation: expand 1s ease-out 0.5s both;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-fade-in-up-delayed {
          animation: fade-in-up-delayed 1s ease-out 1.5s both;
        }
        
        .animate-border-glow {
          animation: border-glow 2s ease-in-out infinite;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}