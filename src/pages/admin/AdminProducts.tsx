import { useState, useEffect } from 'react'
import { Trash2, Edit2, Plus, Search, X, AlertCircle } from 'lucide-react'
import { mockProducts } from '@/data/products'
import type { Product } from '@/types'

const ADMIN_PRODUCTS_STORAGE_KEY = 'admin_products'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewProductModal, setShowNewProductModal] = useState(false)
  const [deleteNotif, setDeleteNotif] = useState<string | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'suits',
    description: '',
    stock: '',
  })

  // Carica prodotti da localStorage se esistono
  useEffect(() => {
    const stored = localStorage.getItem(ADMIN_PRODUCTS_STORAGE_KEY)
    if (stored) {
      try {
        setProducts(JSON.parse(stored))
      } catch (e) {
        console.error('Error loading products:', e)
      }
    }
  }, [])

  // Salva prodotti in localStorage
  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts)
    localStorage.setItem(ADMIN_PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts))
  }

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (confirm(`Sei sicuro di voler eliminare "${productName}"?`)) {
      const updated = products.filter(p => p.id !== productId)
      saveProducts(updated)
      setDeleteNotif(`${productName} eliminato con successo`)
      setTimeout(() => setDeleteNotif(null), 3000)
    }
  }

  const handleCreateProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert('Compila tutti i campi obbligatori')
      return
    }
    
    const newId = String(Math.max(...products.map(p => parseInt(p.id)), 0) + 1)
    const productToAdd: Product = {
      id: newId,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category as any,
      description: newProduct.description,
      material: 'Materiale da definire',
      image_url: 'https://images.unsplash.com/photo-1556821552-5f63b1016170?w=400&h=500&fit=crop',
      in_stock: true,
      stock_quantity: parseInt(newProduct.stock),
      sizes: ['S', 'M', 'L', 'XL'],
      stock_by_size: { S: 5, M: 5, L: 5, XL: 5 },
    }
    
    saveProducts([...products, productToAdd])
    setNewProduct({ name: '', price: '', category: 'suits', description: '', stock: '' })
    setShowNewProductModal(false)
    setDeleteNotif(`Prodotto "${newProduct.name}" creato con successo`)
    setTimeout(() => setDeleteNotif(null), 3000)
  }

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
        {/* Notification */}
        {deleteNotif && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-500">{deleteNotif}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-4xl">Gestione Prodotti</h1>
          <button 
            onClick={() => setShowNewProductModal(true)}
            className="bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition flex items-center gap-2"
          >
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
                        <button 
                          onClick={() => alert(`Modifica: ${product.name} (Feature in arrivo)`)}
                          className="p-2 hover:bg-blue-100 rounded transition text-blue-600 hover:text-blue-800"
                          title="Modifica"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                          className="p-2 hover:bg-red-100 rounded transition text-red-600 hover:text-red-800"
                          title="Elimina"
                        >
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

        {/* New Product Modal */}
        {showNewProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="font-serif text-2xl">Nuovo Prodotto</h2>
                <button
                  onClick={() => setShowNewProductModal(false)}
                  className="p-1 hover:bg-gray-100 rounded transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-600 mb-2">Nome Prodotto *</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="es. Completo Blu Navy"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-600 mb-2">Prezzo €  *</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-600 mb-2">Stock *</label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-600 mb-2">Categoria</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="suits">Completi</option>
                    <option value="outerwear">Capispalla</option>
                    <option value="shirts">Camicie</option>
                    <option value="trousers">Pantaloni</option>
                    <option value="accessories">Accessori</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-600 mb-2">Descrizione</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Descrizione del prodotto..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-lg">
                <button
                  onClick={() => setShowNewProductModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-600 hover:bg-gray-100 transition"
                >
                  Annulla
                </button>
                <button
                  onClick={handleCreateProduct}
                  className="flex-1 px-4 py-2 bg-accent text-white rounded-lg text-sm font-600 hover:opacity-90 transition"
                >
                  Crea Prodotto
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
