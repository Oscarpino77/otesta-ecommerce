import { Link } from 'react-router-dom'
import { Heart, Eye } from 'lucide-react'
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
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link to={`/ProductDetail?id=${product.id}`} className="block h-full">
        {/* Image Container */}
        <div className="relative aspect-3-4 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
          <motion.img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
            whileHover={{ scale: 1.25 }}
          />

          {/* Out of Stock Overlay */}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
              <span className="text-white font-serif text-2xl font-bold">ESAURITO</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col items-end justify-between p-4">
            {/* Heart Button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault()
                onWishlistToggle?.(product.id)
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-200"
            >
              <Heart
                className={`w-6 h-6 transition ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-gray-600'}`}
              />
            </motion.button>

            {/* Quick View Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              className="group-hover:opacity-100 opacity-0 transition-opacity duration-300"
            >
              <button className="flex items-center gap-2 bg-accent text-primary px-4 py-2 rounded-full font-semibold text-sm hover:bg-yellow-500 transition-colors duration-200">
                <Eye className="w-4 h-4" />
                Visualizza
              </button>
            </motion.div>
          </div>

          {/* Badge Nuovo */}
          {parseInt(product.id) <= 3 && (
            <div className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold uppercase z-10 shadow-lg">
              Nuovo
            </div>
          )}
        </div>

        {/* Content */}
        <motion.div 
          className="p-4 group-hover:bg-gray-50 transition-colors duration-200 rounded-b-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="mb-3">
            <span className="text-xs uppercase tracking-widest font-bold text-accent">
              {CATEGORY_LABELS[product.category]}
            </span>
          </div>
          
          <h3 className="font-serif text-lg mb-2 text-primary line-clamp-2 group-hover:text-accent transition-colors duration-200">
            {product.name}
          </h3>
          
          <p className="text-sm text-text-secondary mb-4 line-clamp-1">{product.material}</p>
          
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold bg-gradient-to-r from-accent to-yellow-600 bg-clip-text text-transparent">
              {formatCurrency(product.price)}
            </p>
            {product.in_stock && (
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Disponibile
              </span>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
