// pages/api/auth/login.ts - User login endpoint

import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, User } from '../../../lib/types';
import { AuthService, isValidEmail } from '../../../lib/auth';

interface LoginResponse {
  user: User;
  token: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<LoginResponse>>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    });
  }

  try {
    const { email, password, rememberMe } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Attempt login
    try {
      const { user, token } = await AuthService.loginUser(email, password);

      // Set HTTP-only cookie for browser clients
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 7 days or 1 day
        path: '/'
      };

      res.setHeader('Set-Cookie', `auth_token=${token}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`);

      // Return user data and token
      res.status(200).json({
        success: true,
        data: {
          user: {
            ...user,
            // Don't send sensitive data
          },
          token
        },
        message: 'Login successful'
      });

    } catch (loginError) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

  } catch (error) {
    console.error('Login API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}