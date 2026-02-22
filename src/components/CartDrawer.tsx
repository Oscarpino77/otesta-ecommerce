import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import type { CartItem } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
}: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.product_price * item.quantity, 0)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // @ts-ignore
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40"
          role="button"
          tabIndex={0}
        />
      )}

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        // @ts-ignore
        className="fixed right-0 top-0 h-full w-96 max-w-full bg-white shadow-xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-serif text-2xl">La tua selezione</h2>
          <button onClick={onClose} className="p-2 hover:bg-background-alt rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-text-muted">Il carrello è vuoto</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="w-24 h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-serif font-600 mb-1">{item.product_name}</h4>
                  {item.size && <p className="text-xs text-text-muted mb-2">Taglia: {item.size}</p>}
                  <p className="text-accent font-600 mb-3">
                    {formatCurrency(item.product_price * item.quantity)}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 border border-border rounded hover:bg-background-alt"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border border-border rounded hover:bg-background-alt"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="ml-auto text-xs text-red-500 hover:text-red-700"
                    >
                      Rimuovi
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex justify-between text-lg font-serif">
              <span>Totale:</span>
              <span className="text-accent">{formatCurrency(total)}</span>
            </div>
            <a href="/Cart" className="block w-full bg-primary text-white py-3 text-center rounded hover:opacity-90 transition">
              Vai al carrello
            </a>
          </div>
        )}
      </motion.div>
    </>
  )
}
