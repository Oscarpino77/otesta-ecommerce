import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileDown } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { formatCurrency, CATEGORY_LABELS } from '@/lib/utils'

export default function InventoryTab() {
  const [, ] = useState<Record<string, any[]>>({})

  const totalProducts = mockProducts.length
  const totalUnits = mockProducts.reduce((sum: number, p: any) => sum + p.stock_quantity, 0)
  const inventoryValue = mockProducts.reduce((sum: number, p: any) => sum + p.price * p.stock_quantity, 0)
  const outOfStockCount = mockProducts.filter((p: any) => !p.in_stock).length

  // Group by category
  const grouped = mockProducts.reduce(
    (acc: any, product: any) => {
      if (!acc[product.category]) acc[product.category] = []
      acc[product.category].push(product)
      return acc
    },
    {} as Record<string, typeof mockProducts>
  )

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          // @ts-ignore
          className="bg-white border border-border p-4 rounded-lg"
        >
          <p className="text-text-muted text-sm mb-1">Totale Prodotti</p>
          <p className="font-serif text-3xl font-600">{totalProducts}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          // @ts-ignore
          className="bg-white border border-border p-4 rounded-lg"
        >
          <p className="text-text-muted text-sm mb-1">Totale Unità</p>
          <p className="font-serif text-3xl font-600">{totalUnits}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          // @ts-ignore
          className="bg-white border border-border p-4 rounded-lg"
        >
          <p className="text-text-muted text-sm mb-1">Valore Inventario</p>
          <p className="font-serif text-2xl font-600">{formatCurrency(inventoryValue)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          // @ts-ignore
          className="bg-white border border-border p-4 rounded-lg"
        >
          <p className="text-text-muted text-sm mb-1">Out of Stock</p>
          <p className="font-serif text-3xl font-600 text-red-600">{outOfStockCount}</p>
        </motion.div>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-4">
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded hover:opacity-90 transition">
          <Download className="w-5 h-5" />
          Stampa
        </button>
        <button className="flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded hover:bg-primary hover:text-white transition">
          <FileDown className="w-5 h-5" />
          Esporta CSV
        </button>
      </div>

      {/* Inventory by Category */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([category, products]: [string, any]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // @ts-ignore
            className="bg-white border border-border rounded-lg overflow-hidden"
          >
            <div className="bg-background-alt p-4 border-b border-border">
              <h3 className="font-serif font-600">{CATEGORY_LABELS[category]}</h3>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left font-600">Prodotto</th>
                  <th className="px-6 py-3 text-left font-600">Materiale</th>
                  <th className="px-6 py-3 text-right font-600">Stock</th>
                  <th className="px-6 py-3 text-right font-600">Prezzo</th>
                  <th className="px-6 py-3 text-right font-600">Valore</th>
                </tr>
              </thead>
              <tbody>
                {(products as any[]).map((product: any, idx: number) => {
                  const value = product.price * product.stock_quantity
                  const isLowStock = product.stock_quantity < 5
                  return (
                    <tr
                      key={idx}
                      className={`border-b border-border ${
                        isLowStock ? 'bg-red-50' : 'hover:bg-background-alt'
                      }`}
                    >
                      <td className="px-6 py-4 font-600">{product.name}</td>
                      <td className="px-6 py-4 text-text-secondary">{product.material}</td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={
                            isLowStock ? 'font-bold text-red-600' : 'font-bold'
                          }
                        >
                          {product.stock_quantity}
                          {isLowStock && ' ⚠️'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">{formatCurrency(product.price)}</td>
                      <td className="px-6 py-4 text-right font-600">{formatCurrency(value)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
