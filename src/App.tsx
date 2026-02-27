import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthProvider } from '@/hooks/useAuth'
import { AdminAuthProvider } from '@/hooks/useAdminAuth'
import Layout from '@/components/Layout'
import AdminLayout from '@/components/AdminLayout'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/Cart'
import Account from '@/pages/Account'
import Wishlist from '@/pages/Wishlist'
import NotFound from '@/pages/NotFound'
import AdminLogin from '@/pages/admin/AdminLogin'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminChat from '@/pages/admin/AdminChat'
import AdminProducts from '@/pages/admin/AdminProducts'
import AdminOrders from '@/pages/admin/AdminOrders'
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AdminAuthProvider>
          <Router>
            <Routes>
              {/* CLIENT ROUTES */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/Shop" element={<Shop />} />
                <Route path="/ProductDetail" element={<ProductDetail />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/Account" element={<Account />} />
                <Route path="/Wishlist" element={<Wishlist />} />
              </Route>

              {/* ADMIN ROUTES */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }
              >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="chat" element={<AdminChat />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
              </Route>

              {/* REDIRECT /admin to /admin/login if not authenticated */}
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AdminAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
