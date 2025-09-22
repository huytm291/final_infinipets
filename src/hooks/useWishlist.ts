import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  addedAt: Date;
}

interface WishlistStore {
  items: WishlistItem[];
  addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToWishlist: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.id === item.id);
        
        if (existingItem) {
          toast.info('Item is already in your wishlist');
          return;
        }
        
        const newItem: WishlistItem = {
          ...item,
          addedAt: new Date()
        };
        
        set({ items: [...items, newItem] });
        toast.success('Added to wishlist! ❤️', {
          description: `${item.name} has been added to your wishlist`
        });
      },
      
      removeFromWishlist: (id) => {
        const { items } = get();
        const item = items.find(i => i.id === id);
        
        set({ items: items.filter(i => i.id !== id) });
        
        if (item) {
          toast.success('Removed from wishlist', {
            description: `${item.name} has been removed from your wishlist`
          });
        }
      },
      
      isInWishlist: (id) => {
        return get().items.some(item => item.id === id);
      },
      
      clearWishlist: () => {
        set({ items: [] });
        toast.success('Wishlist cleared');
      },
      
      getWishlistCount: () => {
        return get().items.length;
      }
    }),
    {
      name: 'infinipets-wishlist',
    }
  )
);

export const useWishlist = () => {
  const { 
    items, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    clearWishlist, 
    getWishlistCount 
  } = useWishlistStore();
  
  return {
    wishlistItems: items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: getWishlistCount()
  };
};