import { useState, useEffect, useRef, useCallback } from 'react';
import { WishlistItem } from '@/lib/types';
import { toast } from 'sonner';

const WISHLIST_STORAGE_KEY = 'infinipets-wishlist';

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const isUpdatingFromStorage = useRef(false);

  // Force trigger update for real-time sync
  const triggerUpdate = useCallback(() => {
    setUpdateTrigger(prev => prev + 1);
  }, []);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setWishlistItems(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Failed to load wishlist:', error);
      setWishlistItems([]);
    }
  }, []);

  // Save to localStorage whenever wishlist changes (but not when updating from storage)
  useEffect(() => {
    if (isUpdatingFromStorage.current) {
      isUpdatingFromStorage.current = false;
      return;
    }

    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
      console.log('Storage changed:', WISHLIST_STORAGE_KEY);
      // Trigger update for components that depend on wishlist
      triggerUpdate();
    } catch (error) {
      console.error('Failed to save wishlist:', error);
    }
  }, [wishlistItems, triggerUpdate]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === WISHLIST_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          isUpdatingFromStorage.current = true;
          setWishlistItems(Array.isArray(parsed) ? parsed : []);
        } catch (error) {
          console.error('Failed to sync wishlist:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addToWishlist = useCallback((item: WishlistItem) => {
    setWishlistItems(prev => {
      const exists = prev.find(existing => existing.id === item.id);
      if (exists) {
        return prev;
      }
      const newItem = { ...item, addedAt: new Date() };
      return [...prev, newItem];
    });
  }, []);

  const removeFromWishlist = useCallback((itemId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const isInWishlist = useCallback((itemId: number): boolean => {
    return wishlistItems.some(item => item.id === itemId);
  }, [wishlistItems, updateTrigger]); // Add updateTrigger dependency

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const getWishlistCount = useCallback((): number => {
    return wishlistItems.length;
  }, [wishlistItems, updateTrigger]); // Add updateTrigger dependency

  const getWishlistTotal = useCallback((): number => {
    return wishlistItems.reduce((total, item) => total + item.price, 0);
  }, [wishlistItems]);

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount,
    getWishlistTotal,
    updateTrigger, // Expose trigger for components that need real-time updates
  };
}