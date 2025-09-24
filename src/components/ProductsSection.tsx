import { FC, useState } from 'react';
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

const ProductCard: FC<{ product: Product; isDark?: boolean }> = ({ product, isDark }) => {
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
    <div className={`product-card group relative rounded-2xl overflow-hidden shadow-lg hover-lift ${
      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <Badge className="bg-green-500 text-white font-semibold">NEW</Badge>
        )}
        {product.isBestseller && (
          <Badge className="bg-orange-500 text-white font-semibold">BESTSELLER</Badge>
        )}
        {product.originalPrice && (
          <Badge className="bg-red-500 text-white font-semibold">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white"
        onClick={handleWishlist}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
      </Button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {product.name}
        </h3>

        {/* Description */}
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
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

        {/* Color Selection */}
        <div className="space-y-2">
          <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Color: {selectedColor.name}
          </p>
          <div className="flex space-x-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`color-swatch ${selectedColor.name === color.name ? 'selected' : ''}`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-2">
          <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Size: {selectedSize}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`size-option ${selectedSize === size ? 'selected' : ''} ${
                  isDark ? 'border-gray-600 text-gray-300' : ''
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full btn-primary"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

const ProductsSection: FC<ProductsSectionProps> = ({ title, subtitle, isDark = false }) => {
  return (
    <section className={`py-16 px-4 md:px-8 lg:px-16 ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-coiny mb-4 ${isDark ? 'gradient-text' : 'gradient-text'}`}>
            {title}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {subtitle}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8 mb-12">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} isDark={isDark} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="gradient-primary hover:opacity-90 hover:scale-105 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => {
              window.location.href = '/products';
            }}
          >
            View All Products <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;