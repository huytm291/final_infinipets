import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCartAPI } from '@/hooks/useCartAPI';
import { useWishlist } from '@/hooks/useWishlist';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Default');
  const [isLoading, setIsLoading] = useState(false);
  
  const { addToCart } = useCartAPI();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      await addToCart(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        },
        selectedSize,
        selectedColor,
        1
      );
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        ...product,
        addedAt: new Date(),
        selectedSize,
        selectedColor
      });
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white">
              New
            </Badge>
          )}
          {product.isBestseller && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
              Bestseller
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleWishlistToggle}
        >
          <Heart 
            className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </Button>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || isLoading}
            className="w-full bg-black/80 text-white hover:bg-black"
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isLoading ? 'Adding...' : 'Quick Add'}
          </Button>
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
        
        {/* Product Name */}
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-lg">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-2">
            <p className="text-xs text-muted-foreground mb-1">Size:</p>
            <div className="flex gap-1">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  className="h-6 w-8 text-xs p-0"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Color:</p>
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  size="sm"
                  className="h-6 text-xs px-2"
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-muted-foreground self-center">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}