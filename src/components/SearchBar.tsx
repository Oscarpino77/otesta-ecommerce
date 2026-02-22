import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface SearchBarProps {
  isOpen: boolean
  onClose: () => void
  products: Product[]
}

export default function SearchBar({ isOpen, onClose, products }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = searchTerm
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // @ts-ignore
          className="fixed inset-0 bg-white z-50 overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-background border-b border-border p-4">
            <div className="container flex items-center gap-4">
              <Search className="w-5 h-5 text-text-muted" />
              <input
                autoFocus
                type="text"
                placeholder="Cerca prodotti..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-lg border-none outline-none"
              />
              <button
                onClick={onClose}
                className="p-2 hover:bg-background-alt rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Results */}
          {searchTerm && (
            <div className="container py-8">
              {filtered.length === 0 ? (
                <p className="text-center text-text-muted">Nessun prodotto trovato</p>
              ) : (
                <div className="space-y-4">
                  {filtered.slice(0, 8).map((product) => (
                    <Link
                      key={product.id}
                      to={`/ProductDetail?id=${product.id}`}
                      onClick={onClose}
                      className="flex gap-4 p-4 bg-white border border-border rounded hover:shadow-md transition"
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-20 h-28 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-serif font-600 mb-1">{product.name}</h3>
                        <p className="text-sm text-text-secondary mb-2">{product.material}</p>
                        <p className="text-accent font-600">{formatCurrency(product.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
