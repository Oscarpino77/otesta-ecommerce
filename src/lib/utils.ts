import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency,
  }).format(value)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function generateOrderNumber(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `ORD-${timestamp}-${random}`
}

export function getProductImageUrl(imageUrl: string): string {
  // If it's already a full URL, return it
  if (imageUrl.startsWith('http')) {
    return imageUrl
  }
  // Otherwise, assume it's a path in public
  return `/images${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`
}

export const CATEGORY_LABELS: Record<string, string> = {
  suits: 'Completi',
  outerwear: 'Capispalla',
  accessories: 'Accessori',
  shirts: 'Camicie',
  trousers: 'Pantaloni',
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'In Sospeso',
  confirmed: 'Confermato',
  shipped: 'Spedito',
  delivered: 'Consegnato',
  cancelled: 'Annullato',
}

export const ORDER_STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  confirmed: { bg: 'bg-blue-100', text: 'text-blue-800' },
  shipped: { bg: 'bg-purple-100', text: 'text-purple-800' },
  delivered: { bg: 'bg-green-100', text: 'text-green-800' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800' },
}

export const SIZES = ['S', 'M', 'L', 'XL', 'XXL']
