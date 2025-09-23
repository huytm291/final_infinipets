// pages/api/newsletter/subscribe.ts - Newsletter subscription endpoint

import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, Newsletter } from '../../../lib/types';
import { isValidEmail } from '../../../lib/auth';
import { MockDB } from '../../../lib/db';

// Mock newsletter storage (in real app, use database)
const newsletterSubscriptions: Newsletter[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Newsletter>>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    });
  }

  try {
    const { email, firstName, lastName, preferences } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Check if already subscribed
    const existingSubscription = newsletterSubscriptions.find(
      sub => sub.email.toLowerCase() === email.toLowerCase()
    );

    if (existingSubscription) {
      if (existingSubscription.status === 'active') {
        return res.status(409).json({
          success: false,
          error: 'Email is already subscribed to newsletter'
        });
      } else {
        // Reactivate subscription
        existingSubscription.status = 'active';
        existingSubscription.preferences = preferences || {
          newProducts: true,
          promotions: true,
          blog: true
        };
        
        return res.status(200).json({
          success: true,
          data: existingSubscription,
          message: 'Newsletter subscription reactivated'
        });
      }
    }

    // Create new subscription
    const newSubscription: Newsletter = {
      id: MockDB.generateId('newsletter_'),
      email: email.toLowerCase().trim(),
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      preferences: preferences || {
        newProducts: true,
        promotions: true,
        blog: true
      },
      status: 'active',
      createdAt: new Date().toISOString()
    };

    newsletterSubscriptions.push(newSubscription);

    res.status(201).json({
      success: true,
      data: newSubscription,
      message: 'Successfully subscribed to newsletter'
    });

  } catch (error) {
    console.error('Newsletter API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}