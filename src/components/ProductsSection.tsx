import { FC, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Heart, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';

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
}

interface ProductsSectionProps {
  title: string;
  subtitle: string;
  isDark?: boolean;
}

const FEATURED_PRODUCTS: Product[] = [
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
    description: 'Cozy and stylish hoodie perfect for chilly walks'
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
    description: 'Beautiful dress for special occasions and photo shoots'
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
    description: 'Durable vest for outdoor adventures and hiking'
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
    description: 'Formal tuxedo for weddings and special events'
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
    description: 'Soft and warm sweater for cold winter days'
  },
  {
    id: '6',
    name: 'Sport Pet Jersey',
    price: 29.99,
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    rating: 4.5,
    reviews: 178,
    colors: [
      { name: 'Team Blue', value: '#2563eb' },
      { name: 'Victory Red', value: '#dc2626' },
      { name: 'Champion Gold', value: '#f59e0b' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Athletic jersey perfect for active pets'
  },
  {
    id: '7',
    name: 'Princess Pet Tutu',
    price: 42.99,
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    rating: 4.8,
    reviews: 95,
    colors: [
      { name: 'Ballet Pink', value: '#f9a8d4' },
      { name: 'Pearl White', value: '#ffffff' },
      { name: 'Lilac Purple', value: '#c084fc' }
    ],
    sizes: ['XS', 'S', 'M'],
    isBestseller: true,
    description: 'Adorable tutu for your little princess'
  },
  {
    id: '8',
    name: 'Raincoat Pet Jacket',
    price: 48.99,
    originalPrice: 62.99,
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    rating: 4.7,
    reviews: 142,
    colors: [
      { name: 'Bright Yellow', value: '#fbbf24' },
      { name: 'Ocean Blue', value: '#0ea5e9' },
      { name: 'Forest Green', value: '#059669' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Waterproof jacket to keep your pet dry'
  },
  {
    id: '9',
    name: 'Casual Pet T-Shirt',
    price: 24.99,
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    rating: 4.4,
    reviews: 267,
    colors: [
      { name: 'Classic White', value: '#ffffff' },
      { name: 'Cool Gray', value: '#6b7280' },
      { name: 'Sunny Yellow', value: '#fbbf24' },
      { name: 'Fresh Green', value: '#10b981' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    description: 'Comfortable everyday t-shirt for casual wear'
  },
  {
    id: '10',
    name: 'Winter Pet Parka',
    price: 67.99,
    originalPrice: 84.99,
    image: 'https://i.pinimg.com/736x/d1/21/62/d121622d88d03979598908071c7ec451.jpg',
    rating: 4.9,
    reviews: 88,
    colors: [
      { name: 'Arctic White', value: '#f8fafc' },
      { name: 'Deep Navy', value: '#1e40af' },
      { name: 'Burgundy', value: '#991b1b' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isBestseller: true,
    description: 'Heavy-duty parka for extreme cold weather'
  }
];

const ProductCard: FC<{ product: Product; isDark?: boolean; index: number; isVisible: boolean; isHovered: boolean; onHover: (index: number | null) => void }> = ({ 
  product, 
  isDark, 
  index, 
  isVisible, 
  isHovered, 
  onHover 
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    toast.success('Added to cart! 🛒', {
      description: `${product.name} (${selectedSize}, ${selectedColor.name})`,
      duration: 3000,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist! ❤️', {
      duration: 2000,
    });
  };

  return (
    <div 
      className={`product-card group relative rounded-2xl overflow-hidden shadow-lg transition-all duration-700 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0'
      } ${
        isHovered 
          ? 'scale-105 shadow-2xl' 
          : 'hover:scale-102 hover:shadow-xl'
      } ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Card glow effect - green theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-emerald-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Animated border - green theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-border-glow"></div>
      <div className={`absolute inset-[1px] rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}></div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Enhanced Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg animate-pulse">
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

        {/* Enhanced Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
          onClick={handleWishlist}
        >
          <Heart className={`w-4 h-4 transition-colors duration-300 ${
            isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
          }`} />
        </Button>

        {/* Enhanced Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered 
                ? 'scale-110 brightness-110' 
                : 'scale-100'
            }`}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Quick view overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              Quick View
            </Button>
          </div>
        </div>

        {/* Enhanced Product Info */}
        <div className="p-4 space-y-3">
          {/* Enhanced Rating */}
          <div className="flex items-center justify-between">
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
              <span className={`text-xs transition-colors duration-300 ${
                isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'
              }`}>
                ({product.reviews})
              </span>
            </div>
          </div>

          {/* Enhanced Product Name - green theme */}
          <h3 className={`font-semibold text-lg transition-all duration-300 ${
            isDark ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-600'
          }`}>
            {product.name}
          </h3>

          {/* Enhanced Description */}
          <p className={`text-sm line-clamp-2 transition-colors duration-300 ${
            isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'
          }`}>
            {product.description}
          </p>

          {/* Enhanced Price */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold gradient-text animate-text-glow">${product.price}</span>
            {product.originalPrice && (
              <span className={`text-sm line-through transition-colors duration-300 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Enhanced Color Selection */}
          <div className="space-y-2">
            <p className={`text-sm font-medium transition-colors duration-300 ${
              isDark ? 'text-gray-300 group-hover:text-gray-200' : 'text-gray-700 group-hover:text-gray-800'
            }`}>
              Color: {selectedColor.name}
            </p>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                    selectedColor.name === color.name 
                      ? 'border-green-500 shadow-lg shadow-green-500/25' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Size Selection */}
          <div className="space-y-2">
            <p className={`text-sm font-medium transition-colors duration-300 ${
              isDark ? 'text-gray-300 group-hover:text-gray-200' : 'text-gray-700 group-hover:text-gray-800'
            }`}>
              Size: {selectedSize}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 text-xs font-medium rounded-md border transition-all duration-300 hover:scale-105 ${
                    selectedSize === size
                      ? 'bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/25'
                      : isDark 
                        ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full gradient-primary hover:opacity-90 hover:scale-105 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:scale-110" />
              Add to Cart
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProductsSection: FC<ProductsSectionProps> = ({ title, subtitle, isDark = false }) => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    // Staggered animation for cards appearing
    FEATURED_PRODUCTS.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 150);
    });
  }, []);

  return (
    <section className={`py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden ${
      isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Animated background elements - green theme */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-200/10 to-emerald-200/10 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-teal-200/10 to-cyan-200/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-lime-200/10 to-green-200/10 rounded-full animate-float-reverse"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-emerald-200/10 to-teal-200/10 rounded-full animate-float-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-coiny text-4xl md:text-5xl mb-6 gradient-text animate-text-glow relative">
            {title} 🛍️
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 mx-auto mb-6 rounded-full animate-expand"></div>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {subtitle}
          </p>
        </div>

        {/* Enhanced Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8 mb-16">
          {FEATURED_PRODUCTS.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isDark={isDark}
              index={index}
              isVisible={visibleCards.includes(index)}
              isHovered={hoveredCard === index}
              onHover={setHoveredCard}
            />
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
              window.location.href = '/products';
            }}
          >
            <span className="relative z-10 flex items-center">
              View All Products 
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
          <p className={`mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Discover more amazing products for your beloved pets! 🐾
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
        
        .gradient-primary {
          background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
};

export default ProductsSection;