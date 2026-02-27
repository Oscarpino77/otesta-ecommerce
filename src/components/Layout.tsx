import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Heart, ShoppingBag, User, Lock } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import ChatWidget from '@/components/ChatWidget'
import { motion } from 'framer-motion'

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
      <header className="fixed w-full top-0 z-40 bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="container h-16 flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden hover:bg-gray-100 p-2 rounded-lg transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
            <Link to="/" className="font-serif text-2xl font-700 bg-gradient-to-r from-primary via-accent to-yellow-600 bg-clip-text text-transparent hover:opacity-80 transition">
              O.TESTA
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {['/', '/Shop'].map((path, idx) => (
              <motion.div key={path} whileHover={{ y: -2 }}>
                <Link 
                  to={path} 
                  className="text-sm font-medium text-primary hover:text-accent transition relative group"
                >
                  {path === '/' ? 'Home' : 'Negozio'}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-yellow-600 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/Wishlist" className="hover:text-accent transition relative group p-2 rounded-lg hover:bg-gray-100" title="Preferiti">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">0</span>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/Cart" className="hover:text-accent transition relative group p-2 rounded-lg hover:bg-gray-100" title="Carrello">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">0</span>
              </Link>
            </motion.div>
            
            {user ? (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link to="/Account" className="hover:text-accent transition p-2 rounded-lg hover:bg-gray-100" title="Account">
                  <User className="w-5 h-5" />
                </Link>
              </motion.div>
            ) : (
              <motion.button 
                onClick={handleLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hover:text-accent transition p-2 rounded-lg hover:bg-gray-100"
                title="Accedi"
              >
                <Lock className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm p-4 space-y-4"
          >
            {['/', '/Shop', '/Cart', '/Wishlist', '/Account'].map((path, idx) => (
              <motion.div key={path} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                <Link 
                  to={path} 
                  className="block text-sm font-medium text-primary hover:text-accent hover:bg-gray-50 p-2 rounded transition" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {path === '/' ? 'Home' : path === '/Shop' ? 'Negozio' : path === '/Cart' ? 'Carrello' : path === '/Wishlist' ? 'Preferiti' : 'Account'}
                </Link>
              </motion.div>
            ))}
            {!user && (
              <motion.button 
                onClick={() => { handleLogin(); setMobileMenuOpen(false); }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="w-full text-left text-sm font-medium text-primary hover:text-accent hover:bg-gray-50 p-2 rounded transition"
              >
                Accedi
              </motion.button>
            )}
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-primary to-gray-900 text-white mt-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -right-40 -top-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -left-40 -bottom-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="font-serif text-2xl mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">O.TESTA</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Eleganza sartoriale italiana dal 1995. Abiti di qualità superiore per l'uomo moderno che non scende a compromessi.
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
              <h4 className="font-semibold mb-4 text-accent">Contatti</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>Via Roma 123, Milano</li>
                <li>+39 02 1234 5678</li>
                <li>info@otesta.it</li>
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
              <h4 className="font-semibold mb-4 text-accent">Navigazione</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/Shop" className="hover:text-accent transition hover:translate-x-1 inline-block">→ Negozio</Link></li>
                <li><Link to="/Cart" className="hover:text-accent transition hover:translate-x-1 inline-block">→ Carrello</Link></li>
                <li><Link to="/Wishlist" className="hover:text-accent transition hover:translate-x-1 inline-block">→ Preferiti</Link></li>
                <li><Link to="/admin/login" className="hover:text-accent transition hover:translate-x-1 inline-block">→ Area Admin</Link></li>
              </ul>
            </motion.div>

            {/* Hours */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}>
              <h4 className="font-semibold mb-4 text-accent">Orari Apertura</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li><span className="font-medium">Lun-Ven:</span> 10:00 - 19:00</li>
                <li><span className="font-medium">Sab:</span> 10:00 - 18:00</li>
                <li><span className="font-medium">Dom:</span> 12:00 - 18:00</li>
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700/50" />

          {/* Copyright */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="pt-8 text-center"
          >
            <p className="text-sm text-gray-400">
              &copy; 2026 O.TESTA - Eleganza Senza Tempo. Tutti i diritti riservati.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}
