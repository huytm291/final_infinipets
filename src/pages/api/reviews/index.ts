import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, Review } from '../../../lib/types';
import { AuthService } from '../../../lib/auth';
import { MockDB } from '../../../lib/db';

// Mock reviews storage (in real app, use database)
const allReviews: Review[] = [...MockDB.getReviewsByProductId(1, 1, 100).reviews];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Review[] | Review>>
) {
  try {
    switch (req.method) {
      case 'GET':
        await handleGetReviews(req, res);
        break;
      
      case 'POST':
        await handleCreateReview(req, res);
        break;
      
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({
          success: false,
          error: `Method ${req.method} not allowed`
        });
    }
  } catch (error) {
    console.error('Reviews API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

async function handleGetReviews(req: NextApiRequest, res: NextApiResponse) {
  const {
    productId,
    page = '1',
    limit = '5',
    rating,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  if (!productId) {
    return res.status(400).json({
      success: false,
      error: 'Product ID is required'
    });
  }

  let reviews = allReviews.filter(r => r.productId === parseInt(productId as string));

  // Filter by rating if provided
  if (rating) {
    reviews = reviews.filter(r => r.rating === parseInt(rating as string));
  }

  // Sort reviews
  reviews.sort((a, b) => {
    const order = sortOrder === 'desc' ? -1 : 1;
    switch (sortBy) {
      case 'rating':
        return (a.rating - b.rating) * order;
      case 'helpful':
        return (a.helpful - b.helpful) * order;
      case 'createdAt':
      default:
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * order;
    }
  });

  // Pagination
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const total = reviews.length;
  const totalPages = Math.ceil(total / limitNum);
  const offset = (pageNum - 1) * limitNum;
  const paginatedReviews = reviews.slice(offset, offset + limitNum);

  res.status(200).json({
    success: true,
    data: paginatedReviews,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages
    }
  });
}

async function handleCreateReview(req: NextApiRequest, res: NextApiResponse) {
  const user = await AuthService.getCurrentUser(req);
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }

  const { productId, rating, title, content, images } = req.body;

  // Validate required fields
  if (!productId || !rating || !title || !content) {
    return res.status(400).json({
      success: false,
      error: 'Product ID, rating, title, and content are required'
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      error: 'Rating must be between 1 and 5'
    });
  }

  // Check if product exists
  const product = MockDB.getProductById(parseInt(productId));
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }

  // Check if user already reviewed this product
  const existingReview = allReviews.find(r => 
    r.productId === parseInt(productId) && r.userId === user.id
  );
  
  if (existingReview) {
    return res.status(409).json({
      success: false,
      error: 'You have already reviewed this product'
    });
  }

  // Create new review
  const newReview: Review = {
    id: MockDB.generateId('review_'),
    productId: parseInt(productId),
    userId: user.id,
    userName: `${user.firstName} ${user.lastName}`,
    userAvatar: user.avatar,
    rating: parseInt(rating),
    title: title.trim(),
    content: content.trim(),
    images: images || [],
    verified: false, // In real app, check if user purchased the product
    helpful: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  allReviews.push(newReview);

  res.status(201).json({
    success: true,
    data: newReview,
    message: 'Review created successfully'
  });
}