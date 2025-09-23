// pages/api/blog/index.ts - Blog posts API endpoint

import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, BlogPost } from '../../../lib/types';
import { MockDB } from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<BlogPost[]>>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    });
  }

  try {
    const {
      page = '1',
      limit = '6',
      category,
      tag,
      search,
      sortBy = 'publishedAt',
      sortOrder = 'desc'
    } = req.query;

    const result = MockDB.getBlogPosts(
      parseInt(page as string),
      parseInt(limit as string)
    );

    let posts = result.posts;

    // Apply filters
    if (category) {
      posts = posts.filter(post => 
        post.category.toLowerCase() === (category as string).toLowerCase()
      );
    }

    if (tag) {
      posts = posts.filter(post => 
        post.tags.some(t => t.toLowerCase() === (tag as string).toLowerCase())
      );
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some(t => t.toLowerCase().includes(searchTerm))
      );
    }

    // Apply sorting
    posts.sort((a, b) => {
      const order = sortOrder === 'desc' ? -1 : 1;
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title) * order;
        case 'views':
          return (a.views - b.views) * order;
        case 'publishedAt':
        default:
          const aDate = new Date(a.publishedAt || a.createdAt).getTime();
          const bDate = new Date(b.publishedAt || b.createdAt).getTime();
          return (aDate - bDate) * order;
      }
    });

    res.status(200).json({
      success: true,
      data: posts,
      pagination: result.pagination
    });

  } catch (error) {
    console.error('Blog API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}