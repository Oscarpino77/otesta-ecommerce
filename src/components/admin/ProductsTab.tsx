import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { mockProducts } from '@/data/products'
import { formatCurrency, CATEGORY_LABELS } from '@/lib/utils'

export default function ProductsTab() {
  const [products] = useState(mockProducts)

  const inStockCount = products.filter((p: any) => p.in_stock).length
  const outOfStockCount = products.filter((p: any) => !p.in_stock).length
  const inventoryValue = products.reduce(
    (sum: number, p: any) => sum + p.price * p.stock_quantity,
    0
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
          <p className="font-serif text-3xl font-600">{products.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          // @ts-ignore
          className="bg-white border border-border p-4 rounded-lg"
        >
          <p className="text-text-muted text-sm mb-1">In Stock</p>
          <p className="font-serif text-3xl font-600 text-green-600">{inStockCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          // @ts-ignore
          className="bg-white border border-border p-4 rounded-lg"
        >
          <p className="text-text-muted text-sm mb-1">Out of Stock</p>
          <p className="font-serif text-3xl font-600 text-red-600">{outOfStockCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          // @ts-ignore
          className="bg-white border border-border p-4 rounded-lg"
        >
          <p className="text-text-muted text-sm mb-1">Valore Inventario</p>
          <p className="font-serif text-2xl font-600">{formatCurrency(inventoryValue)}</p>
        </motion.div>
      </div>

      {/* Add Product Button */}
      <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded hover:opacity-90 transition">
        <Plus className="w-5 h-5" />
        Aggiungi Prodotto
      </button>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        // @ts-ignore
        className="bg-white border border-border rounded-lg overflow-hidden"
      >
        <table className="w-full text-sm">
          <thead className="bg-background-alt border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left font-600">Prodotto</th>
              <th className="px-6 py-4 text-left font-600">Categoria</th>
              <th className="px-6 py-4 text-left font-600">Prezzo</th>
              <th className="px-6 py-4 text-left font-600">Stock</th>
              <th className="px-6 py-4 text-left font-600">Status</th>
              <th className="px-6 py-4 text-left font-600">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any, idx: number) => (
              <tr key={idx} className="border-b border-border hover:bg-background-alt">
                <td className="px-6 py-4">
                  <div className="flex gap-3 items-center">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-10 h-12 object-cover rounded"
                    />
                    <span className="font-600">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{CATEGORY_LABELS[product.category]}</td>
                <td className="px-6 py-4 font-600">{formatCurrency(product.price)}</td>
                <td className="px-6 py-4">{product.stock_quantity}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded text-xs font-600 ${
                      product.in_stock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.in_stock ? 'Disponibile' : 'Esaurito'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-background-alt rounded">
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-background-alt rounded">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
