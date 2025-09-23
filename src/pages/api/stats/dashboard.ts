// pages/api/stats/dashboard.ts - Dashboard statistics endpoint

import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../lib/types';
import { AuthService } from '../../../lib/auth';
import { MockDB } from '../../../lib/db';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  topSellingProducts: Array<{
    id: number;
    name: string;
    sales: number;
    revenue: number;
  }>;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    customerName: string;
    total: number;
    status: string;
    createdAt: string;
  }>;
  categoryStats: Array<{
    category: string;
    productCount: number;
    revenue: number;
  }>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<DashboardStats>>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    });
  }

  try {
    // Check authentication (in real app, check for admin role)
    const user = await AuthService.getCurrentUser(req);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    // Generate mock dashboard statistics
    const products = MockDB.getProducts({}, 1, 1000).products;
    const categories = MockDB.getCategories();

    const stats: DashboardStats = {
      totalProducts: products.length,
      totalCategories: categories.length,
      totalUsers: 1250, // Mock data
      totalOrders: 3480, // Mock data
      totalRevenue: 125430.50, // Mock data
      topSellingProducts: products
        .filter(p => p.isBestseller)
        .slice(0, 5)
        .map(p => ({
          id: p.id,
          name: p.name,
          sales: Math.floor(Math.random() * 500) + 100,
          revenue: (Math.floor(Math.random() * 500) + 100) * p.price
        })),
      recentOrders: [
        {
          id: 'order_1',
          orderNumber: 'INF-2024-001',
          customerName: 'John Doe',
          total: 89.99,
          status: 'processing',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'order_2',
          orderNumber: 'INF-2024-002',
          customerName: 'Jane Smith',
          total: 156.50,
          status: 'shipped',
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
        }
      ],
      categoryStats: categories.map(cat => ({
        category: cat.name,
        productCount: cat.productCount,
        revenue: Math.floor(Math.random() * 50000) + 10000
      }))
    };

    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Dashboard API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}