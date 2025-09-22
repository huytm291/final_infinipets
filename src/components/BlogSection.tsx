import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

export default function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: 'Upcoming Offline Event for Diamond Rank Customers',
      excerpt: 'Join our exclusive event for VIP customers with amazing offers and special activities...',
      image: '/api/placeholder/400/200',
      category: 'Events',
      readTime: '3 min read',
      publishDate: 'Dec 15, 2024'
    },
    {
      id: 2,
      title: '5 Ways to Protect Your Pet During Summer',
      excerpt: 'Useful tips to keep your pets cool and comfortable during the hot summer months...',
      image: '/api/placeholder/400/200',
      category: 'Pet Care',
      readTime: '5 min read',
      publishDate: 'Dec 12, 2024'
    },
    {
      id: 3,
      title: 'Fall/Winter 2024 Collection Coming Soon',
      excerpt: 'Discover the latest designs with premium materials for the cold season...',
      image: '/api/placeholder/400/200',
      category: 'Fashion',
      readTime: '4 min read',
      publishDate: 'Dec 10, 2024'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Events': return 'bg-blue-500';
      case 'Pet Care': return 'bg-green-500';
      case 'Fashion': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-coiny text-section-title gradient-text mb-4">
            Latest News & Events
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest pet fashion trends, care tips, and exclusive events
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 bg-white dark:bg-gray-800">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`${getCategoryColor(post.category)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                    {post.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.publishDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:underline">
                    Read More →
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
}