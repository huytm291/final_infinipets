import { useState } from 'react';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; 
import { useWishlist } from '@/hooks/useWishlist';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string; // URL từ Supabase Storage hoặc Unsplash (ảnh chính/default)
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  description?: string;
  sizes?: string[]; // New: Tích hợp variants
  colors?: string[]; // New: Tích hợp variants
  variants?: Record<string, string>; // New: Key: "SIZE-COLOR" (e.g., "XS-Gold"), Value: URL ảnh variant
}

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean; // Optional: true cho featured images trên homepage (load eager)
}

export default function ProductCard({ product, className = '', priority = false }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  // New: States cho variant selection
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || ''); // Default: First size
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || ''); // Default: First color
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  // Fallback placeholder: Base64 SVG đơn giản (không gọi API)
  const placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNGMEYxRjIiLz4KPHRleHQgeD0iNTAlIiB5PSI1MCUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5IiBmb250U2l6ZT0iMTQiIGZvbnRGYW1pbHk9IkFyaWFsIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+';

  // New: Tính current image dựa trên variant selection
  const variantKey = `${selectedSize}-${selectedColor}`;
  const currentImage = product.variants?.[variantKey] || product.image; // Fallback to main image nếu variant không tồn tại

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
        image: currentImage, // New: Lưu variant image vào wishlist
        category: product.category,
        rating: product.rating,
        reviewCount: product.reviewCount,
        inStock: product.inStock,
        sizes: product.sizes,
        colors: product.colors,
        variants: product.variants, // New: Lưu variants để giữ tính năng
        selectedSize, // New: Lưu selection hiện tại
        selectedColor,
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
      description: `${product.name} (${selectedSize}, ${selectedColor}) has been added to your cart`
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // New: Trong quick view tương lai, pass selected variant
    toast.info('Quick view coming soon!', {
      description: `Preview ${product.name} in ${selectedSize} / ${selectedColor}`
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true);
    if (e.target instanceof HTMLImageElement) {
      e.target.src = placeholderSrc;
    }
  };

  // New: Handle size/color change - update image dynamically
  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
    setImageError(false);
    setImageLoaded(false);
  };

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
    setImageError(false);
    setImageLoaded(false);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className={`group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white dark:bg-gray-800 ${className}`}>
      <div className="relative overflow-hidden">
        {/* Product Image - Dynamic dựa trên variant */}
        <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative">
          <img
            src={imageError ? placeholderSrc : currentImage}
            alt={`${product.name} - ${selectedSize} / ${selectedColor}`}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 absolute inset-0 ${
              imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            loading={priority ? 'eager' : 'lazy'}
          />
          
          {/* Spinner hoặc Placeholder nếu loading/error */}
          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              {imageError ? (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              ) : (
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              )}
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
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Variant Selection - Size & Color Dropdowns */}
        {product.sizes && product.colors && product.inStock && (
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            {/* Size Select */}
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Size</label>
              <Select value={selectedSize} onValueChange={handleSizeChange} disabled={!product.inStock}>
                <SelectTrigger className="w-full h-8 text-sm">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color Select */}
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Color</label>
              <Select value={selectedColor} onValueChange={handleColorChange} disabled={!product.inStock}>
                <SelectTrigger className="w-full h-8 text-sm">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

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