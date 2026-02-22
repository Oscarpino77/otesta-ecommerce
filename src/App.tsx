import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthProvider } from '@/hooks/useAuth'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/Cart'
import Account from '@/pages/Account'
import Wishlist from '@/pages/Wishlist'
import AdminDashboard from '@/pages/AdminDashboard'
import NotFound from '@/pages/NotFound'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/Shop" element={<Shop />} />
              <Route path="/ProductDetail" element={<ProductDetail />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Account" element={<Account />} />
              <Route path="/Wishlist" element={<Wishlist />} />
              <Route path="/AdminDashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
