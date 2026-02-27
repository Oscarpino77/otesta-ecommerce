import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Heart, ShoppingBag, User, Lock } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import ChatWidget from '@/components/ChatWidget'

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/Account')
    login('demo@otesta.it', 'demo123')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="fixed w-full top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container h-16 flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-600 text-accent">
            O.TESTA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/Shop" className="text-sm hover:text-accent transition">
              Negozio
            </Link>
            <Link to="/" className="text-sm hover:text-accent transition">
              Home
            </Link>
            <Link to="/AdminDashboard" className="text-sm text-accent font-600 hover:opacity-80 transition">
              Admin
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link to="/Wishlist" className="hover:text-accent transition" title="Preferiti">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/Cart" className="hover:text-accent transition relative" title="Carrello">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-accent text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            {user ? (
              <Link to="/Account" className="hover:text-accent transition" title="Account">
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <button onClick={handleLogin} className="hover:text-accent transition" title="Accedi">
                <Lock className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white p-4 space-y-4">
            <Link to="/Shop" className="block text-sm hover:text-accent">
              Negozio
            </Link>
            <Link to="/Cart" className="block text-sm hover:text-accent">
              Carrello
            </Link>
            <Link to="/Wishlist" className="block text-sm hover:text-accent">
              I Miei Desideri
            </Link>
            <Link to="/Account" className="block text-sm hover:text-accent">
              Account
            </Link>
            <Link to="/AdminDashboard" className="block text-sm text-accent font-600 hover:opacity-80">
              Admin Dashboard
            </Link>
            {!user && (
              <button onClick={handleLogin} className="block w-full text-left text-sm hover:text-accent">
                Accedi
              </button>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white mt-20">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-serif text-xl mb-4">O.TESTA</h3>
              <p className="text-sm text-gray-300">
                Eleganza sartoriale italiana dal 1995. Abiti di qualità superiore for l'uomo moderno.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4">Contatti</h4>
              <p className="text-sm text-gray-300 mb-2">Via Roma 123</p>
              <p className="text-sm text-gray-300 mb-2">Milan, Italia</p>
              <p className="text-sm text-gray-300">+39 02 1234 5678</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Navigazione</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/Shop" className="hover:text-accent transition">Negozio</Link></li>
                <li><Link to="/Cart" className="hover:text-accent transition">Carrello</Link></li>
                <li><Link to="/Wishlist" className="hover:text-accent transition">Preferiti</Link></li>
                <li><Link to="/AdminDashboard" className="hover:text-accent transition">Admin</Link></li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-bold mb-4">Orari</h4>
              <p className="text-sm text-gray-300 mb-2">Lun-Ven: 10:00 - 19:00</p>
              <p className="text-sm text-gray-300 mb-2">Sab: 10:00 - 18:00</p>
              <p className="text-sm text-gray-300">Dom: 12:00 - 18:00</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 O.TESTA. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}
