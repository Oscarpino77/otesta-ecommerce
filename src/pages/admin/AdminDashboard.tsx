import { Users, Package, ShoppingCart, MessageSquare } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const statsData = [
  { name: 'Gen', revenue: 4000, orders: 24 },
  { name: 'Feb', revenue: 3000, orders: 13 },
  { name: 'Mar', revenue: 2000, orders: 9 },
  { name: 'Apr', revenue: 2780, orders: 39 },
  { name: 'Mag', revenue: 1890, orders: 22 },
  { name: 'Giu', revenue: 2390, orders: 22 },
]

const topProducts = [
  { id: 1, name: 'Completo Linea Classica', sales: 145, revenue: '€14,500' },
  { id: 2, name: 'Camicia Seta Premium', sales: 98, revenue: '€8,820' },
  { id: 3, name: 'Cappotto Lana Pura', sales: 87, revenue: '€13,050' },
  { id: 4, name: 'Pantaloni Eleganti', sales: 76, revenue: '€5,700' },
  { id: 5, name: 'Cravatte Seta', sales: 125, revenue: '€4,375' },
]

export default function AdminDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container py-8">
        {/* Header */}
        <h1 className="font-serif text-4xl mb-8">Dashboard</h1>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Clienti Totali</p>
                <p className="font-serif text-3xl mt-2">1,284</p>
              </div>
              <Users className="w-10 h-10 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Ordini Questo Mese</p>
                <p className="font-serif text-3xl mt-2">156</p>
              </div>
              <ShoppingCart className="w-10 h-10 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Ricavo Totale</p>
                <p className="font-serif text-3xl mt-2">€58,940</p>
              </div>
              <Package className="w-10 h-10 text-purple-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Chat Attive</p>
                <p className="font-serif text-3xl mt-2">23</p>
              </div>
              <MessageSquare className="w-10 h-10 text-orange-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-serif text-xl mb-4">Ricavo per Mese</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#C9A227" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Orders Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-serif text-xl mb-4">Ordini per Mese</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#2D2D2D" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-serif text-xl mb-4">Prodotti Top Venduti</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-600 text-gray-700">Prodotto</th>
                  <th className="text-right py-3 px-4 text-sm font-600 text-gray-700">Vendite</th>
                  <th className="text-right py-3 px-4 text-sm font-600 text-gray-700">Ricavo</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{product.name}</td>
                    <td className="py-3 px-4 text-sm text-right font-600">{product.sales}</td>
                    <td className="py-3 px-4 text-sm text-right font-600 text-accent">{product.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
