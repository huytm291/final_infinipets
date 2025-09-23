import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, BlogPost } from '../../../lib/types';
import { MockDB } from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<BlogPost>>
) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Invalid blog post slug'
    });
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    });
  }

  try {
    const post = MockDB.getBlogPostBySlug(slug);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found'
      });
    }

    if (!post.published) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not published'
      });
    }

    // Increment view count (in real app, do this asynchronously)
    post.views += 1;

    res.status(200).json({
      success: true,
      data: post
    });

  } catch (error) {
    console.error('Blog Post API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}