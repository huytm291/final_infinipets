// pages/api/auth/me.ts - Get current user profile endpoint

import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, User } from '../../../lib/types';
import { AuthService } from '../../../lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<User>>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
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

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Profile API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}