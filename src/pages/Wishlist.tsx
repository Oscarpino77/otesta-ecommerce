import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ArrowRight } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { useProducts } from '@/hooks/useProducts'

export default function Wishlist() {
  const { products } = useProducts()
  const [wishlistItems] = useState<string[]>([products[0]?.id, products[2]?.id].filter(Boolean))

  const wishlistProducts = products.filter((p) => wishlistItems.includes(p.id))

  return (
    <div className="container section-padding">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="font-serif text-5xl mb-4">I Miei Desideri</h1>
        <p className="text-text-secondary">
          {wishlistProducts.length} prodotto{wishlistProducts.length !== 1 ? 'i' : ''} nella tua lista dei desideri
        </p>
      </motion.div>

      {wishlistProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-background-alt rounded-lg"
        >
          <Heart className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
          <h2 className="font-serif text-2xl mb-2">Lista Vuota</h2>
          <p className="text-text-secondary mb-8">Aggiungi prodotti alle tue preferenze</p>
          <Link
            to="/Shop"
            className="inline-flex items-center gap-2 bg-accent text-primary px-8 py-3 rounded font-serif hover:opacity-90 transition"
          >
            Esplora i Prodotti
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={true}
              onWishlistToggle={(id) => console.log('Toggle wishlist:', id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
