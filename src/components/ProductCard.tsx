import { useState } from 'react';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useWishlist } from '@/hooks/useWishlist';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  description?: string;
  sizes?: string[];
  colors?: string[];
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        rating: product.rating,
        reviewCount: product.reviewCount,
        inStock: product.inStock
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) {
      toast.error('This item is currently out of stock');
      return;
    }
    
    toast.success('Added to cart! 🛒', {
      description: `${product.name} has been added to your cart`
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast.info('Quick view coming soon!', {
      description: 'This feature will be available in the next update'
    });
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className={`group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white dark:bg-gray-800 ${className}`}>
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 dark:bg-gray-700">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1">
              NEW
            </Badge>
          )}
          {product.isBestseller && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1">
              BESTSELLER
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1">
              -{discountPercentage}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-2 py-1">
              OUT OF STOCK
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 w-10 h-10 rounded-full transition-all duration-300 ${
            isWishlisted
              ? 'bg-pink-500 hover:bg-pink-600 text-white'
              : 'bg-white/80 hover:bg-white text-gray-600 hover:text-pink-500'
          } opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0`}
          onClick={handleWishlistToggle}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </Button>

        {/* Quick Actions */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleQuickView}
            className="w-10 h-10 bg-white/90 hover:bg-white border-gray-200 rounded-lg"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wide mb-2">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.inStock ? (
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
            ✓ In Stock
          </p>
        ) : (
          <p className="text-sm text-red-600 dark:text-red-400 mt-2">
            ✗ Out of Stock
          </p>
        )}
      </CardContent>
    </Card>
  );
}