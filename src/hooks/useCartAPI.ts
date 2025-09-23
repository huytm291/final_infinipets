// hooks/useCartAPI.ts - Cart API hook with authentication
import { useState, useEffect } from 'react';
import { Cart, CartItem, Product } from '@/lib/types';
import { apiService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface UseCartAPIReturn {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => Promise<boolean>;
  updateCartItem: (itemId: string, quantity: number) => Promise<boolean>;
  removeFromCart: (itemId: string) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  refreshCart: () => Promise<void>;
}

export function useCartAPI(): UseCartAPIReturn {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      refreshCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);

  const refreshCart = async (): Promise<void> => {
    if (!isAuthenticated) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.getCart();
      
      if (response.success && response.data) {
        setCart(response.data);
      } else {
        setError(response.error || 'Failed to load cart');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load cart';
      setError(errorMessage);
      console.error('Cart refresh error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (
    product: Product, 
    size: string, 
    color: string, 
    quantity = 1
  ): Promise<boolean> => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to cart');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.addToCart(product.id, size, color, quantity);
      
      if (response.success && response.data) {
        setCart(response.data);
        toast.success('Item added to cart!', {
          description: `${product.name} (${size}, ${color}) x${quantity}`
        });
        return true;
      } else {
        const errorMsg = response.error || 'Failed to add item to cart';
        setError(errorMsg);
        toast.error('Failed to add to cart', {
          description: errorMsg
        });
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item to cart';
      setError(errorMessage);
      toast.error('Failed to add to cart', {
        description: errorMessage
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (itemId: string, quantity: number): Promise<boolean> => {
    if (!isAuthenticated) return false;

    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.updateCartItem(itemId, quantity);
      
      if (response.success && response.data) {
        setCart(response.data);
        toast.success('Cart updated successfully');
        return true;
      } else {
        const errorMsg = response.error || 'Failed to update cart item';
        setError(errorMsg);
        toast.error('Failed to update cart', {
          description: errorMsg
        });
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update cart item';
      setError(errorMessage);
      toast.error('Failed to update cart', {
        description: errorMessage
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: string): Promise<boolean> => {
    return updateCartItem(itemId, 0);
  };

  const clearCart = async (): Promise<boolean> => {
    if (!isAuthenticated) return false;

    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.clearCart();
      
      if (response.success) {
        setCart(response.data || null);
        toast.success('Cart cleared successfully');
        return true;
      } else {
        const errorMsg = response.error || 'Failed to clear cart';
        setError(errorMsg);
        toast.error('Failed to clear cart', {
          description: errorMsg
        });
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear cart';
      setError(errorMessage);
      toast.error('Failed to clear cart', {
        description: errorMessage
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cart,
    isLoading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart,
  };
}

export default useCartAPI;