import { motion } from 'framer-motion'
import { TrendingUp, ShoppingBag, CheckCircle, DollarSign, MessageCircle } from 'lucide-react'
import { mockProducts } from '@/data/products'
import { formatCurrency } from '@/lib/utils'

interface StatCard {
  label: string
  value: string
  icon: any
  trend?: string
}

export default function AnalyticsTab() {
  // Calculate stats
  const totalProducts = mockProducts.length
  const totalRevenue = mockProducts.reduce((sum: number, p: any) => sum + p.price, 0) * 0.5 // Mock 50% sold
  const totalOrders = Math.floor(totalProducts * 0.4)
  const completedOrders = Math.floor(totalOrders * 0.7)
  const avgOrderValue = totalRevenue / (totalOrders || 1)
  const conversationCount = 12

  const stats: StatCard[] = [
    {
      label: 'Fatturato Totale',
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      trend: '+15%',
    },
    {
      label: 'Ordini Totali',
      value: String(totalOrders),
      icon: ShoppingBag,
      trend: '+12%',
    },
    {
      label: 'Ordini Completati',
      value: String(completedOrders),
      icon: CheckCircle,
      trend: '+8%',
    },
    {
      label: 'Valore Medio Ordine',
      value: formatCurrency(avgOrderValue),
      icon: TrendingUp,
    },
    {
      label: 'Conversazioni',
      value: String(conversationCount),
      icon: MessageCircle,
      trend: '+5',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              // @ts-ignore
              className="bg-white border border-border p-6 rounded-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-accent" />
                {stat.trend && <span className="text-xs font-600 text-green-600">{stat.trend}</span>}
              </div>
              <p className="text-text-muted text-sm mb-1">{stat.label}</p>
              <p className="font-serif text-2xl font-600">{stat.value}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          // @ts-ignore
          className="bg-white border border-border p-6 rounded-lg"
        >
          <h3 className="font-serif text-xl mb-6">Fatturato Ultimi 6 Mesi</h3>
          <div className="h-64 bg-background-alt rounded flex items-end gap-2 px-4 py-4">
            {[40, 55, 45, 70, 85, 60].map((value, idx) => (
              // @ts-ignore
              <motion.div
                key={idx}
                initial={{ height: 0 }}
                animate={{ height: `${value}%` }}
                transition={{ delay: idx * 0.1 }}
                // @ts-ignore
                className="flex-1 bg-accent rounded-t"
              />
            ))}
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          // @ts-ignore
          className="bg-white border border-border p-6 rounded-lg"
        >
          <h3 className="font-serif text-xl mb-6">Top 5 Prodotti Venduti</h3>
          <div className="space-y-4">
            {mockProducts.slice(0, 5).map((product: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-background-alt rounded">
                <span className="font-600 text-sm">{idx + 1}. {product.name}</span>
                <span className="text-accent font-600">{Math.random() * 50 | 0} venduti</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      // @ts-ignore
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        // @ts-ignore
        className="bg-white border border-border p-6 rounded-lg"
      >
        <h3 className="font-serif text-xl mb-6">Ordini Recenti</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left pb-3 font-600">Ordine</th>
              <th className="text-left pb-3 font-600">Cliente</th>
              <th className="text-left pb-3 font-600">Totale</th>
              <th className="text-left pb-3 font-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((idx) => (
              <tr key={idx} className="border-b border-border hover:bg-background-alt">
                <td className="py-3">ORD-{String(idx).padStart(3, '0')}</td>
                <td>Cliente {idx}</td>
                <td>{formatCurrency(Math.random() * 2000)}</td>
                <td>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    Confermato
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
