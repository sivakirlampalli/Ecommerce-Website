import React, { createContext, useContext, useEffect, useState } from 'react'
import { Product, CartItem } from '../data/products'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

interface CartContextType {
  items: CartItem[]
  loading: boolean
  addToCart: (product: Product, quantity?: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getTotalPrice: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadCartFromStorage()
    } else {
      setItems([])
    }
  }, [user])

  useEffect(() => {
    if (user && items.length > 0) {
      saveCartToStorage()
    }
  }, [items, user])

  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('toy-store-cart')
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error)
    }
  }

  const saveCartToStorage = () => {
    try {
      localStorage.setItem('toy-store-cart', JSON.stringify(items))
    } catch (error) {
      console.error('Error saving cart to storage:', error)
    }
  }

  const addToCart = async (product: Product, quantity = 1) => {
    if (!user) {
      toast.error('Please sign in to add items to cart')
      return
    }

    try {
      const existingItem = items.find(item => item.product_id === product.id)
      
      if (existingItem) {
        await updateQuantity(existingItem.id, existingItem.quantity + quantity)
      } else {
        const newItem: CartItem = {
          id: Date.now().toString(),
          product_id: product.id,
          quantity,
          created_at: new Date().toISOString(),
          product
        }
        
        setItems(prev => [newItem, ...prev])
        toast.success('Item added to cart!')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Failed to add item to cart')
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      setItems(prev => prev.filter(item => item.id !== itemId))
      toast.success('Item removed from cart')
    } catch (error) {
      console.error('Error removing from cart:', error)
      toast.error('Failed to remove item')
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId)
      return
    }

    try {
      setItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ))
    } catch (error) {
      console.error('Error updating quantity:', error)
      toast.error('Failed to update quantity')
    }
  }

  const clearCart = async () => {
    if (!user) return

    try {
      setItems([])
      localStorage.removeItem('toy-store-cart')
      toast.success('Cart cleared')
    } catch (error) {
      console.error('Error clearing cart:', error)
      toast.error('Failed to clear cart')
    }
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  )
}