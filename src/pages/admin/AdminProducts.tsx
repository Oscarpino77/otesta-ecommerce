import { useState } from 'react'
import { Trash2, Edit2, Plus, Search } from 'lucide-react'
import { mockProducts } from '@/data/products'

export default function AdminProducts() {
  const [products] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categoryColors: Record<string, string> = {
    suits: 'bg-blue-100 text-blue-800',
    outerwear: 'bg-purple-100 text-purple-800',
    shirts: 'bg-green-100 text-green-800',
    trousers: 'bg-orange-100 text-orange-800',
    accessories: 'bg-pink-100 text-pink-800',
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-4xl">Gestione Prodotti</h1>
          <button className="bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nuovo Prodotto
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca prodotto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-600 text-gray-700">Immagine</th>
                  <th className="text-left py-4 px-6 text-sm font-600 text-gray-700">Prodotto</th>
                  <th className="text-left py-4 px-6 text-sm font-600 text-gray-700">Categoria</th>
                  <th className="text-right py-4 px-6 text-sm font-600 text-gray-700">Prezzo</th>
                  <th className="text-center py-4 px-6 text-sm font-600 text-gray-700">Stock</th>
                  <th className="text-center py-4 px-6 text-sm font-600 text-gray-700">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-600 text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500 truncate">{product.description}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-600 ${
                          categoryColors[product.category] || 'bg-gray-100'
                        }`}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-600">€{product.price.toFixed(2)}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-2 py-1 text-xs font-600 rounded ${
                        product.stock_quantity > 10
                          ? 'bg-green-100 text-green-800'
                          : product.stock_quantity > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock_quantity}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-3">
                        <button className="p-2 hover:bg-blue-100 rounded transition text-blue-600">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded transition text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Nessun prodotto trovato</p>
          </div>
        )}
      </div>
    </div>
  )
}
