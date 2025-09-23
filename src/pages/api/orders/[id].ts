// pages/api/orders/[id].ts - Single order API endpoint

import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, Order } from '../../../lib/types';
import { AuthService } from '../../../lib/auth';

// Mock orders storage (in real app, use database)
const userOrders = new Map<string, Order[]>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Order>>
) {
  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Invalid order ID'
    });
  }

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
        await handleGetOrder(id, user.id, res);
        break;
      
      case 'PUT':
        await handleUpdateOrder(req, res, id, user.id);
        break;
      
      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).json({
          success: false,
          error: `Method ${req.method} not allowed`
        });
    }
  } catch (error) {
    console.error('Order API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

async function handleGetOrder(orderId: string, userId: string, res: NextApiResponse) {
  const orders = userOrders.get(userId) || [];
  const order = orders.find(o => o.id === orderId);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: order
  });
}

async function handleUpdateOrder(
  req: NextApiRequest,
  res: NextApiResponse,
  orderId: string,
  userId: string
) {
  const { status, notes } = req.body;
  
  const orders = userOrders.get(userId) || [];
  const orderIndex = orders.findIndex(o => o.id === orderId);
  
  if (orderIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Order not found'
    });
  }
  
  const order = orders[orderIndex];
  
  // Only allow certain status updates from customer side
  const allowedStatusUpdates = ['cancelled'];
  if (status && !allowedStatusUpdates.includes(status)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid status update'
    });
  }
  
  // Only allow cancellation if order is still pending or processing
  if (status === 'cancelled' && !['pending', 'processing'].includes(order.status)) {
    return res.status(400).json({
      success: false,
      error: 'Order cannot be cancelled at this stage'
    });
  }
  
  // Update order
  if (status) order.status = status;
  if (notes) order.notes = notes;
  order.updatedAt = new Date().toISOString();
  
  orders[orderIndex] = order;
  userOrders.set(userId, orders);
  
  res.status(200).json({
    success: true,
    data: order,
    message: 'Order updated successfully'
  });
}