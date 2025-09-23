// pages/api/wishlist/index.ts - Wishlist API endpoint

import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, WishlistItem } from '../../../lib/types';
import { AuthService } from '../../../lib/auth';
import { MockDB } from '../../../lib/db';

// Mock wishlist storage (in real app, use database)
const userWishlists = new Map<string, WishlistItem[]>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<WishlistItem[]>>
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
        await handleGetWishlist(user.id, res);
        break;
      
      case 'POST':
        await handleAddToWishlist(req, res, user.id);
        break;
      
      case 'DELETE':
        await handleRemoveFromWishlist(req, res, user.id);
        break;
      
      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).json({
          success: false,
          error: `Method ${req.method} not allowed`
        });
    }
  } catch (error) {
    console.error('Wishlist API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

async function handleGetWishlist(userId: string, res: NextApiResponse) {
  const wishlistItems = userWishlists.get(userId) || [];
  
  res.status(200).json({
    success: true,
    data: wishlistItems
  });
}

async function handleAddToWishlist(req: NextApiRequest, res: NextApiResponse, userId: string) {
  const { productId, selectedSize, selectedColor } = req.body;
  
  if (!productId) {
    return res.status(400).json({
      success: false,
      error: 'Product ID is required'
    });
  }

  const product = MockDB.getProductById(parseInt(productId));
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }

  const wishlistItems = userWishlists.get(userId) || [];
  const existingItem = wishlistItems.find(item => item.id === product.id);
  
  if (existingItem) {
    return res.status(409).json({
      success: false,
      error: 'Product is already in wishlist'
    });
  }

  const wishlistItem: WishlistItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.category,
    rating: product.rating,
    reviewCount: product.reviewCount,
    inStock: product.inStock,
    addedAt: new Date(),
    sizes: product.sizes,
    colors: product.colors,
    variants: product.variants,
    selectedSize,
    selectedColor
  };

  wishlistItems.push(wishlistItem);
  userWishlists.set(userId, wishlistItems);

  res.status(201).json({
    success: true,
    data: wishlistItems,
    message: 'Product added to wishlist'
  });
}

async function handleRemoveFromWishlist(req: NextApiRequest, res: NextApiResponse, userId: string) {
  const { productId } = req.query;
  
  if (!productId) {
    return res.status(400).json({
      success: false,
      error: 'Product ID is required'
    });
  }

  const wishlistItems = userWishlists.get(userId) || [];
  const filteredItems = wishlistItems.filter(item => item.id !== parseInt(productId as string));
  
  if (filteredItems.length === wishlistItems.length) {
    return res.status(404).json({
      success: false,
      error: 'Product not found in wishlist'
    });
  }

  userWishlists.set(userId, filteredItems);

  res.status(200).json({
    success: true,
    data: filteredItems,
    message: 'Product removed from wishlist'
  });
}