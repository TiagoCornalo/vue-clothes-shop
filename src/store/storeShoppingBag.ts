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
      this.items.push(item)
      this.saveToLocalStorage()
    },
    removeItem(item: ShoppingBagItem) {
      this.items = this.items.filter((i) => i.id !== item.id)
      this.saveToLocalStorage()
    },
    clearItems() {
      this.items = []
      this.saveToLocalStorage()
    }
  }
})
