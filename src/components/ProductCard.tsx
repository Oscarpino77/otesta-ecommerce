import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { CATEGORY_LABELS } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  isWishlisted?: boolean
  onWishlistToggle?: (productId: string) => void
}

export default function ProductCard({
  product,
  isWishlisted = false,
  onWishlistToggle,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link to={`/ProductDetail?id=${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-3-4 overflow-hidden bg-background-alt">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Out of Stock Overlay */}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-serif text-xl">ESAURITO</span>
            </div>
          )}

          {/* Wishlist Heart */}
          <button
            onClick={(e) => {
              e.preventDefault()
              onWishlistToggle?.(product.id)
            }}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition"
          >
            <Heart
              className={`w-5 h-5 transition ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs uppercase tracking-wider text-text-muted">
              {CATEGORY_LABELS[product.category]}
            </span>
          </div>
          <h3 className="font-serif text-lg mb-1 text-primary line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-text-secondary mb-3">{product.material}</p>
          <p className="text-lg font-600 text-accent">
            {formatCurrency(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
