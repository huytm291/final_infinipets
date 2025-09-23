import { useState, useEffect } from 'react';
import { CartItem, Cart } from '@/lib/types';
import { toast } from 'sonner';

const CART_STORAGE_KEY = 'infinipets-cart';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCartItems(parsed);
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  }, [cartItems]);

  const addToCart = (productId: number, name: string, price: number, image: string, size: string, color: string, quantity: number = 1) => {
    const itemId = `${productId}-${size}-${color}`;
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === itemId);
      
      if (existingItem) {
        toast.success('Updated cart quantity');
        return prev.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success('Added to cart');
        return [...prev, {
          id: itemId,
          productId,
          name,
          price,
          image,
          size,
          color,
          quantity
        }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => {
      const filtered = prev.filter(item => item.id !== itemId);
      toast.success('Removed from cart');
      return filtered;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const getItemCount = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = (): number => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCart = (): Cart => {
    const subtotal = getSubtotal();
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return {
      items: cartItems,
      subtotal,
      shipping,
      tax,
      total
    };
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
    getSubtotal,
    getCart,
  };
}