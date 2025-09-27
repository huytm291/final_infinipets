import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShoppingCart, X, ArrowRight, Package, Minus, Plus, DollarSign, ArrowLeft, Home } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';
import EnhancedHeader from '@/components/Header';
import Footer from '@/components/Footer';

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCart, updateTrigger } = useCart();
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const cart = getCart();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // FIX: Force re-render when cart changes and handle loading state
  useEffect(() => {
    // Simulate loading to ensure cart data is loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    console.log('CartPage re-rendered - Items:', cartItems.length, 'Update trigger:', updateTrigger);
    
    return () => clearTimeout(timer);
  }, [cartItems, updateTrigger]);

  // FIX: Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      console.log('CartPage received cart update event');
      setIsLoading(false); // Ensure loading is false when cart updates
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      const item = cartItems.find(item => item.id === itemId);
      handleRemoveItem(itemId, item?.name || 'Product');
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string, productName: string) => {
    removeFromCart(itemId);
    toast.info(`${productName} has been removed from cart.`, {
      icon: <X className="h-4 w-4 text-red-500" />,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast.info('Your cart has been cleared.', {
      icon: <X className="h-4 w-4 text-red-500" />,
    });
  };

  const handleCheckout = () => {
    toast.success('Proceed to checkout!', {
      description: 'You will be redirected to our secure checkout page.',
      icon: <DollarSign className="h-4 w-4 text-green-500" />,
    });
    // Checkout logic here
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  // Show loading state briefly to ensure cart data is loaded
  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
        <EnhancedHeader isDark={isDark} toggleTheme={toggleTheme} />
        <div className="pt-20 lg:pt-32">
          <div className="container mx-auto py-8 px-4 md:px-8 lg:px-16 min-h-screen flex items-center justify-center">
            <div className="text-center">
              <ShoppingCart className={`h-16 w-16 mx-auto opacity-50 animate-pulse ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <p className={`text-lg mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Loading your cart...
              </p>
            </div>
          </div>
        </div>
        <Footer isDark={isDark} />
      </div>
    );
  }

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
              <span>Continue Shopping</span>
            </Button>
            <span className="text-gray-400">/</span>
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Shopping Cart
            </span>
          </div>

          <Card className="w-full max-w-6xl mx-auto shadow-2xl border-0 relative overflow-hidden">
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-30 animate-border-glow"></div>
            <div className={`absolute inset-[1px] rounded-lg ${isDark ? 'bg-gray-900' : 'bg-white'}`}></div>

            <CardHeader className="relative z-10 text-center space-y-4 p-6 md:p-8">
              <CardTitle className="font-coiny text-3xl md:text-4xl gradient-text animate-text-glow">
                Your Shopping Cart 🛒
              </CardTitle>
              <CardDescription className={`text-base md:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Review the items you've selected for your pet.
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 p-6 md:p-8 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <ShoppingCart className={`h-16 w-16 mx-auto opacity-50 animate-pulse ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Your cart is empty.
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Browse our products and add items you love!
                  </p>
                  <Button 
                    onClick={handleContinueShopping}
                    className="gradient-primary mt-4 hover:opacity-90 hover:scale-105 transition-all duration-300"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 border rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01] group ${
                        isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className={`font-semibold text-lg group-hover:text-green-500 transition-colors ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {item.name}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          ${item.price.toFixed(2)} each
                        </p>
                        <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}>
                            Size: {item.size}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}>
                            Color: {item.color}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 text-center border-green-400 focus:border-green-500"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-lg font-bold gradient-text animate-text-glow w-24 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="h-8 w-8 bg-red-500 hover:bg-red-600 transition-all duration-300"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>

            {cartItems.length > 0 && (
              <CardFooter className={`relative z-10 flex flex-col space-y-6 p-6 md:p-8 border-t ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}>
                {/* Order Summary */}
                <div className={`w-full p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                  <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Order Summary
                  </h3>
                  <div className="space-y-2">
                    <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span>Subtotal:</span>
                      <span>${cart.subtotal.toFixed(2)}</span>
                    </div>
                    <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span>Shipping:</span>
                      <span>{cart.shipping === 0 ? 'Free' : `$${cart.shipping.toFixed(2)}`}</span>
                    </div>
                    <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span>Tax:</span>
                      <span>${cart.tax.toFixed(2)}</span>
                    </div>
                    <div className={`flex justify-between text-xl font-bold pt-2 border-t ${
                      isDark ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'
                    }`}>
                      <span>Total:</span>
                      <span className="gradient-text animate-text-glow">${cart.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <Button
                      variant="outline"
                      onClick={handleClearCart}
                      className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                    >
                      Clear Cart
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleContinueShopping}
                      className={`border-gray-400 hover:scale-105 transition-all duration-300 ${
                        isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="gradient-primary hover:opacity-90 hover:scale-105 transition-all duration-300 px-8"
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Button>
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