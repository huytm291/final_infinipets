import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { CartItem, Cart } from '@/lib/types';
import { toast } from 'sonner';

export function useCart() {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('infinipets-cart', []);
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  });

  // Calculate cart totals
  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    setCart({
      items: cartItems,
      subtotal: parseFloat(subtotal.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    });
  }, [cartItems]);

  const addToCart = (product: {
    id: number;
    name: string;
    price: number;
    image: string;
  }, size: string, color: string, quantity: number = 1) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.productId === product.id && item.size === size && item.color === color
    );

    if (existingItemIndex > -1) {
      // Update existing item
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
      toast.success('Updated cart quantity', {
        description: `${product.name} quantity updated in cart`
      });
    } else {
      // Add new item
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
      setCartItems([...cartItems, newItem]);
      toast.success('Added to cart! 🛒', {
        description: `${product.name} (${size}, ${color}) added to cart`
      });
    }
  };

  const removeFromCart = (itemId: string) => {
    const item = cartItems.find(item => item.id === itemId);
    setCartItems(cartItems.filter(item => item.id !== itemId));
    
    if (item) {
      toast.success('Removed from cart', {
        description: `${item.name} removed from cart`
      });
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared', {
      description: 'All items removed from cart'
    });
  };

  const getItemCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount
  };
}