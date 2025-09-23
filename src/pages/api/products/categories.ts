// pages/api/products/categories.ts - Product categories API endpoint

import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, Category } from '../../../lib/types';
import { MockDB } from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Category[]>>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    });
  }

  try {
    const categories = MockDB.getCategories();
    
    res.status(200).json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Categories API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}