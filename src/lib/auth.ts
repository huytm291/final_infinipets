// lib/auth.ts - Authentication utilities for INFINIPETS API

import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import { User } from './types';
import { MOCK_USERS } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export interface AuthToken {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export class AuthService {
  // Generate JWT token
  static generateToken(user: User): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }

  // Verify JWT token
  static verifyToken(token: string): AuthToken | null {
    try {
      return jwt.verify(token, JWT_SECRET) as AuthToken;
    } catch (error) {
      return null;
    }
  }

  // Extract token from request
  static extractTokenFromRequest(req: NextApiRequest): string | null {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    
    // Also check cookies for browser requests
    const cookieToken = req.cookies.auth_token;
    if (cookieToken) {
      return cookieToken;
    }
    
    return null;
  }

  // Get current user from request
  static async getCurrentUser(req: NextApiRequest): Promise<User | null> {
    const token = this.extractTokenFromRequest(req);
    
    if (!token) {
      return null;
    }
    
    const decoded = this.verifyToken(token);
    if (!decoded) {
      return null;
    }
    
    return MOCK_USERS.find(u => u.id === decoded.userId) || null;
  }

  // Simulate password hashing (in real app, use bcrypt)
  static hashPassword(password: string): string {
    // This is just for simulation - use proper hashing in production
    return Buffer.from(password).toString('base64');
  }

  // Simulate password verification
  static verifyPassword(password: string, hashedPassword: string): boolean {
    return this.hashPassword(password) === hashedPassword;
  }

  // Simulate user registration
  static async registerUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ user: User; token: string }> {
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const newUser: User = {
      id: this.generateId('user_'),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      preferences: {
        language: 'en',
        currency: 'USD',
        notifications: true
      },
      addresses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In real app, save to database here
    // For simulation, we'll just add to mock array
    MOCK_USERS.push(newUser);

    const token = this.generateToken(newUser);

    return { user: newUser, token };
  }

  // Simulate user login
  static async loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // In real app, verify hashed password
    // For simulation, we'll accept any password for existing users
    
    const token = this.generateToken(user);
    
    return { user, token };
  }

  // Generate unique IDs
  static generateId(prefix = ''): string {
    return `${prefix}${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Middleware for protected routes
  static requireAuth() {
    return async (req: NextApiRequest, res: Response, next: () => void) => {
      const user = await this.getCurrentUser(req);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }
      
      // Add user to request object
      (req as NextApiRequest & { user: User }).user = user;
      next();
    };
  }

  // Rate limiting simulation
  static rateLimit(maxRequests = 100, windowMs = 15 * 60 * 1000) {
    const requests = new Map();
    
    return (req: NextApiRequest, res: Response, next: () => void) => {
      const ip = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
      const now = Date.now();
      const windowStart = now - windowMs;
      
      if (!requests.has(ip)) {
        requests.set(ip, []);
      }
      
      const userRequests = requests.get(ip).filter((time: number) => time > windowStart);
      
      if (userRequests.length >= maxRequests) {
        return res.status(429).json({
          success: false,
          error: 'Too many requests, please try again later'
        });
      }
      
      userRequests.push(now);
      requests.set(ip, userRequests);
      
      next();
    };
  }
}

// Helper function to validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate password strength
export function isValidPassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  
  return { valid: true };
}