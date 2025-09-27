import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart, X, ArrowRight, Package, ArrowLeft, Home, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';
import EnhancedHeader from '@/components/Header';
import Footer from '@/components/Footer';

export default function WishlistPage() {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleMoveToCart = (product: any) => {
    // Convert wishlist item to cart format
    addToCart(product.id, product.name, product.price, product.image, 'M', 'Default', 1);
    removeFromWishlist(product.id);
    toast.success(`${product.name} đã được thêm vào giỏ hàng!`, {
      description: 'Sản phẩm đã được chuyển từ danh sách yêu thích sang giỏ hàng của bạn.',
      icon: <ShoppingCart className="h-4 w-4 text-green-500" />,
    });
  };

  const handleRemoveItem = (productId: number, productName: string) => {
    removeFromWishlist(productId);
    toast.info(`${productName} đã bị xóa khỏi danh sách yêu thích.`, {
      icon: <X className="h-4 w-4 text-red-500" />,
    });
  };

  const handleClearWishlist = () => {
    clearWishlist();
    toast.info('Danh sách yêu thích của bạn đã được xóa.', {
      icon: <X className="h-4 w-4 text-red-500" />,
    });
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
      <EnhancedHeader isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Add padding top to account for fixed header */}
      <div className="pt-20 lg:pt-32">
        <div className="container mx-auto py-8 px-4 md:px-8 lg:px-16 min-h-screen">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleContinueShopping}
              className="flex items-center space-x-2 text-sm hover:scale-105 transition-transform"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Tiếp tục mua sắm</span>
            </Button>
            <span className="text-gray-400">/</span>
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Danh sách yêu thích
            </span>
          </div>

          <Card className="w-full max-w-6xl mx-auto shadow-2xl border-0 relative overflow-hidden">
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-30 animate-border-glow"></div>
            <div className={`absolute inset-[1px] rounded-lg ${isDark ? 'bg-gray-900' : 'bg-white'}`}></div>

            <CardHeader className="relative z-10 text-center space-y-4 p-6 md:p-8">
              <CardTitle className="font-coiny text-3xl md:text-4xl gradient-text animate-text-glow">
                Danh sách yêu thích của bạn ❤️
              </CardTitle>
              <CardDescription className={`text-base md:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Lưu giữ những món đồ yêu thích của thú cưng bạn ở đây.
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 p-6 md:p-8 space-y-6">
              {wishlistItems.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <Heart className={`h-16 w-16 mx-auto opacity-50 animate-pulse ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Danh sách yêu thích của bạn đang trống.
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Duyệt qua các sản phẩm của chúng tôi và thêm những món đồ bạn yêu thích!
                  </p>
                  <Button 
                    onClick={handleContinueShopping}
                    className="gradient-primary mt-4 hover:opacity-90 hover:scale-105 transition-all duration-300"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Bắt đầu mua sắm
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((product) => (
                    <div
                      key={product.id}
                      className={`group relative rounded-lg border shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] overflow-hidden ${
                        isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white'
                      }`}
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {/* Remove from wishlist button */}
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleRemoveItem(product.id, product.name)}
                          className="absolute top-2 right-2 h-8 w-8 bg-red-500/80 hover:bg-red-600 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        
                        {/* Product badges */}
                        <div className="absolute top-2 left-2 flex flex-col space-y-1">
                          {product.isNew && (
                            <span className="px-2 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
                              Mới
                            </span>
                          )}
                          {product.isBestseller && (
                            <span className="px-2 py-1 text-xs font-medium bg-orange-500 text-white rounded-full">
                              Bán chạy
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className={`font-semibold text-lg group-hover:text-green-500 transition-colors line-clamp-2 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {product.name}
                          </h3>
                          <p className={`text-sm line-clamp-2 mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {product.description}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            ({product.reviews})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold gradient-text animate-text-glow">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className={`text-sm line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Colors */}
                        {product.colors && product.colors.length > 0 && (
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              Màu sắc:
                            </span>
                            <div className="flex space-x-1">
                              {product.colors.slice(0, 4).map((color, index) => (
                                <div
                                  key={index}
                                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                                  style={{ backgroundColor: color.value }}
                                  title={color.name}
                                />
                              ))}
                              {product.colors.length > 4 && (
                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  +{product.colors.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Button */}
                        <Button
                          onClick={() => handleMoveToCart(product)}
                          className="w-full gradient-primary hover:opacity-90 hover:scale-105 transition-all duration-300"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Thêm vào giỏ hàng
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>

            {wishlistItems.length > 0 && (
              <CardFooter className={`relative z-10 flex flex-col sm:flex-row justify-between items-center p-6 md:p-8 border-t space-y-4 sm:space-y-0 ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button
                    variant="outline"
                    onClick={handleClearWishlist}
                    className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                  >
                    Xóa tất cả
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleContinueShopping}
                    className={`border-gray-400 hover:scale-105 transition-all duration-300 ${
                      isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Tiếp tục mua sắm
                  </Button>
                </div>
                <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Tổng cộng: <span className="gradient-text animate-text-glow">
                    ${wishlistItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
                  </span>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>

      <Footer isDark={isDark} />

      <style jsx>{`
        @keyframes animate-border-glow {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.005);
          }
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
        }

        @keyframes animate-text-glow {
          0%,
          100% {
            text-shadow: 0 0 10px rgba(34, 197, 94, 0.4);
          }
          50% {
            text-shadow: 0 0 20px rgba(34, 197, 94, 0.6),
              0 0 30px rgba(16, 185, 129, 0.4);
          }
        }

        .animate-border-glow {
          animation: animate-border-glow 3s ease-in-out infinite;
        }

        .animate-text-glow {
          animation: animate-text-glow 3s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(
            to right,
            var(--primary-green),
            var(--primary-dark-green),
            var(--accent-emerald)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}