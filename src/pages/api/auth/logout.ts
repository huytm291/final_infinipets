// pages/api/auth/logout.ts - User logout endpoint

import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<null>>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    });
  }

  try {
    // Clear the authentication cookie
    res.setHeader('Set-Cookie', 'auth_token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/');

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}