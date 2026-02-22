import { createContext, useContext, useState, ReactNode } from 'react'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Mock login - in real app, call API
      const mockUser: User = {
        id: '1',
        email,
        full_name: email.split('@')[0],
        role: 'user',
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
