import { useState, useEffect, useRef, useCallback } from 'react';
import { CartItem, Cart } from '@/lib/types';
import { toast } from 'sonner';

const CART_STORAGE_KEY = 'infinipets-cart';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const isUpdatingFromStorage = useRef(false);

  // Force trigger update for real-time sync
  const triggerUpdate = useCallback(() => {
    setUpdateTrigger(prev => prev + 1);
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const validItems = Array.isArray(parsed) ? parsed : [];
        setCartItems(validItems);
        console.log('Cart loaded:', validItems.length, 'items');
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
      setCartItems([]);
    }
  }, []);

  // Save to localStorage whenever cart changes (but not when updating from storage)
  useEffect(() => {
    if (isUpdatingFromStorage.current) {
      isUpdatingFromStorage.current = false;
      return;
    }

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      console.log('Cart saved to storage:', cartItems.length, 'items');
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('cartUpdate', { 
        detail: { 
          items: cartItems, 
          count: cartItems.reduce((total, item) => total + item.quantity, 0)
        } 
      }));
      
      // Trigger update for components that depend on cart
      triggerUpdate();
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  }, [cartItems, triggerUpdate]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          isUpdatingFromStorage.current = true;
          setCartItems(Array.isArray(parsed) ? parsed : []);
          console.log('Cart synced from storage');
        } catch (error) {
          console.error('Failed to sync cart:', error);
        }
      }
    };

    // Listen for custom cart update events
    const handleCartUpdate = () => {
      triggerUpdate();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdate', handleCartUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdate', handleCartUpdate);
    };
  }, [triggerUpdate]);

  const addToCart = useCallback((productId: number, name: string, price: number, image: string, size: string, color: string, quantity: number = 1) => {
    const itemId = `${productId}-${size}-${color}`;
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === itemId);
      
      if (existingItem) {
        const updatedItems = prev.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        console.log('Updated cart item quantity:', name, 'New quantity:', existingItem.quantity + quantity);
        return updatedItems;
      } else {
        const newItem = {
          id: itemId,
          productId,
          name,
          price,
          image,
          size,
          color,
          quantity
        };
        const newItems = [...prev, newItem];
        console.log('Added to cart:', name, 'Total items:', newItems.length);
        return newItems;
      }
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems(prev => {
      const newItems = prev.filter(item => item.id !== itemId);
      console.log('Removed from cart, remaining items:', newItems.length);
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prev => {
      const updatedItems = prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      console.log('Updated quantity for item:', itemId, 'New quantity:', quantity);
      return updatedItems;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    console.log('Cart cleared');
  }, []);

  const getItemCount = useCallback((): number => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    return count;
  }, [cartItems, updateTrigger]);

  const getSubtotal = useCallback((): number => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const getCart = useCallback((): Cart => {
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
  }, [cartItems, getSubtotal]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
    getSubtotal,
    getCart,
    updateTrigger, // Expose trigger for components that need real-time updates
  };
}