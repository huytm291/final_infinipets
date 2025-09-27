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

  // Load wishlist from localStorage on mount and force immediate update
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const validItems = Array.isArray(parsed) ? parsed : [];
        setWishlistItems(validItems);
        console.log('Wishlist loaded:', validItems.length, 'items');
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
      console.log('Wishlist saved to storage:', wishlistItems.length, 'items');
      
      // Dispatch multiple events to ensure all components are notified
      const wishlistData = { 
        items: wishlistItems, 
        count: wishlistItems.length 
      };
      
      window.dispatchEvent(new CustomEvent('wishlistUpdate', { detail: wishlistData }));
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: wishlistData }));
      window.dispatchEvent(new StorageEvent('storage', {
        key: WISHLIST_STORAGE_KEY,
        newValue: JSON.stringify(wishlistItems),
        oldValue: null,
        storageArea: localStorage
      }));
      
      // Force immediate trigger
      triggerUpdate();
    } catch (error) {
      console.error('Failed to save wishlist:', error);
    }
  }, [wishlistItems, triggerUpdate]);

  // Listen for storage changes from other tabs and force updates
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === WISHLIST_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          isUpdatingFromStorage.current = true;
          setWishlistItems(Array.isArray(parsed) ? parsed : []);
          console.log('Wishlist synced from storage');
          triggerUpdate();
        } catch (error) {
          console.error('Failed to sync wishlist:', error);
        }
      }
    };

    // Listen for custom wishlist update events
    const handleWishlistUpdate = (e: any) => {
      console.log('Wishlist update event received:', e.detail);
      triggerUpdate();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlistUpdate', handleWishlistUpdate);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdate', handleWishlistUpdate);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, [triggerUpdate]);

  const addToWishlist = useCallback((item: WishlistItem) => {
    setWishlistItems(prev => {
      const exists = prev.find(existing => existing.id === item.id);
      if (exists) {
        console.log('Item already in wishlist:', item.name);
        return prev;
      }
      const newItem = { ...item, addedAt: new Date() };
      const newItems = [...prev, newItem];
      console.log('Added to wishlist:', item.name, 'Total items:', newItems.length);
      return newItems;
    });
    
    // Force immediate update after state change
    setTimeout(() => triggerUpdate(), 0);
  }, [triggerUpdate]);

  const removeFromWishlist = useCallback((itemId: number) => {
    setWishlistItems(prev => {
      const newItems = prev.filter(item => item.id !== itemId);
      console.log('Removed from wishlist, remaining items:', newItems.length);
      return newItems;
    });
    
    // Force immediate update after state change
    setTimeout(() => triggerUpdate(), 0);
  }, [triggerUpdate]);

  const isInWishlist = useCallback((itemId: number): boolean => {
    const inWishlist = wishlistItems.some(item => item.id === itemId);
    return inWishlist;
  }, [wishlistItems, updateTrigger]);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
    console.log('Wishlist cleared');
    
    // Force immediate update after state change
    setTimeout(() => triggerUpdate(), 0);
  }, [triggerUpdate]);

  const getWishlistCount = useCallback((): number => {
    const count = wishlistItems.length;
    return count;
  }, [wishlistItems, updateTrigger]);

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