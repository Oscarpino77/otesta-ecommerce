/// <reference types="vite/client" />
import type {
  Product,
  Order,
  CartItem,
  ChatConversation,
  ChatMessage,
  WishlistItem,
  User,
} from '@/types';

// Base44 API Client
const API_BASE = (import.meta.env.VITE_API_BASE as string) || 'https://api.base44.io/v1';

interface RequestOptions extends RequestInit {
  params?: Record<string, any>;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;
  
  let url = `${API_BASE}${endpoint}`;
  
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) url += `?${queryString}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      // Add auth token if available
      ...(fetchOptions.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// Product APIs
export const productAPI = {
  async getAll(params?: { category?: string; priceMin?: number; priceMax?: number; sizes?: string }) {
    return apiRequest<Product[]>('/products', { params });
  },

  async getById(id: string) {
    return apiRequest<Product>(`/products/${id}`);
  },

  async create(data: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    return apiRequest<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: Partial<Product>) {
    return apiRequest<Product>(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return apiRequest<void>(`/products/${id}`, { method: 'DELETE' });
  },
};

// Order APIs
export const orderAPI = {
  async getAll(params?: { status?: string; customer_email?: string }) {
    return apiRequest<Order[]>('/orders', { params });
  },

  async getById(id: string) {
    return apiRequest<Order>(`/orders/${id}`);
  },

  async create(data: Omit<Order, 'id' | 'order_number' | 'created_at' | 'updated_at'>) {
    return apiRequest<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: Partial<Order>) {
    return apiRequest<Order>(`/orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return apiRequest<void>(`/orders/${id}`, { method: 'DELETE' });
  },
};

// Cart APIs
export const cartAPI = {
  async getAll(userEmail: string) {
    return apiRequest<CartItem[]>('/cart-items', {
      params: { user_email: userEmail },
    });
  },

  async add(data: Omit<CartItem, 'id' | 'created_at' | 'updated_at'>) {
    return apiRequest<CartItem>('/cart-items', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: Partial<CartItem>) {
    return apiRequest<CartItem>(`/cart-items/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return apiRequest<void>(`/cart-items/${id}`, { method: 'DELETE' });
  },

  async clear(userEmail: string) {
    return apiRequest<void>('/cart-items/clear', {
      method: 'POST',
      body: JSON.stringify({ user_email: userEmail }),
    });
  },
};

// Chat APIs
export const chatAPI = {
  async getConversations(params?: { client_email?: string; status?: string }) {
    return apiRequest<ChatConversation[]>('/chat-conversations', { params });
  },

  async getConversation(id: string) {
    return apiRequest<ChatConversation>(`/chat-conversations/${id}`);
  },

  async createConversation(data: Omit<ChatConversation, 'id' | 'created_at' | 'updated_at'>) {
    return apiRequest<ChatConversation>('/chat-conversations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateConversation(id: string, data: Partial<ChatConversation>) {
    return apiRequest<ChatConversation>(`/chat-conversations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async getMessages(conversationId: string) {
    return apiRequest<ChatMessage[]>(`/chat-conversations/${conversationId}/messages`);
  },

  async sendMessage(conversationId: string, data: Omit<ChatMessage, 'id' | 'created_at'>) {
    return apiRequest<ChatMessage>(`/chat-conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async markMessageAsRead(conversationId: string, messageId: string) {
    return apiRequest<ChatMessage>(
      `/chat-conversations/${conversationId}/messages/${messageId}/read`,
      { method: 'PATCH' }
    );
  },
};

// Wishlist APIs
export const wishlistAPI = {
  async getAll(userEmail: string) {
    return apiRequest<WishlistItem[]>('/wishlist-items', {
      params: { user_email: userEmail },
    });
  },

  async add(data: Omit<WishlistItem, 'id' | 'created_at'>) {
    return apiRequest<WishlistItem>('/wishlist-items', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return apiRequest<void>(`/wishlist-items/${id}`, { method: 'DELETE' });
  },

  async deleteByProductAndUser(productId: string, userEmail: string) {
    return apiRequest<void>('/wishlist-items/delete', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, user_email: userEmail }),
    });
  },
};

// User APIs
export const userAPI = {
  async getProfile() {
    return apiRequest<User>('/users/profile');
  },

  async updateProfile(data: Partial<User>) {
    return apiRequest<User>('/users/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async logout() {
    return apiRequest<void>('/auth/logout', { method: 'POST' });
  },
};

// Analytics APIs
export const analyticsAPI = {
  async getDashboardStats() {
    return apiRequest<{
      totalRevenue: number;
      totalOrders: number;
      completedOrders: number;
      averageOrderValue: number;
      conversationCount: number;
    }>('/analytics/dashboard');
  },

  async getRevenueByMonth(months: number = 6) {
    return apiRequest<{ month: string; revenue: number }[]>('/analytics/revenue-by-month', {
      params: { months },
    });
  },

  async getTopProducts(limit: number = 5) {
    return apiRequest<{ product_id: string; product_name: string; sold: number }[]>(
      '/analytics/top-products',
      { params: { limit } }
    );
  },

  async getRecentOrders(limit: number = 5) {
    return apiRequest<Order[]>('/analytics/recent-orders', { params: { limit } });
  },
};

// Inventory APIs
export const inventoryAPI = {
  async getStatus() {
    return apiRequest<{
      totalProducts: number;
      inStockCount: number;
      outOfStockCount: number;
      inventoryValue: number;
    }>('/inventory/status');
  },

  async getLowStockProducts(threshold: number = 5) {
    return apiRequest<Product[]>('/inventory/low-stock', { params: { threshold } });
  },

  async getByCategory(category: string) {
    return apiRequest<Product[]>('/inventory/by-category', { params: { category } });
  },
};
