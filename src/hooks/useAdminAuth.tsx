import { createContext, useContext, useState, useEffect } from 'react'
import type { AdminUser } from '@/types'
import { STORAGE_KEYS, AUTH_CONFIG } from '@/constants'

interface AdminAuthContextType {
  admin: AdminUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Carica admin da localStorage al mount
    const storedAdmin = localStorage.getItem(STORAGE_KEYS.admin)
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin))
      } catch (error) {
        console.error('Error loading admin from storage:', error)
        localStorage.removeItem(STORAGE_KEYS.admin)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Verifica credenziali admin
      const { email: adminEmail, password: adminPassword } = AUTH_CONFIG.adminCredentials
      
      if (email === adminEmail && password === adminPassword) {
        const adminUser: AdminUser = {
          id: 'admin-001',
          email,
          full_name: 'O.TESTA Admin',
          role: 'super_admin',
        }
        setAdmin(adminUser)
        localStorage.setItem(STORAGE_KEYS.admin, JSON.stringify(adminUser))
        return true
      }
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setAdmin(null)
    localStorage.removeItem(STORAGE_KEYS.admin)
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        isLoading,
        login,
        logout,
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
