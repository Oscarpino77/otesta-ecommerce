// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  material: string;
  category: 'suits' | 'outerwear' | 'accessories' | 'shirts' | 'trousers';
  image_url: string;
  description: string;
  in_stock: boolean;
  stock_quantity: number;
  sizes: string[];
  stock_by_size: Record<string, number>;
  created_at?: string;
  updated_at?: string;
}

// Order Types
export interface OrderItem {
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  conversation_id?: string;
  shipping_address: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// Cart Types
export interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  quantity: number;
  size?: string;
  user_email: string;
  created_at?: string;
  updated_at?: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_email: string;
  sender_name: string;
  sender_role: 'client' | 'admin';
  message: string;
  product_reference?: {
    id: string;
    name: string;
    image_url: string;
    price: number;
  };
  is_read: boolean;
  created_at?: string;
}

export interface ChatConversation {
  id: string;
  client_email: string;
  client_name: string;
  status: 'active' | 'closed';
  last_message?: string;
  last_message_date?: string;
  unread_admin_count: number;
  unread_client_count: number;
  order_id?: string;
  created_at?: string;
  updated_at?: string;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  user_email: string;
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  created_at?: string;
}

// User Types
export interface User {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'user'
  created_at?: string
  updated_at?: string
}

// Admin User Type (aligned with standard User interface)
export interface AdminUser extends User {
  role: 'admin' | 'super_admin'
  name?: string
}

// Auth Types
export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'user';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
