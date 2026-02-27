import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import CategoryMenu from '@/components/CategoryMenu'
import { mockProducts } from '@/data/products'
import { CATEGORY_LABELS } from '@/lib/utils'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [wishlist, setWishlist] = useState<string[]>([])

  const category = searchParams.get('category')
  const priceMin = Number(searchParams.get('priceMin')) || 0
  const priceMax = Number(searchParams.get('priceMax')) || 5000
  const sizes = searchParams.get('sizes')?.split(',') || []

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      if (category && product.category !== category) return false
      if (product.price < priceMin || product.price > priceMax) return false
      if (sizes.length > 0 && !sizes.some((s) => product.sizes?.includes(s))) return false
      return true
    })
  }, [category, priceMin, priceMax, sizes])

  const handleApplyFilters = (filters: {
    category?: string
    priceMin?: number
    priceMax?: number
    sizes?: string[]
  }) => {
    const params = new URLSearchParams()
    if (filters.category) params.set('category', filters.category)
    if (filters.priceMin !== undefined) params.set('priceMin', String(filters.priceMin))
    if (filters.priceMax !== undefined) params.set('priceMax', String(filters.priceMax))
    if (filters.sizes?.length) params.set('sizes', filters.sizes.join(','))
    setSearchParams(params)
  }

  const handleWishlistToggle = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container section-padding">
        <h1 className="font-serif text-5xl mb-2">Il Nostro Negozio</h1>
        <p className="text-text-secondary text-lg mb-8">
          {filteredProducts.length} prodotto{filteredProducts.length !== 1 ? 'i' : ''} trovato
          {category ? ` in ${CATEGORY_LABELS[category]}` : ''}
        </p>
      </div>

      <div className="container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar - LEFT */}
          <aside className="md:col-span-1">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <CategoryMenu onApplyFilters={handleApplyFilters} expanded={true} />
            </motion.div>
          </aside>

          {/* Products Grid - RIGHT */}
          <div className="md:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text-muted text-lg">Nessun prodotto trovato con i filtri selezionati</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onWishlistToggle={handleWishlistToggle}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
