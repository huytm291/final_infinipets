// pages/api/products/[id].ts - Single product API endpoint

import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, Product } from '../../../lib/types';
import { MockDB } from '../../../lib/db';
import { AuthService } from '../../../lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Product>>
) {
  const { id } = req.query;
  const productId = parseInt(id as string);

  if (isNaN(productId)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid product ID'
    });
  }

  try {
    switch (req.method) {
      case 'GET':
        await handleGetProduct(productId, res);
        break;
      
      case 'PUT':
        await handleUpdateProduct(req, res, productId);
        break;
      
      case 'DELETE':
        await handleDeleteProduct(req, res, productId);
        break;
      
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).json({
          success: false,
          error: `Method ${req.method} not allowed`
        });
    }
  } catch (error) {
    console.error('Product API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

async function handleGetProduct(productId: number, res: NextApiResponse) {
  const product = MockDB.getProductById(productId);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }

  res.status(200).json({
    success: true,
    data: product
  });
}

async function handleUpdateProduct(
  req: NextApiRequest,
  res: NextApiResponse,
  productId: number
) {
  // Check authentication
  const user = await AuthService.getCurrentUser(req);
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }

  const product = MockDB.getProductById(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }

  const updates = req.body;
  
  // Validate price if provided
  if (updates.price && isNaN(parseFloat(updates.price))) {
    return res.status(400).json({
      success: false,
      error: 'Invalid price format'
    });
  }

  // Update product (in real app, update in database)
  const updatedProduct = {
    ...product,
    ...updates,
    price: updates.price ? parseFloat(updates.price) : product.price,
    originalPrice: updates.originalPrice ? parseFloat(updates.originalPrice) : product.originalPrice,
    updatedAt: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    data: updatedProduct,
    message: 'Product updated successfully'
  });
}

async function handleDeleteProduct(
  req: NextApiRequest,
  res: NextApiResponse,
  productId: number
) {
  // Check authentication
  const user = await AuthService.getCurrentUser(req);
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }

  const product = MockDB.getProductById(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }

  // In real app, soft delete or remove from database
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
}