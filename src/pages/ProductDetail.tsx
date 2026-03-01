import { useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Heart, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import SizeSelector from '@/components/SizeSelector'
import { useCart } from '@/hooks/useCart'
import { useProducts } from '@/hooks/useProducts'
import { formatCurrency, CATEGORY_LABELS } from '@/lib/utils'

export default function ProductDetail() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { products } = useProducts()
  const productId = searchParams.get('id')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const product = products.find((p) => p.id === productId)

  const handleAddToCart = () => {
    if (!product?.in_stock) {
      alert('Prodotto esaurito')
      return
    }
    if (product.sizes.length > 0 && !selectedSize) {
      alert('Seleziona una taglia')
      return
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize || undefined,
      image: product.image_url,
    }

    addToCart(cartItem)
    alert(`✓ ${quantity} ${product.name} aggiunto al carrello!`)
    setQuantity(1)
    setSelectedSize('')
  }

  const handleRequestInfo = () => {
    alert(`Richiesta di informazioni per: ${product?.name}\n\nTi contatteremo a breve!`)
  }

  if (!product) {
    return (
      <div className="container section-padding text-center">
        <h1 className="font-serif text-4xl mb-4">Prodotto non trovato</h1>
        <Link to="/Shop" className="text-accent hover:opacity-80">
          Torna al negozio
        </Link>
      </div>
    )
  }

  return (
    <div className="container section-padding">
      {/* Back Button */}
      <Link to="/Shop" className="inline-flex items-center gap-2 text-accent hover:opacity-80 mb-8">
        <ArrowLeft className="w-4 h-4" />
        Torna al negozio
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-3-4 bg-background-alt rounded-lg overflow-hidden group"
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-serif text-3xl">ESAURITO</span>
            </div>
          )}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-6 right-6 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition"
          >
            <Heart
              className={`w-6 h-6 transition ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
            />
          </button>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <h1 className="font-serif text-5xl mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs uppercase tracking-wider text-text-muted bg-background-alt px-3 py-1 rounded">
              {CATEGORY_LABELS[product.category]}
            </span>
          </div>

          <p className="text-3xl font-600 text-accent mb-2">{formatCurrency(product.price)}</p>
          <p className="text-sm text-text-secondary mb-6">{product.material}</p>

          <p className="text-text-secondary leading-relaxed mb-8">{product.description}</p>

          {/* Stock Info */}
          <div className="mb-6 p-4 bg-background-alt rounded">
            <p className="text-sm">
              {product.in_stock ? (
                <span className="text-green-600 font-600">✓ Disponibile</span>
              ) : (
                <span className="text-red-600 font-600">✗ Esaurito</span>
              )}
            </p>
          </div>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
              stockBySize={product.stock_by_size}
            />
          )}

          {/* Quantity */}
          <div className="mb-8">
            <label className="block text-sm font-600 mb-3">Quantità</label>
            <div className="flex items-center gap-4 w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 border border-border rounded hover:bg-background-alt transition"
              >
                −
              </button>
              <span className="w-8 text-center font-600">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 border border-border rounded hover:bg-background-alt transition"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock || (product.sizes.length > 0 && !selectedSize)}
            className="w-full bg-primary text-white py-4 rounded font-serif text-lg mb-4 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Aggiungi alla Selezione
          </button>

          <button 
            onClick={handleRequestInfo}
            className="w-full border-2 border-primary text-primary py-4 rounded font-serif text-lg hover:bg-primary hover:text-white transition"
          >
            Richiedi Informazioni
          </button>

          {/* Additional Info */}
          <div className="mt-12 pt-8 border-t border-border space-y-4 text-sm text-text-secondary">
            <div>
              <span className="font-600 text-primary">Spedizione:</span> Gratuita per ordini sopra €100
            </div>
            <div>
              <span className="font-600 text-primary">Reso:</span> Entro 30 giorni in perfette condizioni
            </div>
            <div>
              <span className="font-600 text-primary">Garanzia:</span> 2 anni sulla qualità dei materiali
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
