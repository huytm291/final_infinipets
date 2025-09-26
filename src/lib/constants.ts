// Brand Colors
export const COLORS = {
  primary: {
    blue: '#0077C2',
    lightBlue: '#00B8D9', 
    green: '#00C853'
  },
  accent: {
    pink: '#FF69B4', // For hearts/favorites
    yellow: '#FFFF00' // For stars/ratings
  }
}

// Product Categories
export const CATEGORIES = [
  {
    id: 'casual',
    name: 'Casual Wear',
    slug: 'casual-wear',
    image: '/api/placeholder/300/200',
    description: 'Comfortable everyday outfits for your pets'
  },
  {
    id: 'cosplay',
    name: 'Cosplay Costumes', 
    slug: 'cosplay',
    image: '/api/placeholder/300/200',
    description: 'Unique and creative costume designs'
  },
  {
    id: 'handmade',
    name: 'Handmade & Custom Design',
    slug: 'handmade-custom',
    image: '/api/placeholder/300/200',
    description: 'Handcrafted products and custom designs'
  },
  {
    id: 'meme',
    name: 'Trending Meme Outfits',
    slug: 'meme-trending',
    image: '/api/placeholder/300/200',
    description: 'Latest trending meme-inspired costumes'
  },
  {
    id: 'premium',
    name: 'Premium Theme Collections',
    slug: 'premium-combos',
    image: '/api/placeholder/300/200',
    description: 'High-end collections with premium quality'
  }
]

// Enhanced Featured Products for Hero Slider - 5 Products representing 5 categories
export const HERO_PRODUCTS = [
  {
    id: 1,
    name: 'Premium Golden Retriever Tuxedo',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop&crop=center',
    category: 'premium',
    description: 'Luxurious handcrafted tuxedo for special occasions',
    isNew: false,
    isBestseller: true,
    features: ['Premium Fabric', 'Handcrafted', 'Adjustable Fit'],
    gradient: 'from-amber-600 via-yellow-500 to-orange-600'
  },
  {
    id: 2,
    name: 'Superhero Cape Collection',
    price: 89,
    originalPrice: 120,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop&crop=center',
    category: 'cosplay',
    description: 'Transform your pet into their favorite superhero',
    isNew: true,
    isBestseller: false,
    features: ['Multiple Heroes', 'Detachable Cape', 'LED Lights'],
    gradient: 'from-red-600 via-blue-600 to-purple-600'
  },
  {
    id: 3,
    name: 'Viral TikTok Banana Costume',
    price: 45,
    originalPrice: 60,
    image: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=800&h=600&fit=crop&crop=center',
    category: 'meme',
    description: 'The most viral pet costume trending on social media',
    isNew: true,
    isBestseller: true,
    features: ['Viral Design', 'Soft Material', 'Photo Ready'],
    gradient: 'from-yellow-400 via-orange-400 to-red-500'
  },
  {
    id: 4,
    name: 'Custom Embroidered Casual Wear',
    price: 120,
    originalPrice: 150,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop&crop=center',
    category: 'handmade',
    description: 'Personalized handmade outfits with custom embroidery',
    isNew: true,
    isBestseller: true,
    features: ['Custom Name', 'Hand Embroidered', 'Unique Design'],
    gradient: 'from-emerald-600 via-teal-500 to-cyan-600'
  },
  {
    id: 5,
    name: 'Cozy Winter Casual Collection',
    price: 65,
    originalPrice: 85,
    image: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=800&h=600&fit=crop&crop=center',
    category: 'casual',
    description: 'Comfortable everyday wear for all seasons',
    isNew: false,
    isBestseller: true,
    features: ['All Weather', 'Breathable', 'Easy Care'],
    gradient: 'from-indigo-600 via-purple-500 to-pink-600'
  }
]

// Sample Products by Category
export const SAMPLE_PRODUCTS = {
  casual: [
    { 
      id: 101, 
      name: 'Classic Red Bandana', 
      price: 15, 
      originalPrice: 20,
      image: '/api/placeholder/250/250', 
      rating: 4.5, 
      reviewCount: 128,
      category: 'casual',
      description: 'Classic red bandana',
      sizes: ['S', 'M', 'L'],
      colors: ['Red', 'Blue', 'Black'],
      inStock: true,
      isNew: false,
      isBestseller: true
    },
    { 
      id: 102, 
      name: 'Cozy Winter Sweater', 
      price: 35, 
      originalPrice: 45,
      image: '/api/placeholder/250/250', 
      rating: 4.8, 
      reviewCount: 89,
      category: 'casual',
      description: 'Warm winter sweater',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Gray', 'Navy', 'Burgundy'],
      inStock: true,
      isNew: false,
      isBestseller: false
    },
    { 
      id: 103, 
      name: 'Summer Hawaiian Shirt', 
      price: 28, 
      originalPrice: 35,
      image: '/api/placeholder/250/250', 
      rating: 4.2, 
      reviewCount: 156,
      category: 'casual',
      description: 'Hawaiian shirt for summer',
      sizes: ['S', 'M', 'L'],
      colors: ['Tropical', 'Sunset', 'Ocean'],
      inStock: true,
      isNew: true,
      isBestseller: false
    },
    { 
      id: 104, 
      name: 'Elegant Bow Tie', 
      price: 22, 
      originalPrice: 30,
      image: '/api/placeholder/250/250', 
      rating: 4.6, 
      reviewCount: 67,
      category: 'casual',
      description: 'Elegant bow tie for special occasions',
      sizes: ['One Size'],
      colors: ['Black', 'White', 'Navy', 'Burgundy'],
      inStock: true,
      isNew: false,
      isBestseller: false
    }
  ],
  cosplay: [
    { 
      id: 201, 
      name: 'Batman Dark Knight', 
      price: 85, 
      originalPrice: 110,
      image: '/api/placeholder/250/250', 
      rating: 4.9, 
      reviewCount: 234,
      category: 'cosplay',
      description: 'Detailed Batman costume',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Black'],
      inStock: true,
      isNew: false,
      isBestseller: true
    },
    { 
      id: 202, 
      name: 'Princess Elsa Dress', 
      price: 75, 
      originalPrice: 95,
      image: '/api/placeholder/250/250', 
      rating: 4.7, 
      reviewCount: 189,
      category: 'cosplay',
      description: 'Gorgeous Princess Elsa dress',
      sizes: ['XS', 'S', 'M'],
      colors: ['Ice Blue', 'White'],
      inStock: true,
      isNew: false,
      isBestseller: false
    },
    { 
      id: 203, 
      name: 'Pirate Captain Outfit', 
      price: 65, 
      originalPrice: 80,
      image: '/api/placeholder/250/250', 
      rating: 4.4, 
      reviewCount: 112,
      category: 'cosplay',
      description: 'Pirate captain costume',
      sizes: ['S', 'M', 'L'],
      colors: ['Brown', 'Black'],
      inStock: true,
      isNew: true,
      isBestseller: false
    },
    { 
      id: 204, 
      name: 'Wizard Robe & Hat', 
      price: 70, 
      originalPrice: 90,
      image: '/api/placeholder/250/250', 
      rating: 4.6, 
      reviewCount: 98,
      category: 'cosplay',
      description: 'Wizard robe and hat set',
      sizes: ['S', 'M', 'L'],
      colors: ['Purple', 'Blue', 'Black'],
      inStock: false,
      isNew: false,
      isBestseller: false
    }
  ],
  handmade: [
    { 
      id: 301, 
      name: 'Custom Name Embroidery', 
      price: 120, 
      originalPrice: 150,
      image: '/api/placeholder/250/250', 
      rating: 5.0, 
      reviewCount: 45,
      category: 'handmade',
      description: 'Custom name embroidery service',
      sizes: ['Custom'],
      colors: ['Various'],
      inStock: true,
      isNew: true,
      isBestseller: true
    },
    { 
      id: 302, 
      name: 'Hand-knitted Scarf', 
      price: 45, 
      originalPrice: 60,
      image: '/api/placeholder/250/250', 
      rating: 4.8, 
      reviewCount: 73,
      category: 'handmade',
      description: 'Hand-knitted scarf',
      sizes: ['One Size'],
      colors: ['Red', 'Blue', 'Green', 'Purple'],
      inStock: true,
      isNew: false,
      isBestseller: false
    },
    { 
      id: 303, 
      name: 'Personalized Photo Print', 
      price: 55, 
      originalPrice: 70,
      image: '/api/placeholder/250/250', 
      rating: 4.9, 
      reviewCount: 167,
      category: 'handmade',
      description: 'Personalized photo printing',
      sizes: ['S', 'M', 'L'],
      colors: ['Full Color'],
      inStock: true,
      isNew: true,
      isBestseller: true
    },
    { 
      id: 304, 
      name: 'Artisan Leather Collar', 
      price: 95, 
      originalPrice: 120,
      image: '/api/placeholder/250/250', 
      rating: 4.7, 
      reviewCount: 56,
      category: 'handmade',
      description: 'Premium handcrafted leather collar',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Brown', 'Black', 'Tan'],
      inStock: true,
      isNew: false,
      isBestseller: false
    }
  ],
  meme: [
    { 
      id: 401, 
      name: 'Doge Shiba Inu Costume', 
      price: 38, 
      originalPrice: 50,
      image: '/api/placeholder/250/250', 
      rating: 4.3, 
      reviewCount: 203,
      category: 'meme',
      description: 'Doge Shiba Inu costume',
      sizes: ['S', 'M', 'L'],
      colors: ['Yellow', 'Orange'],
      inStock: true,
      isNew: false,
      isBestseller: true
    },
    { 
      id: 402, 
      name: 'Grumpy Cat Expression', 
      price: 42, 
      originalPrice: 55,
      image: '/api/placeholder/250/250', 
      rating: 4.1, 
      reviewCount: 134,
      category: 'meme',
      description: 'Grumpy cat costume',
      sizes: ['XS', 'S', 'M'],
      colors: ['Gray', 'White'],
      inStock: true,
      isNew: true,
      isBestseller: false
    },
    { 
      id: 403, 
      name: 'Among Us Crewmate', 
      price: 35, 
      originalPrice: 45,
      image: '/api/placeholder/250/250', 
      rating: 4.5, 
      reviewCount: 289,
      category: 'meme',
      description: 'Among Us crewmate costume',
      sizes: ['S', 'M', 'L'],
      colors: ['Red', 'Blue', 'Green', 'Pink', 'Orange'],
      inStock: true,
      isNew: false,
      isBestseller: true
    },
    { 
      id: 404, 
      name: 'Pepe Frog Hoodie', 
      price: 40, 
      originalPrice: 52,
      image: '/api/placeholder/250/250', 
      rating: 4.2, 
      reviewCount: 178,
      category: 'meme',
      description: 'Pepe frog hoodie',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Green'],
      inStock: false,
      isNew: false,
      isBestseller: false
    }
  ],
  premium: [
    { 
      id: 501, 
      name: 'Royal Wedding Collection', 
      price: 450, 
      originalPrice: 600,
      image: '/api/placeholder/250/250', 
      rating: 5.0, 
      reviewCount: 23,
      category: 'premium',
      description: 'Royal wedding collection',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['White', 'Ivory', 'Champagne'],
      inStock: true,
      isNew: true,
      isBestseller: true
    },
    { 
      id: 502, 
      name: 'Hollywood Red Carpet', 
      price: 380, 
      originalPrice: 500,
      image: '/api/placeholder/250/250', 
      rating: 4.9, 
      reviewCount: 34,
      category: 'premium',
      description: 'Hollywood red carpet outfit',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Black', 'Red', 'Gold'],
      inStock: true,
      isNew: false,
      isBestseller: true
    },
    { 
      id: 503, 
      name: 'Victorian Era Ensemble', 
      price: 420, 
      originalPrice: 550,
      image: '/api/placeholder/250/250', 
      rating: 4.8, 
      reviewCount: 18,
      category: 'premium',
      description: 'Victorian era costume',
      sizes: ['S', 'M', 'L'],
      colors: ['Burgundy', 'Navy', 'Forest Green'],
      inStock: true,
      isNew: false,
      isBestseller: false
    },
    { 
      id: 504, 
      name: 'Space Explorer Suit', 
      price: 350, 
      originalPrice: 450,
      image: '/api/placeholder/250/250', 
      rating: 4.7, 
      reviewCount: 41,
      category: 'premium',
      description: 'Space explorer astronaut suit',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Silver', 'White'],
      inStock: false,
      isNew: true,
      isBestseller: false
    }
  ]
}

// Customer Feedback
export const CUSTOMER_FEEDBACK = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    comment: 'Absolutely love the quality! My Golden Retriever looks like a superstar in his new tuxedo. The fabric is premium and the fit is perfect.',
    product: 'Premium Golden Retriever Tuxedo',
    verified: true,
    helpful: 23,
    createdAt: new Date('2024-01-15')
  },
  {
    id: 2, 
    name: 'Mike Chen',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    comment: 'The custom embroidery turned out perfect. INFINIPETS truly understands pet fashion! Excellent customer service too.',
    product: 'Custom Name Embroidery',
    verified: true,
    helpful: 18,
    createdAt: new Date('2024-01-10')
  },
  {
    id: 3,
    name: 'Emma Rodriguez', 
    avatar: '/api/placeholder/60/60',
    rating: 4,
    comment: 'Fast shipping and great customer service. The superhero cape is adorable and well-made. Will definitely order again!',
    product: 'Superhero Cape Collection',
    verified: true,
    helpful: 15,
    createdAt: new Date('2024-01-08')
  }
]

// Navigation Links
export const NAV_LINKS = [
  { name: 'New Arrivals', href: '/new-arrivals', icon: '✨' },
  { name: 'Best Sellers', href: '/bestsellers', icon: '🔥' },
  { name: 'Reviews', href: '/feedback', icon: '⭐' },
  { name: 'About Us', href: '/about', icon: '🏠' },
  { name: 'Contact', href: '/contact', icon: '📞' }
]

// Languages
export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', nativeName: 'Tiếng Việt' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' }
]

// User Ranks
export const USER_RANKS = {
  bronze: {
    name: 'Bronze',
    minSpent: 1,
    color: '#CD7F32',
    benefits: ['Free shipping from $50', 'Basic customer support'],
    icon: '🥉'
  },
  silver: {
    name: 'Silver',
    minSpent: 100,
    color: '#C0C0C0',
    benefits: ['Free shipping from $30', 'Priority customer support', '5% discount'],
    icon: '🥈'
  },
  gold: {
    name: 'Gold',
    minSpent: 1000,
    color: '#FFD700',
    benefits: ['Free shipping on all orders', '24/7 VIP support', '10% discount', 'Early access to new products'],
    icon: '🥇'
  },
  diamond: {
    name: 'Diamond',
    minSpent: 10000,
    color: '#B9F2FF',
    benefits: ['All Gold benefits', 'Free custom design', 'Exclusive VIP events', '15% discount'],
    icon: '💎'
  }
}

// Shipping Options
export const SHIPPING_OPTIONS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 9.99,
    estimatedDays: '5-7'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: 19.99,
    estimatedDays: '2-3'
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day',
    price: 39.99,
    estimatedDays: '1'
  }
]

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'visa', name: 'Visa', logo: '/api/placeholder/40/25', type: 'credit_card' },
  { id: 'mastercard', name: 'Mastercard', logo: '/api/placeholder/40/25', type: 'credit_card' },
  { id: 'amex', name: 'American Express', logo: '/api/placeholder/40/25', type: 'credit_card' },
  { id: 'paypal', name: 'PayPal', logo: '/api/placeholder/40/25', type: 'paypal' },
  { id: 'apple_pay', name: 'Apple Pay', logo: '/api/placeholder/40/25', type: 'apple_pay' },
  { id: 'google_pay', name: 'Google Pay', logo: '/api/placeholder/40/25', type: 'google_pay' }
]

// Size Guide
export const SIZE_GUIDE = {
  dog: {
    XS: { chest: '25-30cm', neck: '20-25cm', length: '15-20cm', weight: '1-3kg' },
    S: { chest: '30-35cm', neck: '25-30cm', length: '20-25cm', weight: '3-6kg' },
    M: { chest: '35-45cm', neck: '30-35cm', length: '25-35cm', weight: '6-12kg' },
    L: { chest: '45-55cm', neck: '35-40cm', length: '35-45cm', weight: '12-25kg' },
    XL: { chest: '55-65cm', neck: '40-50cm', length: '45-55cm', weight: '25-40kg' },
    XXL: { chest: '65-75cm', neck: '50-60cm', length: '55-65cm', weight: '40kg+' }
  },
  cat: {
    XS: { chest: '20-25cm', neck: '15-20cm', length: '15-20cm', weight: '1-2kg' },
    S: { chest: '25-30cm', neck: '20-25cm', length: '20-25cm', weight: '2-4kg' },
    M: { chest: '30-35cm', neck: '25-30cm', length: '25-30cm', weight: '4-6kg' },
    L: { chest: '35-40cm', neck: '30-35cm', length: '30-35cm', weight: '6-8kg' }
  }
}

// FAQ Data
export const FAQ_DATA = [
  {
    id: 1,
    question: 'How do I choose the right size for my pet?',
    answer: 'Measure your pet\'s chest circumference, neck, and back length. Refer to our detailed size chart on each product page. If your pet is between sizes, choose the larger size for comfort.'
  },
  {
    id: 2,
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of delivery. Items must be in original condition with tags attached and unused.'
  },
  {
    id: 3,
    question: 'How long does shipping take?',
    answer: 'Standard shipping: 5-7 business days. Express shipping: 2-3 business days. Overnight shipping: 1 business day (available in select areas).'
  },
  {
    id: 4,
    question: 'Do you offer custom designs?',
    answer: 'Yes! We provide custom design services for Gold rank customers and above. Processing time is 7-14 business days.'
  }
]

// Blog Categories
export const BLOG_CATEGORIES = [
  { id: 'care', name: 'Pet Care', slug: 'pet-care' },
  { id: 'fashion', name: 'Pet Fashion', slug: 'pet-fashion' },
  { id: 'tips', name: 'Tips & Tricks', slug: 'tips-tricks' },
  { id: 'events', name: 'Events', slug: 'events' },
  { id: 'news', name: 'News', slug: 'news' }
]

// Social Media Links
export const SOCIAL_LINKS = [
  { name: 'Facebook', url: 'https://facebook.com/infinipets', icon: 'facebook' },
  { name: 'Instagram', url: 'https://instagram.com/infinipets', icon: 'instagram' },
  { name: 'Twitter', url: 'https://twitter.com/infinipets', icon: 'twitter' },
  { name: 'YouTube', url: 'https://youtube.com/infinipets', icon: 'youtube' },
  { name: 'TikTok', url: 'https://tiktok.com/@infinipets', icon: 'tiktok' }
]

// Contact Information
export const CONTACT_INFO = {
  email: 'support@infinipets.com',
  phone: '+1 (555) 123-4567',
  address: {
    street: '123 Pet Fashion Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  },
  businessHours: {
    weekdays: '9:00 AM - 6:00 PM EST',
    weekends: '10:00 AM - 4:00 PM EST'
  }
}

// API Endpoints (for future backend integration)
export const API_ENDPOINTS = {
  products: '/api/products',
  categories: '/api/categories',
  users: '/api/users',
  orders: '/api/orders',
  reviews: '/api/reviews',
  auth: '/api/auth',
  cart: '/api/cart',
  wishlist: '/api/wishlist',
  notifications: '/api/notifications'
}