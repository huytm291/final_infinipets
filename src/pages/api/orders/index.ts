// pages/api/orders/index.ts - Orders API endpoint

import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, Order, OrderItem } from '../../../lib/types';
import { AuthService } from '../../../lib/auth';
import { MockDB } from '../../../lib/db';

// Mock orders storage (in real app, use database)
const userOrders = new Map<string, Order[]>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Order[] | Order>>
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
        await handleGetOrders(req, res, user.id);
        break;
      
      case 'POST':
        await handleCreateOrder(req, res, user.id);
        break;
      
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({
          success: false,
          error: `Method ${req.method} not allowed`
        });
    }
  } catch (error) {
    console.error('Orders API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

async function handleGetOrders(req: NextApiRequest, res: NextApiResponse, userId: string) {
  const { page = '1', limit = '10', status } = req.query;
  
  let orders = userOrders.get(userId) || [];
  
  // Filter by status if provided
  if (status) {
    orders = orders.filter(order => order.status === status);
  }
  
  // Sort by creation date (newest first)
  orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  // Pagination
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const total = orders.length;
  const totalPages = Math.ceil(total / limitNum);
  const offset = (pageNum - 1) * limitNum;
  const paginatedOrders = orders.slice(offset, offset + limitNum);
  
  res.status(200).json({
    success: true,
    data: paginatedOrders,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages
    }
  });
}

async function handleCreateOrder(req: NextApiRequest, res: NextApiResponse, userId: string) {
  const {
    items,
    shippingAddress,
    billingAddress,
    paymentMethod,
    notes
  } = req.body;
  
  // Validate required fields
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Order items are required'
    });
  }
  
  if (!shippingAddress || !billingAddress || !paymentMethod) {
    return res.status(400).json({
      success: false,
      error: 'Shipping address, billing address, and payment method are required'
    });
  }
  
  // Validate products exist and are in stock
  const orderItems: OrderItem[] = [];
  let subtotal = 0;
  
  for (const item of items) {
    const product = MockDB.getProductById(item.productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        error: `Product with ID ${item.productId} not found`
      });
    }
    
    if (!product.inStock) {
      return res.status(400).json({
        success: false,
        error: `Product "${product.name}" is out of stock`
      });
    }
    
    const orderItem: OrderItem = {
      id: MockDB.generateId('item_'),
      productId: item.productId,
      name: product.name,
      price: product.price,
      image: item.image || product.image,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      sku: product.sku
    };
    
    orderItems.push(orderItem);
    subtotal += product.price * item.quantity;
  }
  
  // Calculate totals
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  // Generate order number
  const orderNumber = `INF-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  
  // Create order
  const newOrder: Order = {
    id: MockDB.generateId('order_'),
    userId,
    orderNumber,
    status: 'pending',
    items: orderItems,
    subtotal: parseFloat(subtotal.toFixed(2)),
    shipping: parseFloat(shipping.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    shippingAddress,
    billingAddress,
    paymentMethod,
    notes,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Save order
  const orders = userOrders.get(userId) || [];
  orders.push(newOrder);
  userOrders.set(userId, orders);
  
  // Simulate payment processing delay
  setTimeout(() => {
    newOrder.status = 'processing';
    newOrder.trackingNumber = `TRK${Date.now()}`;
    newOrder.updatedAt = new Date().toISOString();
  }, 2000);
  
  res.status(201).json({
    success: true,
    data: newOrder,
    message: 'Order created successfully'
  });
}