import { useState, useEffect } from 'react';
import { WishlistItem } from '@/lib/types';
import { toast } from 'sonner';

const WISHLIST_STORAGE_KEY = 'infinipets-wishlist';

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setWishlistItems(parsed);
      }
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    }
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Failed to save wishlist:', error);
    }
  }, [wishlistItems]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      const exists = prev.find(existing => existing.id === item.id);
      if (exists) {
        toast.info('Item already in wishlist');
        return prev;
      }
      toast.success('Added to wishlist');
      return [...prev, { ...item, addedAt: new Date() }];
    });
  };

  const removeFromWishlist = (itemId: number) => {
    setWishlistItems(prev => {
      const filtered = prev.filter(item => item.id !== itemId);
      toast.success('Removed from wishlist');
      return filtered;
    });
  };

  const isInWishlist = (itemId: number): boolean => {
    return wishlistItems.some(item => item.id === itemId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast.success('Wishlist cleared');
  };

  const getWishlistCount = (): number => {
    return wishlistItems.length;
  };

  const getWishlistTotal = (): number => {
    return wishlistItems.reduce((total, item) => total + item.price, 0);
  };

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount,
    getWishlistTotal,
  };
}