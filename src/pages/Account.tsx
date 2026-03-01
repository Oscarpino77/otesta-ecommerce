import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, ShoppingBag } from 'lucide-react'
import { formatCurrency, formatDate, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import type { Order } from '@/types'

const mockOrders: Order[] = [
  {
    id: '1',
    order_number: 'ORD-001',
    customer_email: 'user@example.com',
    customer_name: 'Marco Rossi',
    items: [
      {
        product_id: '1',
        product_name: 'Completo Sartoriale Blu Navy',
        product_image: 'https://images.unsplash.com/photo-1591047990201-37e919f11e64?w=400&h=500&fit=crop',
        price: 1850,
        quantity: 1,
        size: 'L',
      },
    ],
    total: 1850,
    status: 'delivered',
    shipping_address: 'Via Roma 123, Milano',
    created_at: new Date('2026-02-15').toISOString(),
  },
]

export default function Account() {
  const [fullName, setFullName] = useState('Marco Rossi')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="container section-padding">
      <h1 className="font-serif text-5xl mb-12">Il Mio Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-background-alt p-8 rounded-lg h-fit"
        >
          <h2 className="font-serif text-2xl mb-6">Profilo</h2>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-600 mb-2">Nome Completo</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2 border border-border rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-600 mb-2">Email</label>
              <input
                type="email"
                value="user@example.com"
                disabled
                className="w-full p-2 border border-border rounded bg-white opacity-60 cursor-not-allowed"
              />
            </div>

            <button className="w-full bg-primary text-white py-2 rounded hover:opacity-90 transition">
              Salva Modifiche
            </button>
          </div>

          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary py-2 rounded hover:bg-primary hover:text-white transition">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </motion.div>

        {/* Orders */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <h2 className="font-serif text-2xl mb-6">I Miei Ordini</h2>

          {mockOrders.length === 0 ? (
            <div className="text-center py-12 bg-background-alt rounded-lg">
              <ShoppingBag className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
              <p className="text-text-secondary">Non hai ancora effettuato ordini</p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                // @ts-ignore
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-background-alt p-6 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-serif font-600 text-lg">{order.order_number}</h3>
                      <p className="text-sm text-text-muted">{formatDate(order.created_at || new Date())}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-serif text-accent">{formatCurrency(order.total)}</p>
                      <span
                        className={`inline-block text-xs py-1 px-3 rounded-full ${
                          ORDER_STATUS_COLORS[order.status].bg
                        } ${ORDER_STATUS_COLORS[order.status].text}`}
                      >
                        {ORDER_STATUS_LABELS[order.status]}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setExpandedOrder(expandedOrder === order.id ? null : order.id)
                    }
                    className="text-accent text-sm hover:opacity-80 transition"
                  >
                    {expandedOrder === order.id ? 'Nascondi dettagli' : 'Visualizza dettagli'}
                  </button>

                  {expandedOrder === order.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border space-y-3"
                    >
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            className="w-16 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-600">{item.product_name}</p>
                            {item.size && <p className="text-sm text-text-muted">Taglia: {item.size}</p>}
                            <p className="text-sm">
                              {item.quantity}x {formatCurrency(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
