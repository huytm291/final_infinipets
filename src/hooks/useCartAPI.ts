// hooks/useCartAPI.ts - Cart hook with API integration
import { useState, useEffect } from 'react';
import { Cart, CartItem } from '@/lib/types';
import { apiService } from '@/services/api';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export function useCartAPI() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      // Use local storage for non-authenticated users
      loadLocalCart();
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getCart();
      
      if (response.success && response.data) {
        setCart(response.data);
      }
    } catch (error: unknown) {
      console.error('Failed to fetch cart:', error);
      // Fallback to local storage
      loadLocalCart();
    } finally {
      setIsLoading(false);
    }
  };

  const loadLocalCart = () => {
    try {
      const savedCart = localStorage.getItem('infinipets-cart');
      if (savedCart) {
        const cartItems: CartItem[] = JSON.parse(savedCart);
        const calculatedCart = calculateCartTotals(cartItems);
        setCart(calculatedCart);
      }
    } catch (error) {
      console.error('Failed to load local cart:', error);
    }
  };

  const saveLocalCart = (cartItems: CartItem[]) => {
    try {
      localStorage.setItem('infinipets-cart', JSON.stringify(cartItems));
      const calculatedCart = calculateCartTotals(cartItems);
      setCart(calculatedCart);
    } catch (error) {
      console.error('Failed to save local cart:', error);
    }
  };

  const calculateCartTotals = (items: CartItem[]): Cart => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    return {
      items,
      subtotal: parseFloat(subtotal.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    };
  };

  const addToCart = async (product: {
    id: number;
    name: string;
    price: number;
    image: string;
  }, size: string, color: string, quantity: number = 1) => {
    try {
      setIsLoading(true);
      
      if (isAuthenticated) {
        // Use API for authenticated users
        const response = await apiService.addToCart(product.id, size, color, quantity);
        
        if (response.success && response.data) {
          setCart(response.data);
          toast.success('Added to cart! 🛒', {
            description: `${product.name} (${size}, ${color}) added to cart`
          });
        } else {
          throw new Error(response.error || 'Failed to add to cart');
        }
      } else {
        // Use local storage for non-authenticated users
        const cartItems = [...cart.items];
        const existingItemIndex = cartItems.findIndex(
          item => item.productId === product.id && item.size === size && item.color === color
        );

        if (existingItemIndex > -1) {
          cartItems[existingItemIndex].quantity += quantity;
          toast.success('Updated cart quantity', {
            description: `${product.name} quantity updated in cart`
          });
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${size}-${color}-${Date.now()}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size,
            color,
            quantity
          };
          cartItems.push(newItem);
          toast.success('Added to cart! 🛒', {
            description: `${product.name} (${size}, ${color}) added to cart`
          });
        }

        saveLocalCart(cartItems);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add to cart';
      toast.error('Failed to add to cart', {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      setIsLoading(true);
      
      if (isAuthenticated) {
        const response = await apiService.updateCartItem(itemId, quantity);
        
        if (response.success && response.data) {
          setCart(response.data);
          if (quantity <= 0) {
            toast.success('Removed from cart');
          }
        } else {
          throw new Error(response.error || 'Failed to update cart');
        }
      } else {
        const cartItems = cart.items.filter(item => {
          if (item.id === itemId) {
            if (quantity <= 0) {
              toast.success('Removed from cart', {
                description: `${item.name} removed from cart`
              });
              return false;
            } else {
              item.quantity = quantity;
            }
          }
          return true;
        });

        saveLocalCart(cartItems);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update cart';
      toast.error('Failed to update cart', {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    await updateQuantity(itemId, 0);
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      
      if (isAuthenticated) {
        const response = await apiService.clearCart();
        
        if (response.success && response.data) {
          setCart(response.data);
          toast.success('Cart cleared', {
            description: 'All items removed from cart'
          });
        } else {
          throw new Error(response.error || 'Failed to clear cart');
        }
      } else {
        saveLocalCart([]);
        toast.success('Cart cleared', {
          description: 'All items removed from cart'
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear cart';
      toast.error('Failed to clear cart', {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getItemCount = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return {
    cart,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
    refetch: isAuthenticated ? fetchCart : loadLocalCart,
  };
}