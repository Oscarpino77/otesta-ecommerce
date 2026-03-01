import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '@/hooks/useAdminAuth'

export default function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminAuth()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}
