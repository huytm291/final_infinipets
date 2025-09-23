// pages/api/index.ts - API root endpoint with documentation

import { NextApiRequest, NextApiResponse } from 'next';

interface ApiInfo {
  name: string;
  version: string;
  description: string;
  endpoints: {
    [category: string]: {
      [endpoint: string]: {
        method: string;
        description: string;
        auth?: boolean;
      };
    };
  };
  documentation: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiInfo>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      name: 'INFINIPETS API',
      version: '1.0.0',
      description: 'Method not allowed',
      endpoints: {},
      documentation: ''
    });
  }

  const apiInfo: ApiInfo = {
    name: 'INFINIPETS API',
    version: '1.0.0',
    description: 'Comprehensive e-commerce API for pet fashion and accessories',
    endpoints: {
      'Authentication': {
        'POST /api/auth/register': {
          method: 'POST',
          description: 'Register a new user account'
        },
        'POST /api/auth/login': {
          method: 'POST',
          description: 'Authenticate user and get access token'
        },
        'POST /api/auth/logout': {
          method: 'POST',
          description: 'Logout user and clear session'
        },
        'GET /api/auth/me': {
          method: 'GET',
          description: 'Get current user profile',
          auth: true
        }
      },
      'Products': {
        'GET /api/products': {
          method: 'GET',
          description: 'Get paginated list of products with filtering'
        },
        'POST /api/products': {
          method: 'POST',
          description: 'Create new product',
          auth: true
        },
        'GET /api/products/[id]': {
          method: 'GET',
          description: 'Get single product by ID'
        },
        'PUT /api/products/[id]': {
          method: 'PUT',
          description: 'Update product',
          auth: true
        },
        'DELETE /api/products/[id]': {
          method: 'DELETE',
          description: 'Delete product',
          auth: true
        },
        'GET /api/products/search': {
          method: 'GET',
          description: 'Advanced product search with relevance scoring'
        },
        'GET /api/products/categories': {
          method: 'GET',
          description: 'Get all product categories'
        }
      },
      'Shopping Cart': {
        'GET /api/cart': {
          method: 'GET',
          description: 'Get user shopping cart',
          auth: true
        },
        'POST /api/cart': {
          method: 'POST',
          description: 'Add item to cart',
          auth: true
        },
        'PUT /api/cart': {
          method: 'PUT',
          description: 'Update cart item quantity',
          auth: true
        },
        'DELETE /api/cart': {
          method: 'DELETE',
          description: 'Clear entire cart',
          auth: true
        }
      },
      'Wishlist': {
        'GET /api/wishlist': {
          method: 'GET',
          description: 'Get user wishlist',
          auth: true
        },
        'POST /api/wishlist': {
          method: 'POST',
          description: 'Add product to wishlist',
          auth: true
        },
        'DELETE /api/wishlist': {
          method: 'DELETE',
          description: 'Remove product from wishlist',
          auth: true
        }
      },
      'Orders': {
        'GET /api/orders': {
          method: 'GET',
          description: 'Get user order history',
          auth: true
        },
        'POST /api/orders': {
          method: 'POST',
          description: 'Create new order',
          auth: true
        },
        'GET /api/orders/[id]': {
          method: 'GET',
          description: 'Get single order details',
          auth: true
        },
        'PUT /api/orders/[id]': {
          method: 'PUT',
          description: 'Update order (cancel, add notes)',
          auth: true
        }
      },
      'Reviews': {
        'GET /api/reviews': {
          method: 'GET',
          description: 'Get product reviews with filtering'
        },
        'POST /api/reviews': {
          method: 'POST',
          description: 'Create product review',
          auth: true
        }
      },
      'Blog': {
        'GET /api/blog': {
          method: 'GET',
          description: 'Get blog posts with filtering and pagination'
        },
        'GET /api/blog/[slug]': {
          method: 'GET',
          description: 'Get single blog post by slug'
        }
      },
      'Newsletter': {
        'POST /api/newsletter/subscribe': {
          method: 'POST',
          description: 'Subscribe to newsletter'
        }
      },
      'File Upload': {
        'POST /api/upload/image': {
          method: 'POST',
          description: 'Upload image file',
          auth: true
        }
      },
      'Statistics': {
        'GET /api/stats/dashboard': {
          method: 'GET',
          description: 'Get dashboard statistics',
          auth: true
        }
      }
    },
    documentation: 'https://github.com/infinipets/api-docs'
  };

  res.status(200).json(apiInfo);
}