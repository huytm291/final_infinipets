// API service for authentication and data management
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Mock API responses
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  async login(email: string, password: string, rememberMe = false): Promise<APIResponse<{ user: User; token: string }>> {
    await delay(1000);
    
    try {
      // Mock authentication - accept any email/password for demo
      const user = mockUsers.find(u => u.email === email) || {
        id: Date.now().toString(),
        email: email,
        firstName: 'User',
        lastName: 'Demo'
      };

      const token = `mock-token-${user.id}`;
      
      // Store in localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('auth_token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      return { success: true, data: { user, token } };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  },

  async register(userData: RegisterData): Promise<APIResponse<{ user: User; token: string }>> {
    await delay(1000);
    
    try {
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName
      };

      const token = `mock-token-${newUser.id}`;
      
      // Store in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(newUser));

      return { success: true, data: { user: newUser, token } };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  },

  async logout(): Promise<APIResponse<void>> {
    await delay(500);
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Logout failed' };
    }
  },

  async getCurrentUser(): Promise<APIResponse<User>> {
    await delay(500);
    
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
      
      if (!token || !userData) {
        return { success: false, error: 'No authentication found' };
      }

      const user = JSON.parse(userData);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: 'Failed to get current user' };
    }
  }
};

// Export default for backward compatibility
export default apiService;