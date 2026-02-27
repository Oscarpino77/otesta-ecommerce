// Color Palette
export const COLORS = {
  primary: '#2D2D2D',
  accent: '#C9A227',
  yellow: '#F59E0B',
  white: '#FFFFFF',
  background: '#FDFBF7',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  status: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  },
} as const

// Storage Keys
export const STORAGE_KEYS = {
  user: 'user',
  admin: 'adminUser',
  cart: 'cart',
  wishlist: 'wishlist',
  chat_preferences: 'chatPreferences',
} as const

// API Configuration
export const API_CONFIG = {
  timeout: 10000,
  retries: 3,
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
} as const

// Chat Configuration
export const CHAT_CONFIG = {
  maxMessageLength: 500,
  typingIndicatorTimeout: 3000,
  autoReplyDelay: 800,
  threadReplyDelay: 500,
} as const

// Product Configuration
export const PRODUCT_CONFIG = {
  defaultImageFallback: '/images/placeholder.jpg',
  categoriesToDisplay: 4,
  productsPerPage: 12,
  maxWishlistItems: 100,
} as const

// Auth Configuration
export const AUTH_CONFIG = {
  adminCredentials: {
    email: 'admin@otesta.it',
    password: 'admin123',
  },
  demoCredentials: {
    email: 'demo@otesta.it',
    password: 'demo123',
  },
} as const

// UI Configuration
export const UI_CONFIG = {
  animationDuration: 300,
  toastDuration: 3000,
  debounceDelay: 300,
} as const

// Categories
export const CATEGORY_NAMES = {
  suits: 'Completi',
  outerwear: 'Capispalla',
  shirts: 'Camicie',
  trousers: 'Pantaloni',
  accessories: 'Accessori',
} as const

// Order Statuses
export const ORDER_STATUSES = {
  pending: 'In Sospeso',
  confirmed: 'Confermato',
  shipped: 'Spedito',
  delivered: 'Consegnato',
  cancelled: 'Annullato',
} as const
