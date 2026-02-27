/**
 * Lib Index - Centralized Exports
 * Import dall'intera lib con pattern unico
 */

// Core utilities
export { cn } from './utils'
export {
  formatCurrency,
  formatDate,
  generateOrderNumber,
  getProductImageUrl,
  CATEGORY_LABELS,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  SIZES,
} from './utils'

// Chat utilities
export {
  getThreadReplyCount,
  formatChatTime,
  formatChatDateTime,
  validateChatMessage,
  createChatMessage,
  addReplyToThread,
  countTotalMessages,
  filterThreadsByUser,
  getLastMessage,
  type ChatThread,
} from './chatUtils'

// Performance utilities
export {
  debounce,
  throttle,
  MemoryCache,
  shallowEqual,
  batchUpdates,
  createSelector,
} from './performance'

// Re-export constants
export * from '../constants/index'
