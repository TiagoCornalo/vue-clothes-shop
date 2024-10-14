import { defineStore } from 'pinia'
import { ShoppingBagItem } from '@/types/productType'

export const useShoppingBagStore = defineStore('shoppingBag', {
  state: () => ({
    items: [] as ShoppingBagItem[]
  }),
  actions: {
    initializeStore() {
      const savedItems = localStorage.getItem('shoppingBagItems')
      if (savedItems) {
        try {
          this.items = JSON.parse(savedItems) as ShoppingBagItem[]
        } catch (error) {
          console.error('Error al cargar la cesta:', error)
          this.items = []
        }
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('shoppingBagItems', JSON.stringify(this.items))
    },
    addItem(item: ShoppingBagItem) {
      const existingItem = this.items.find(
        (i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
      )
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        this.items.push(item)
      }
      this.saveToLocalStorage()
    },
    removeItem(item: ShoppingBagItem) {
      this.items = this.items.filter(
        (i) =>
          i.id !== item.id || i.color !== item.color || i.size !== item.size
      )
      this.saveToLocalStorage()
    },
    clearItems() {
      this.items = []
      this.saveToLocalStorage()
    },
    getItemQuantity(productId: number, colorName: string, sizeName: string) {
      const item = this.items.find(
        (i) =>
          i.id === productId && i.color === colorName && i.size === sizeName
      )
      return item ? item.quantity : 0
    },
    updateItemQuantity(item: {
      id: number
      color: string
      size: string
      quantity: number
    }) {
      const existingItem = this.items.find(
        (i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
      )
      if (existingItem) {
        if (item.quantity > 0) {
          existingItem.quantity = item.quantity
        } else {
          this.removeItem(existingItem)
        }
        this.saveToLocalStorage()
      }
    }
  }
})
