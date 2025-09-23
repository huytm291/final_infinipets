// services/api.ts - API service layer for INFINIPETS
import { ApiResponse, Product, Cart, User, Order, BlogPost, Category, Newsletter, SearchFilters } from '@/lib/types';

const API_BASE_URL = '/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth APIs
  async login(email: string, password: string, rememberMe = false) {
    const response = await this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, rememberMe }),
    });
    
    if (response.success && response.data?.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const response = await this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.success && response.data?.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  async getCurrentUser() {
    return this.request<User>('/auth/me');
  }

  // Products APIs
  async getProducts(filters?: SearchFilters, page = 1, limit = 12) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    
    return this.request<{
      products: Product[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(`/products?${params}`);
  }

  async getProductById(id: number) {
    return this.request<Product>(`/products/${id}`);
  }

  async searchProducts(query: string, filters?: SearchFilters) {
    const params = new URLSearchParams({
      q: query,
    });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    
    return this.request<{
      products: Product[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(`/products/search?${params}`);
  }

  async getCategories() {
    return this.request<Category[]>('/products/categories');
  }

  // Cart APIs
  async getCart() {
    return this.request<Cart>('/cart');
  }

  async addToCart(productId: number, size: string, color: string, quantity = 1) {
    return this.request<Cart>('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, size, color, quantity }),
    });
  }

  async updateCartItem(itemId: string, quantity: number) {
    return this.request<Cart>('/cart', {
      method: 'PUT',
      body: JSON.stringify({ itemId, quantity }),
    });
  }

  async clearCart() {
    return this.request<Cart>('/cart', {
      method: 'DELETE',
    });
  }

  // Orders APIs
  async getOrders(page = 1, limit = 10) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    return this.request<{
      orders: Order[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(`/orders?${params}`);
  }

  async getOrderById(id: string) {
    return this.request<Order>(`/orders/${id}`);
  }

  async createOrder(orderData: Partial<Order>) {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // Blog APIs
  async getBlogPosts(page = 1, limit = 6) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    return this.request<{
      posts: BlogPost[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(`/blog?${params}`);
  }

  async getBlogPostBySlug(slug: string) {
    return this.request<BlogPost>(`/blog/${slug}`);
  }

  // Newsletter API
  async subscribeNewsletter(email: string, preferences?: Partial<Newsletter['preferences']>) {
    return this.request<Newsletter>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, preferences }),
    });
  }

  // Reviews APIs
  async getProductReviews(productId: number, page = 1, limit = 5) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    return this.request(`/reviews/${productId}?${params}`);
  }

  // Stats APIs
  async getStats() {
    return this.request('/stats');
  }

  // Upload APIs
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    return fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then(res => res.json());
  }
}

export const apiService = new ApiService();
export default apiService;