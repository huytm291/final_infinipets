// pages/api/auth/register.ts - User registration endpoint

import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, User } from '../../../lib/types';
import { AuthService, isValidEmail, isValidPassword } from '../../../lib/auth';

interface RegisterResponse {
  user: User;
  token: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<RegisterResponse>>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    });
  }

  try {
    const { email, password, firstName, lastName, acceptTerms } = req.body;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    if (!acceptTerms) {
      return res.status(400).json({
        success: false,
        error: 'You must accept the terms and conditions'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        error: passwordValidation.message
      });
    }

    // Validate name lengths
    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'First name and last name must be at least 2 characters long'
      });
    }

    // Attempt registration
    try {
      const { user, token } = await AuthService.registerUser({
        email: email.toLowerCase().trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim()
      });

      // Set HTTP-only cookie
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/'
      };

      res.setHeader('Set-Cookie', `auth_token=${token}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`);

      res.status(201).json({
        success: true,
        data: {
          user,
          token
        },
        message: 'Registration successful'
      });

    } catch (registrationError: any) {
      if (registrationError.message === 'User already exists with this email') {
        return res.status(409).json({
          success: false,
          error: 'An account with this email already exists'
        });
      }
      throw registrationError;
    }

  } catch (error) {
    console.error('Registration API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}