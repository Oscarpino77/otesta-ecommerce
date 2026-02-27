import { useState } from 'react'
import { Search, Eye, MessageSquare } from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  items: number
}

const mockOrders: Order[] = [
  {
    id: 'ord-1',
    orderNumber: '#ORD-2026-001',
    customerName: 'Marco Rossi',
    customerEmail: 'marco.rossi@example.com',
    total: 450.0,
    status: 'shipped',
    date: '25/02/2026',
    items: 2,
  },
  {
    id: 'ord-2',
    orderNumber: '#ORD-2026-002',
    customerName: 'Luca Bianchi',
    customerEmail: 'luca.bianchi@example.com',
    total: 1280.5,
    status: 'delivered',
    date: '24/02/2026',
    items: 3,
  },
  {
    id: 'ord-3',
    orderNumber: '#ORD-2026-003',
    customerName: 'Francesco Verdi',
    customerEmail: 'francesco.verdi@example.com',
    total: 890.0,
    status: 'processing',
    date: '26/02/2026',
    items: 1,
  },
  {
    id: 'ord-4',
    orderNumber: '#ORD-2026-004',
    customerName: 'Giovanni Gialli',
    customerEmail: 'giovanni.gialli@example.com',
    total: 650.0,
    status: 'pending',
    date: '27/02/2026',
    items: 2,
  },
]

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'In Attesa' },
  processing: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'In Elaborazione' },
  shipped: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Spedito' },
  delivered: { bg: 'bg-green-100', text: 'text-green-800', label: 'Consegnato' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Annullato' },
}

export default function AdminOrders() {
  const [orders] = useState(mockOrders)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container py-8">
        {/* Header */}
        <h1 className="font-serif text-4xl mb-8">Ordini</h1>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca ordine, cliente, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-gray-600 text-sm">Ordini Totali</p>
            <p className="font-serif text-2xl font-bold mt-1">{orders.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-gray-600 text-sm">In Attesa</p>
            <p className="font-serif text-2xl font-bold mt-1">{orders.filter((o) => o.status === 'pending').length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-gray-600 text-sm">Spediti</p>
            <p className="font-serif text-2xl font-bold mt-1">{orders.filter((o) => o.status === 'shipped').length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-gray-600 text-sm">Ricavo Totale</p>
            <p className="font-serif text-2xl font-bold mt-1">
              €{orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-600 text-gray-700">Ordine</th>
                  <th className="text-left py-4 px-6 text-sm font-600 text-gray-700">Cliente</th>
                  <th className="text-center py-4 px-6 text-sm font-600 text-gray-700">Articoli</th>
                  <th className="text-right py-4 px-6 text-sm font-600 text-gray-700">Totale</th>
                  <th className="text-center py-4 px-6 text-sm font-600 text-gray-700">Stato</th>
                  <th className="text-left py-4 px-6 text-sm font-600 text-gray-700">Data</th>
                  <th className="text-center py-4 px-6 text-sm font-600 text-gray-700">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const statusInfo = statusColors[order.status]
                  return (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <p className="font-600 text-sm">{order.orderNumber}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-600 text-sm">{order.customerName}</p>
                        <p className="text-xs text-gray-500">{order.customerEmail}</p>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm font-600">
                          {order.items}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-600">€{order.total.toFixed(2)}</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-600 ${statusInfo.bg} ${statusInfo.text}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{order.date}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-3">
                          <button className="p-2 hover:bg-blue-100 rounded transition text-blue-600" title="Dettagli">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-green-100 rounded transition text-green-600" title="Chat">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Nessun ordine trovato</p>
          </div>
        )}
      </div>
    </div>
  )
}
