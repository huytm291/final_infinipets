import { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Search, SlidersHorizontal, Grid3X3, List, Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import EnhancedHeader from '@/components/Header';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  colors: { name: string; value: string }[];
  sizes: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  description: string;
  category: string;
}

// Extended product list for the all products page
const ALL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Pet Hoodie',
    price: 45.99,
    originalPrice: 59.99,
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    rating: 4.8,
    reviews: 124,
    colors: [
      { name: 'Navy Blue', value: '#1e3a8a' },
      { name: 'Forest Green', value: '#059669' },
      { name: 'Crimson Red', value: '#dc2626' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    description: 'Cozy and stylish hoodie perfect for chilly walks',
    category: 'Hoodies'
  },
  {
    id: '2',
    name: 'Elegant Pet Dress',
    price: 38.99,
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    rating: 4.9,
    reviews: 89,
    colors: [
      { name: 'Pink Blush', value: '#f472b6' },
      { name: 'Lavender', value: '#a78bfa' },
      { name: 'Mint Green', value: '#34d399' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isBestseller: true,
    description: 'Beautiful dress for special occasions and photo shoots',
    category: 'Dresses'
  },
  {
    id: '3',
    name: 'Adventure Pet Vest',
    price: 52.99,
    originalPrice: 68.99,
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    rating: 4.7,
    reviews: 156,
    colors: [
      { name: 'Olive Green', value: '#65a30d' },
      { name: 'Desert Tan', value: '#d97706' },
      { name: 'Charcoal', value: '#374151' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Durable vest for outdoor adventures and hiking',
    category: 'Vests'
  },
  {
    id: '4',
    name: 'Luxury Pet Tuxedo',
    price: 89.99,
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    rating: 5.0,
    reviews: 67,
    colors: [
      { name: 'Classic Black', value: '#000000' },
      { name: 'Midnight Blue', value: '#1e40af' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isBestseller: true,
    description: 'Formal tuxedo for weddings and special events',
    category: 'Formal'
  },
  {
    id: '5',
    name: 'Cozy Pet Sweater',
    price: 34.99,
    originalPrice: 44.99,
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    rating: 4.6,
    reviews: 203,
    colors: [
      { name: 'Cream White', value: '#fef3c7' },
      { name: 'Soft Gray', value: '#9ca3af' },
      { name: 'Warm Brown', value: '#92400e' },
      { name: 'Rose Pink', value: '#f472b6' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: true,
    description: 'Soft and warm sweater for cold winter days',
    category: 'Sweaters'
  },
  // Add more products to make it comprehensive
  {
    id: '11',
    name: 'Designer Pet Bandana',
    price: 19.99,
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    rating: 4.5,
    reviews: 89,
    colors: [
      { name: 'Red Plaid', value: '#dc2626' },
      { name: 'Blue Denim', value: '#2563eb' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Stylish bandana for everyday wear',
    category: 'Accessories'
  },
  {
    id: '12',
    name: 'Waterproof Pet Boots',
    price: 42.99,
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    rating: 4.3,
    reviews: 156,
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Brown', value: '#92400e' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Protective boots for all weather conditions',
    category: 'Footwear'
  },
  {
    id: '13',
    name: 'LED Safety Collar',
    price: 29.99,
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    rating: 4.7,
    reviews: 234,
    colors: [
      { name: 'Neon Green', value: '#10b981' },
      { name: 'Bright Orange', value: '#f97316' }
    ],
    sizes: ['S', 'M', 'L'],
    isNew: true,
    description: 'Keep your pet visible and safe during night walks',
    category: 'Safety'
  },
  {
    id: '14',
    name: 'Plush Pet Bed',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    rating: 4.8,
    reviews: 178,
    colors: [
      { name: 'Beige', value: '#f5f5dc' },
      { name: 'Gray', value: '#6b7280' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Ultra-comfortable bed for the perfect nap',
    category: 'Bedding'
  },
  {
    id: '15',
    name: 'Interactive Puzzle Toy',
    price: 24.99,
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    rating: 4.6,
    reviews: 145,
    colors: [
      { name: 'Multi-color', value: '#f59e0b' }
    ],
    sizes: ['One Size'],
    isBestseller: true,
    description: 'Mental stimulation toy to keep pets engaged',
    category: 'Toys'
  }
];

const CATEGORIES = ['All', 'Hoodies', 'Dresses', 'Vests', 'Formal', 'Sweaters', 'Accessories', 'Footwear', 'Safety', 'Bedding', 'Toys'];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' }
];

interface AllProductsPageProps {
  isDark?: boolean;
}

export default function AllProductsPage({ isDark = false }: AllProductsPageProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState(ALL_PRODUCTS);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    let filtered = ALL_PRODUCTS;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const handleAddToCart = (product: Product) => {
    addToCart(
      parseInt(product.id),
      product.name,
      product.price,
      product.image,
      product.sizes[0],
      product.colors[0]?.name || 'Default',
      1
    );
  };

  const handleWishlist = (product: Product) => {
    const productId = parseInt(product.id);
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist({
        id: productId,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        rating: product.rating,
        reviewCount: product.reviews,
        inStock: true,
        addedAt: new Date(),
        sizes: product.sizes,
        colors: product.colors.map(c => c.name),
        selectedSize: product.sizes[0],
        selectedColor: product.colors[0]?.name || 'Default'
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
                  All Products
                </h1>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {filteredProducts.length} products found
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
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
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search products..."
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

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}
                  >
                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                      {product.isNew && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg">
                          ✨ NEW
                        </Badge>
                      )}
                      {product.isBestseller && (
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg">
                          🔥 BESTSELLER
                        </Badge>
                      )}
                      {product.originalPrice && (
                        <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100"
                      onClick={() => handleWishlist(product)}
                    >
                      <Heart className={`w-4 h-4 transition-colors duration-300 ${
                        isInWishlist(parseInt(product.id)) ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
                      }`} />
                    </Button>

                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-3">
                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 transition-colors duration-300 ${
                                i < Math.floor(product.rating) 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : isDark ? 'text-gray-600' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {product.description}
                      </p>

                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold gradient-text">${product.price}</span>
                        {product.originalPrice && (
                          <span className={`text-sm line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full gradient-primary hover:opacity-90 hover:scale-105 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    No products found
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
    </div>
  );
}