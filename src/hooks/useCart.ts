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
      subtotal,
      shipping,
      tax,
      total
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
      toast.success('Đã cập nhật số lượng trong giỏ hàng');
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
      toast.success('Đã thêm vào giỏ hàng');
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    toast.success('Đã xóa khỏi giỏ hàng');
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
    toast.success('Đã xóa toàn bộ giỏ hàng');
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