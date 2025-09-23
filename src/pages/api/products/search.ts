// pages/api/products/search.ts - Advanced product search endpoint

import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, Product } from '../../../lib/types';
import { MockDB } from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Product[]>>
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
      q = '',
      category,
      minPrice,
      maxPrice,
      sizes,
      colors,
      inStock,
      isNew,
      isBestseller,
      rating,
      sortBy = 'relevance',
      sortOrder = 'desc',
      page = '1',
      limit = '12'
    } = req.query;

    if (!q || (q as string).trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const searchQuery = (q as string).trim().toLowerCase();
    
    // Advanced search with relevance scoring
    const products = MockDB.getProducts({}, 1, 1000).products; // Get all for search
    
    // Calculate relevance scores
    const searchResults = products.map(product => {
      let relevanceScore = 0;
      
      // Name match (highest weight)
      if (product.name.toLowerCase().includes(searchQuery)) {
        relevanceScore += 10;
        // Exact match bonus
        if (product.name.toLowerCase() === searchQuery) {
          relevanceScore += 5;
        }
      }
      
      // Category match
      if (product.category.toLowerCase().includes(searchQuery)) {
        relevanceScore += 5;
      }
      
      // Description match
      if (product.description?.toLowerCase().includes(searchQuery)) {
        relevanceScore += 3;
      }
      
      // Tags match
      if (product.tags?.some(tag => tag.toLowerCase().includes(searchQuery))) {
        relevanceScore += 4;
      }
      
      // Materials match
      if (product.materials?.some(material => material.toLowerCase().includes(searchQuery))) {
        relevanceScore += 2;
      }
      
      // Boost for popular items
      if (product.isBestseller) {
        relevanceScore += 1;
      }
      
      if (product.rating >= 4.5) {
        relevanceScore += 1;
      }
      
      return {
        ...product,
        relevanceScore
      };
    }).filter(product => product.relevanceScore > 0);

    // Apply additional filters
    let filteredResults = searchResults;
    
    if (category) {
      filteredResults = filteredResults.filter(p => 
        p.category.toLowerCase().includes((category as string).toLowerCase())
      );
    }
    
    if (minPrice) {
      filteredResults = filteredResults.filter(p => p.price >= parseFloat(minPrice as string));
    }
    
    if (maxPrice) {
      filteredResults = filteredResults.filter(p => p.price <= parseFloat(maxPrice as string));
    }
    
    if (sizes) {
      const sizeArray = (sizes as string).split(',');
      filteredResults = filteredResults.filter(p => 
        p.sizes?.some(size => sizeArray.includes(size))
      );
    }
    
    if (colors) {
      const colorArray = (colors as string).split(',');
      filteredResults = filteredResults.filter(p => 
        p.colors?.some(color => colorArray.includes(color))
      );
    }
    
    if (inStock !== undefined) {
      filteredResults = filteredResults.filter(p => p.inStock === (inStock === 'true'));
    }
    
    if (isNew !== undefined) {
      filteredResults = filteredResults.filter(p => p.isNew === (isNew === 'true'));
    }
    
    if (isBestseller !== undefined) {
      filteredResults = filteredResults.filter(p => p.isBestseller === (isBestseller === 'true'));
    }
    
    if (rating) {
      filteredResults = filteredResults.filter(p => p.rating >= parseFloat(rating as string));
    }

    // Sort results
    filteredResults.sort((a, b) => {
      const order = sortOrder === 'desc' ? -1 : 1;
      
      switch (sortBy) {
        case 'relevance':
          return (a.relevanceScore - b.relevanceScore) * -1; // Always desc for relevance
        case 'price':
          return (a.price - b.price) * order;
        case 'rating':
          return (a.rating - b.rating) * order;
        case 'name':
          return a.name.localeCompare(b.name) * order;
        case 'newest':
          return (new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()) * order;
        case 'popular':
          return (a.reviewCount - b.reviewCount) * order;
        default:
          return (a.relevanceScore - b.relevanceScore) * -1;
      }
    });

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const total = filteredResults.length;
    const totalPages = Math.ceil(total / limitNum);
    const offset = (pageNum - 1) * limitNum;
    
    const paginatedResults = filteredResults.slice(offset, offset + limitNum);
    
    // Remove relevance score from response
    const cleanResults = paginatedResults.map(({ relevanceScore, ...product }) => product);

    res.status(200).json({
      success: true,
      data: cleanResults,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages
      }
    });

  } catch (error) {
    console.error('Search API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}