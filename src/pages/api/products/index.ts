// lib/db.ts - Mock database utilities for INFINIPETS API

import { Product, User, Order, BlogPost, Review, Newsletter, Category, SearchFilters } from '../../../lib/types';

// Mock Products Database (extended from your existing data)
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Royal Crown Pet Costume",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviewCount: 124,
    category: "Cosplay Costumes",
    description: "Transform your pet into royalty with this elegant crown costume. Made from premium materials with adjustable straps for comfort.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Gold", "Silver", "Rose Gold"],
    inStock: true,
    isNew: true,
    isBestseller: false,
    tags: ["costume", "royal", "premium", "adjustable"],
    weight: 0.2,
    dimensions: { length: 15, width: 10, height: 8 },
    materials: ["Velvet", "Metal", "Elastic"],
    careInstructions: ["Hand wash only", "Air dry", "Do not bleach"],
    sku: "RCP-001",
    stockQuantity: 45,
    variants: {
      "XS-Gold": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=face&saturation=20",
      "S-Silver": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=entropy&brightness=10",
      "M-Rose Gold": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=center&contrast=20",
      "L-Gold": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=bottom"
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-09-20T15:30:00Z"
  },
  {
    id: 2,
    name: "Superhero Cape Set",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&crop=center",
    rating: 4.9,
    reviewCount: 89,
    category: "Cosplay Costumes",
    description: "Let your pet save the day with this amazing superhero cape. Includes cape and matching mask for the complete hero look.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Red", "Blue", "Black"],
    inStock: true,
    isNew: false,
    isBestseller: true,
    tags: ["superhero", "cape", "mask", "costume"],
    weight: 0.15,
    dimensions: { length: 20, width: 15, height: 2 },
    materials: ["Polyester", "Velcro"],
    careInstructions: ["Machine wash cold", "Tumble dry low"],
    sku: "SCS-002",
    stockQuantity: 67,
    variants: {
      "XS-Red": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&crop=face&hue=0",
      "S-Blue": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&crop=entropy&hue=200",
      "M-Black": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&crop=center&brightness=-20"
    },
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-09-18T12:15:00Z"
  },
  // Add more products as needed...
];

// Mock Users Database
export const MOCK_USERS: User[] = [
  {
    id: "user_1",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    phone: "+1-555-0123",
    dateOfBirth: "1990-05-15",
    preferences: {
      language: "en",
      currency: "USD",
      notifications: true
    },
    addresses: [
      {
        id: "addr_1",
        type: "shipping",
        firstName: "John",
        lastName: "Doe",
        address1: "123 Pet Street",
        city: "Pet City",
        state: "CA",
        zipCode: "90210",
        country: "US",
        phone: "+1-555-0123",
        isDefault: true
      }
    ],
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-09-20T10:30:00Z"
  }
];

// Mock Categories Database
export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat_1",
    name: "Cosplay Costumes",
    slug: "cosplay-costumes",
    description: "Transform your pet with our amazing costume collection",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop",
    productCount: 25
  },
  {
    id: "cat_2",
    name: "Casual Wear",
    slug: "casual-wear",
    description: "Comfortable everyday clothing for your pet",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop",
    productCount: 18
  },
  {
    id: "cat_3",
    name: "Premium Theme Collections",
    slug: "premium-collections",
    description: "Exclusive high-end fashion for discerning pet owners",
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=300&h=200&fit=crop",
    productCount: 12
  },
  {
    id: "cat_4",
    name: "Trending Meme Outfits",
    slug: "meme-outfits",
    description: "Internet-famous designs that will make everyone smile",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=200&fit=crop",
    productCount: 8
  },
  {
    id: "cat_5",
    name: "Handmade & Custom Design",
    slug: "handmade-custom",
    description: "Unique, lovingly crafted items with personal touch",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop",
    productCount: 15
  }
];

// Mock Blog Posts Database
export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog_1",
    title: "Top 10 Pet Fashion Trends for 2024",
    slug: "top-10-pet-fashion-trends-2024",
    excerpt: "Discover the hottest pet fashion trends that will make your furry friend the talk of the town this year.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    featuredImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=400&fit=crop",
    author: {
      id: "author_1",
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    category: "Fashion",
    tags: ["trends", "2024", "fashion", "pets"],
    published: true,
    publishedAt: "2024-09-15T10:00:00Z",
    createdAt: "2024-09-10T14:30:00Z",
    updatedAt: "2024-09-15T10:00:00Z",
    readTime: 5,
    views: 1250
  },
  {
    id: "blog_2",
    title: "How to Choose the Right Size Costume for Your Pet",
    slug: "choose-right-size-costume-pet",
    excerpt: "A comprehensive guide to measuring your pet and selecting the perfect fitting costume for maximum comfort.",
    content: "Choosing the right size is crucial for your pet's comfort and safety...",
    featuredImage: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=400&fit=crop",
    author: {
      id: "author_2",
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    category: "Guide",
    tags: ["sizing", "guide", "costume", "comfort"],
    published: true,
    publishedAt: "2024-09-10T09:00:00Z",
    createdAt: "2024-09-08T16:20:00Z",
    updatedAt: "2024-09-10T09:00:00Z",
    readTime: 8,
    views: 890
  }
];

// Mock Reviews Database
export const MOCK_REVIEWS: Review[] = [
  {
    id: "review_1",
    productId: 1,
    userId: "user_1",
    userName: "John Doe",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    title: "Perfect fit for my Golden Retriever!",
    content: "This crown costume is absolutely beautiful! The quality is amazing and my dog looks like true royalty. The adjustable straps make it very comfortable.",
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop&crop=entropy"
    ],
    verified: true,
    helpful: 12,
    createdAt: "2024-09-18T14:22:00Z",
    updatedAt: "2024-09-18T14:22:00Z"
  },
  {
    id: "review_2",
    productId: 1,
    userId: "user_2",
    userName: "Emily Smith",
    rating: 4,
    title: "Great quality, runs a bit small",
    content: "Love the design and materials, but I'd recommend ordering one size up. The gold color is gorgeous!",
    verified: true,
    helpful: 8,
    createdAt: "2024-09-16T11:15:00Z",
    updatedAt: "2024-09-16T11:15:00Z"
  }
];

// Utility functions for mock database operations
export class MockDB {
  // Products
  static getProducts(filters?: SearchFilters, page = 1, limit = 12) {
    let products = [...MOCK_PRODUCTS];
    
    // Apply filters
    if (filters?.category) {
      products = products.filter(p => p.category.toLowerCase().includes(filters.category.toLowerCase()));
    }
    
    if (filters?.minPrice) {
      products = products.filter(p => p.price >= filters.minPrice);
    }
    
    if (filters?.maxPrice) {
      products = products.filter(p => p.price <= filters.maxPrice);
    }
    
    if (filters?.inStock !== undefined) {
      products = products.filter(p => p.inStock === filters.inStock);
    }
    
    if (filters?.isNew !== undefined) {
      products = products.filter(p => p.isNew === filters.isNew);
    }
    
    if (filters?.isBestseller !== undefined) {
      products = products.filter(p => p.isBestseller === filters.isBestseller);
    }
    
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description?.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply sorting
    if (filters?.sortBy) {
      products.sort((a, b) => {
        const order = filters.sortOrder === 'desc' ? -1 : 1;
        switch (filters.sortBy) {
          case 'price':
            return (a.price - b.price) * order;
          case 'rating':
            return (a.rating - b.rating) * order;
          case 'name':
            return a.name.localeCompare(b.name) * order;
          case 'newest':
            return (new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()) * order;
          default:
            return 0;
        }
      });
    }
    
    // Pagination
    const total = products.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedProducts = products.slice(offset, offset + limit);
    
    return {
      products: paginatedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };
  }
  
  static getProductById(id: number) {
    return MOCK_PRODUCTS.find(p => p.id === id);
  }
  
  static getProductsByIds(ids: number[]) {
    return MOCK_PRODUCTS.filter(p => ids.includes(p.id));
  }
  
  // Users
  static getUserByEmail(email: string) {
    return MOCK_USERS.find(u => u.email === email);
  }
  
  static getUserById(id: string) {
    return MOCK_USERS.find(u => u.id === id);
  }
  
  // Categories
  static getCategories() {
    return MOCK_CATEGORIES;
  }
  
  static getCategoryBySlug(slug: string) {
    return MOCK_CATEGORIES.find(c => c.slug === slug);
  }
  
  // Blog
  static getBlogPosts(page = 1, limit = 6) {
    const total = MOCK_BLOG_POSTS.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const posts = MOCK_BLOG_POSTS.slice(offset, offset + limit);
    
    return {
      posts,
      pagination: { page, limit, total, totalPages }
    };
  }
  
  static getBlogPostBySlug(slug: string) {
    return MOCK_BLOG_POSTS.find(p => p.slug === slug);
  }
  
  // Reviews
  static getReviewsByProductId(productId: number, page = 1, limit = 5) {
    const reviews = MOCK_REVIEWS.filter(r => r.productId === productId);
    const total = reviews.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedReviews = reviews.slice(offset, offset + limit);
    
    return {
      reviews: paginatedReviews,
      pagination: { page, limit, total, totalPages }
    };
  }
  
  // Generate unique IDs
  static generateId(prefix = '') {
    return `${prefix}${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}