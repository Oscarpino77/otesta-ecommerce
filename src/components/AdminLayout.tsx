import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, LogOut, Home } from 'lucide-react'
import { useAdminAuth } from '@/hooks/useAdminAuth'

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { admin, logout } = useAdminAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Admin Header */}
      <header className="fixed w-full top-0 z-40 bg-primary text-white border-b border-gray-700">
        <div className="container h-16 flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div className="font-serif text-2xl font-600 text-accent">
            O.TESTA ADMIN
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/admin/dashboard" className="text-sm hover:text-accent transition">
              Dashboard
            </Link>
            <Link to="/admin/products" className="text-sm hover:text-accent transition">
              Prodotti
            </Link>
            <Link to="/admin/chat" className="text-sm hover:text-accent transition">
              Chat Clienti
            </Link>
            <Link to="/admin/orders" className="text-sm hover:text-accent transition">
              Ordini
            </Link>
          </nav>

          {/* Admin Info + Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-600">{admin?.full_name}</p>
              <p className="text-xs text-gray-300">{admin?.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/" className="hover:text-accent transition" title="Vai al negozio">
                <Home className="w-5 h-5" />
              </Link>
              <button onClick={handleLogout} className="hover:text-accent transition" title="Logout">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700 bg-primary p-4 space-y-4">
            <Link
              to="/admin/dashboard"
              className="block text-sm hover:text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/products"
              className="block text-sm hover:text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Prodotti
            </Link>
            <Link
              to="/admin/chat"
              className="block text-sm hover:text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Chat Clienti
            </Link>
            <Link
              to="/admin/orders"
              className="block text-sm hover:text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ordini
            </Link>
            <button
              onClick={() => {
                handleLogout()
                setMobileMenuOpen(false)
              }}
              className="block w-full text-left text-sm hover:text-accent"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white">
        <div className="container py-8 text-center text-sm text-text-muted">
          <p>O.TESTA Admin Dashboard © 2026</p>
        </div>
      </footer>
    </div>
  )
}
