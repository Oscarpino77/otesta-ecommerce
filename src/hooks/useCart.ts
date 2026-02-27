import { useState, useEffect, useCallback } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size?: string
  image: string
}

const CART_STORAGE_KEY = 'cart'

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Carica il carrello dal localStorage al mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const existingCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]')
        setCart(existingCart)
      } catch (error) {
        console.error('Error loading cart:', error)
        setCart([])
      }
      setIsLoading(false)
    }

    loadCart()

    // Ascolta i cambiamenti da altri tab/finestre
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY) {
        try {
          const newCart = JSON.parse(e.newValue || '[]')
          setCart(newCart)
        } catch (error) {
          console.error('Error updating cart from storage event:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Funzione per salvare il carrello e notificare i listener
  const saveCart = useCallback((newCart: CartItem[]) => {
    setCart(newCart)
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart))
    // Notifica agli altri componenti tramite custom event
    window.dispatchEvent(
      new CustomEvent('cartUpdated', { detail: { cart: newCart } })
    )
  }, [])

  // Aggiungi al carrello
  const addToCart = useCallback(
    (item: CartItem) => {
      const existingCart = [...cart]
      const existingItem = existingCart.find(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      )

      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        existingCart.push(item)
      }

      saveCart(existingCart)
      return true
    },
    [cart, saveCart]
  )

  // Rimuovi dal carrello
  const removeFromCart = useCallback(
    (itemId: string, size?: string) => {
      const newCart = cart.filter(
        (item) => !(item.id === itemId && item.size === size)
      )
      saveCart(newCart)
    },
    [cart, saveCart]
  )

  // Aggiorna quantità
  const updateQuantity = useCallback(
    (itemId: string, quantity: number, size?: string) => {
      if (quantity <= 0) {
        removeFromCart(itemId, size)
        return
      }

      const newCart = cart.map((item) =>
        item.id === itemId && item.size === size
          ? { ...item, quantity }
          : item
      )
      saveCart(newCart)
    },
    [cart, saveCart, removeFromCart]
  )

  // Svuota il carrello
  const clearCart = useCallback(() => {
    saveCart([])
  }, [saveCart])

  // Numero totale di articoli
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Prezzo totale
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return {
    cart,
    cartCount: totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isLoading,
  }
}
