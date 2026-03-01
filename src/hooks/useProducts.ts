import { useState, useEffect } from 'react'
import { mockProducts } from '@/data/products'
import type { Product } from '@/types'

const PRODUCTS_STORAGE_KEY = 'otesta_products'

export const useProducts = () => {
  const [products, setProductsState] = useState<Product[]>(mockProducts)
  const [isLoading, setIsLoading] = useState(true)

  // Carica prodotti da localStorage al mount
  useEffect(() => {
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY)
    if (stored) {
      try {
        const storedProducts = JSON.parse(stored)
        setProductsState(storedProducts)
      } catch (e) {
        console.error('Error loading products from storage:', e)
        setProductsState(mockProducts)
      }
    } else {
      // Inizializza localStorage con i mockProducts
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(mockProducts))
      setProductsState(mockProducts)
    }
    setIsLoading(false)
  }, [])

  // Salva prodotti in localStorage
  const setProducts = (updatedProducts: Product[]) => {
    setProductsState(updatedProducts)
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts))
    // Notifica altri componenti
    window.dispatchEvent(new CustomEvent('productsUpdated', { detail: { products: updatedProducts } }))
  }

  // Delete product
  const deleteProduct = (productId: string) => {
    const updated = products.filter(p => p.id !== productId)
    setProducts(updated)
  }

  // Add product
  const addProduct = (product: Product) => {
    setProducts([...products, product])
  }

  // Update product
  const updateProduct = (productId: string, updates: Partial<Product>) => {
    const updated = products.map(p => 
      p.id === productId ? { ...p, ...updates } : p
    )
    setProducts(updated)
  }

  return {
    products,
    isLoading,
    setProducts,
    deleteProduct,
    addProduct,
    updateProduct,
  }
}
