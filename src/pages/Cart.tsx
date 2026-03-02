import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
// @ts-ignore
import { openChatWithOrder } from '@/lib/chatUtils'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    notes: '',
  })

  const handleCheckout = () => {
    if (!formData.email || !formData.name || !formData.address) {
      alert('Compila nome, email e indirizzo')
      return
    }
    // Simula invio ordine e apertura chat con messaggio automatico
    openChatWithOrder({
      name: formData.name,
      email: formData.email,
      address: formData.address,
      notes: formData.notes,
      cart,
      total: totalPrice,
    })
    clearCart()
    setFormData({ name: '', email: '', address: '', notes: '' })
  }
            <div>
              <label className="block text-sm font-600 mb-2">Indirizzo di spedizione</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2 border border-border rounded bg-white"
                required
              />
            </div>

  if (cart.length === 0) {
    return (
      <div className="container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <ShoppingBag className="w-16 h-16 text-text-muted mx-auto mb-4 opacity-50" />
          <h1 className="font-serif text-4xl mb-4">Carrello Vuoto</h1>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Non hai ancora aggiunti prodotti. Scopri la nostra collezione!
          </p>
          <Link
            to="/Shop"
            className="inline-block bg-accent text-primary px-8 py-3 rounded font-serif hover:opacity-90 transition"
          >
            Continua lo Shopping
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container section-padding">
      <h1 className="font-serif text-5xl mb-12">Il Tuo Carrello</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cart.map((item) => (
            // @ts-ignore
            <motion.div
              key={`${item.id}-${item.size}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-6 pb-6 border-b border-border mb-6"
            >
              <img src={item.image} alt={item.name} className="w-24 h-32 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-serif font-600 mb-1">{item.name}</h3>
                {item.size && <p className="text-sm text-text-muted mb-2">Taglia: {item.size}</p>}
                <p className="text-accent font-600">{formatCurrency(item.price)}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                    className="px-2 py-1 border border-border rounded hover:bg-background-alt"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-600">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                    className="px-2 py-1 border border-border rounded hover:bg-background-alt"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="ml-auto p-2 hover:bg-red-50 rounded transition text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Checkout Form */}
        {/* @ts-ignore */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-background-alt p-8 rounded-lg h-fit"
        >
          <h2 className="font-serif text-2xl mb-6">Riepilogo Ordine</h2>

          <form className="space-y-4">

            <div>
              <label className="block text-sm font-600 mb-2">Nome Completo</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border border-border rounded bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-600 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border border-border rounded bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-600 mb-2">Indirizzo di spedizione</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2 border border-border rounded bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-600 mb-2">Note Ordine (opzionale)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full p-2 border border-border rounded bg-white"
              />
            </div>

            <div className="border-t border-border pt-4 mt-6">
              <div className="flex justify-between mb-4">
                <span className="font-600">Totale:</span>
                <span className="text-2xl font-serif text-accent">{formatCurrency(totalPrice)}</span>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full bg-primary text-white py-3 rounded font-serif hover:opacity-90 transition mb-2"
              >
                Procedi al pagamento
              </button>
              <div className="text-xs text-gray-500 text-center mb-2">Oppure chiedi informazioni in chat</div>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('openChat'))}
                className="w-full bg-accent text-primary py-2 rounded font-serif hover:opacity-90 transition"
              >
                Fai una domanda in chat
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
