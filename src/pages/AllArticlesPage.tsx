import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Clock, Heart, MessageCircle, Share2, Bookmark, Eye, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import EnhancedHeader from '@/components/Header';
import Footer from '@/components/Footer';

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

interface AllArticlesPageProps {
  isDark?: boolean;
}

// Extended blog posts list for the all articles page
const ALL_BLOG_POSTS: BlogPost[] = [
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
  },
  {
    id: '4',
    title: 'Pet Photography: Capturing the Perfect Shot',
    excerpt: 'Learn professional techniques for photographing your pets in their fashionable outfits. Tips from award-winning pet photographers.',
    author: 'James Wilson',
    date: '2024-01-02',
    readTime: '6 min read',
    category: 'Photography',
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    likes: 203,
    comments: 34,
    views: 4521,
    isFeatured: true
  },
  {
    id: '5',
    title: 'Sustainable Pet Fashion: Eco-Friendly Choices',
    excerpt: 'Explore environmentally conscious options for your pet\'s wardrobe. Discover brands and materials that are both stylish and sustainable.',
    author: 'Lisa Green',
    date: '2023-12-28',
    readTime: '8 min read',
    category: 'Sustainability',
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    likes: 167,
    comments: 28,
    views: 3892
  },
  {
    id: '6',
    title: 'DIY Pet Accessories: Creative Projects',
    excerpt: 'Step-by-step tutorials for creating unique accessories for your pets. From simple bandanas to elaborate costumes.',
    author: 'Maria Santos',
    date: '2023-12-25',
    readTime: '10 min read',
    category: 'DIY',
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    likes: 298,
    comments: 45,
    views: 5634,
    isNew: true
  },
  {
    id: '7',
    title: 'Pet Fashion Show: Behind the Scenes',
    excerpt: 'Go behind the scenes of the biggest pet fashion shows. Meet the designers, models, and stylists making waves in the industry.',
    author: 'David Kim',
    date: '2023-12-20',
    readTime: '12 min read',
    category: 'Events',
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    likes: 445,
    comments: 67,
    views: 7823,
    isFeatured: true
  },
  {
    id: '8',
    title: 'Pet Grooming and Fashion: Perfect Combinations',
    excerpt: 'Learn how proper grooming enhances your pet\'s fashion choices. Professional grooming tips for different breeds and coat types.',
    author: 'Rachel Brown',
    date: '2023-12-15',
    readTime: '9 min read',
    category: 'Grooming',
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    likes: 189,
    comments: 31,
    views: 4156
  },
  {
    id: '9',
    title: 'Holiday Pet Costumes: Festive Ideas',
    excerpt: 'Creative costume ideas for holidays and special occasions. Make your pet the star of every celebration.',
    author: 'Tom Anderson',
    date: '2023-12-10',
    readTime: '6 min read',
    category: 'Holidays',
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    likes: 234,
    comments: 42,
    views: 5234
  },
  {
    id: '10',
    title: 'Pet Fashion History: Evolution Through the Years',
    excerpt: 'A fascinating journey through the history of pet fashion, from ancient times to modern trends.',
    author: 'Prof. Helen Davis',
    date: '2023-12-05',
    readTime: '15 min read',
    category: 'History',
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    likes: 156,
    comments: 23,
    views: 3456,
    isFeatured: true
  }
];

const CATEGORIES = ['All', 'Fashion Trends', 'Size Guide', 'Seasonal Care', 'Photography', 'Sustainability', 'DIY', 'Events', 'Grooming', 'Holidays', 'History'];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'most-liked', label: 'Most Liked' },
  { value: 'most-viewed', label: 'Most Viewed' }
];

export default function AllArticlesPage({ isDark = false }: AllArticlesPageProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [filteredPosts, setFilteredPosts] = useState(ALL_BLOG_POSTS);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    let filtered = ALL_BLOG_POSTS;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Sort posts
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'most-liked':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'most-viewed':
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        // Featured - keep original order but prioritize featured posts
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        });
        break;
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, sortBy]);

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
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
      <EnhancedHeader isDark={isDark} />
      
      {/* Main Content */}
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className={`${isDark ? 'text-white hover:text-green-400' : 'text-gray-900 hover:text-green-600'}`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  All Articles
                </h1>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {filteredPosts.length} articles found
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className={`sticky top-32 space-y-6 p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Filters
                </h3>
                
                {/* Search */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Search Articles
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Categories
                  </label>
                  <div className="space-y-2">
                    {CATEGORIES.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    {SORT_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filteredPosts.map(post => (
                  <article 
                    key={post.id}
                    className={`group relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    } rounded-2xl shadow-lg`}
                  >
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
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
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

                        {/* Enhanced Excerpt */}
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
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📰</div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    No articles found
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer isDark={isDark} />

      <style jsx>{`
        @keyframes border-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .animate-border-glow {
          animation: border-glow 2s ease-in-out infinite;
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
    </div>
  );
}