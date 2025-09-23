// pages/api/cart/index.ts - Shopping cart API endpoint

import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, CartItem, Cart } from '../../../lib/types';
import { AuthService } from '../../../lib/auth';
import { MockDB } from '../../../lib/db';

// Mock cart storage (in real app, use database)
const userCarts = new Map<string, CartItem[]>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Cart | CartItem[]>>
) {
  try {
    const user = await AuthService.getCurrentUser(req);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    switch (req.method) {
      case 'GET':
        await handleGetCart(user.id, res);
        break;
      
      case 'POST':
        await handleAddToCart(req, res, user.id);
        break;
      
      case 'PUT':
        await handleUpdateCart(req, res, user.id);
        break;
      
      case 'DELETE':
        await handleClearCart(user.id, res);
        break;
      
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({
          success: false,
          error: `Method ${req.method} not allowed`
        });
    }
  } catch (error) {
    console.error('Cart API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

async function handleGetCart(userId: string, res: NextApiResponse) {
  const cartItems = userCarts.get(userId) || [];
  const cart = calculateCartTotals(cartItems);
  
  res.status(200).json({
    success: true,
    data: cart
  });
}

async function handleAddToCart(req: NextApiRequest, res: NextApiResponse, userId: string) {
  const { productId, size, color, quantity = 1 } = req.body;
  
  if (!productId || !size || !color) {
    return res.status(400).json({
      success: false,
      error: 'Product ID, size, and color are required'
    });
  }

  const product = MockDB.getProductById(parseInt(productId));
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }

  if (!product.inStock) {
    return res.status(400).json({
      success: false,
      error: 'Product is out of stock'
    });
  }

  const cartItems = userCarts.get(userId) || [];
  const existingItemIndex = cartItems.findIndex(
    item => item.productId === productId && item.size === size && item.color === color
  );

  if (existingItemIndex > -1) {
    // Update existing item
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    const newItem: CartItem = {
      id: MockDB.generateId('cart_'),
      productId: parseInt(productId),
      name: product.name,
      price: product.price,
      image: product.variants?.[`${size}-${color}`] || product.image,
      size,
      color,
      quantity
    };
    cartItems.push(newItem);
  }

  userCarts.set(userId, cartItems);
  const cart = calculateCartTotals(cartItems);

  res.status(200).json({
    success: true,
    data: cart,
    message: 'Item added to cart'
  });
}

async function handleUpdateCart(req: NextApiRequest, res: NextApiResponse, userId: string) {
  const { itemId, quantity } = req.body;
  
  if (!itemId || quantity === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Item ID and quantity are required'
    });
  }

  const cartItems = userCarts.get(userId) || [];
  const itemIndex = cartItems.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Cart item not found'
    });
  }

  if (quantity <= 0) {
    // Remove item
    cartItems.splice(itemIndex, 1);
  } else {
    // Update quantity
    cartItems[itemIndex].quantity = quantity;
  }

  userCarts.set(userId, cartItems);
  const cart = calculateCartTotals(cartItems);

  res.status(200).json({
    success: true,
    data: cart,
    message: quantity <= 0 ? 'Item removed from cart' : 'Cart updated'
  });
}

async function handleClearCart(userId: string, res: NextApiResponse) {
  userCarts.set(userId, []);
  
  res.status(200).json({
    success: true,
    data: {
      items: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0
    },
    message: 'Cart cleared'
  });
}

function calculateCartTotals(items: CartItem[]): Cart {
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
}