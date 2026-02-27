import { createContext, useContext, useState, useEffect } from 'react'

interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'super_admin'
}

interface AdminAuthContextType {
  admin: AdminUser | null
  loginAdmin: (email: string, password: string) => Promise<boolean>
  logoutAdmin: () => void
  isAuthenticatedAdmin: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)

  useEffect(() => {
    // Check if admin is already logged in from localStorage
    const storedAdmin = localStorage.getItem('adminUser')
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin))
      } catch {
        localStorage.removeItem('adminUser')
      }
    }
  }, [])

  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    // Demo credentials for admin
    if (email === 'admin@otesta.it' && password === 'admin123') {
      const adminUser: AdminUser = {
        id: 'admin-001',
        email,
        name: 'O.TESTA Admin',
        role: 'super_admin',
      }
      setAdmin(adminUser)
      localStorage.setItem('adminUser', JSON.stringify(adminUser))
      return true
    }
    return false
  }

  const logoutAdmin = () => {
    setAdmin(null)
    localStorage.removeItem('adminUser')
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loginAdmin,
        logoutAdmin,
        isAuthenticatedAdmin: !!admin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}
