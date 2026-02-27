import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BarChart3, Package, MessageSquare, Boxes } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import AnalyticsTab from '@/components/admin/AnalyticsTab'
import ProductsTab from '@/components/admin/ProductsTab'
import ChatTab from '@/components/admin/ChatTab'
import InventoryTab from '@/components/admin/InventoryTab'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('analytics')

  // Only allow demo admin user
  if (!user || user.email !== 'demo@otesta.it') {
    return <Navigate to="/" replace />
  }

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'products', label: 'Prodotti', icon: Package },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'inventory', label: 'Inventario', icon: Boxes },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white border-b border-gray-700">
        <div className="container h-16 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl">Dashboard Amministratore</h1>
            <p className="text-sm text-gray-300">O.TESTA</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm hover:text-accent transition">
              Vai al Sito
            </Link>
            <Link to="/Account" className="text-sm hover:text-accent transition">
              Account
            </Link>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container py-8">
        <div className="flex gap-4 mb-8 border-b border-border">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3 px-4 border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-text-secondary hover:text-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div>
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'chat' && <ChatTab />}
          {activeTab === 'inventory' && <InventoryTab />}
        </div>
      </div>
    </div>
  )
}
