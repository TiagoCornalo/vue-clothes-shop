import { useShoppingBagStore } from '@/store'

const initializeStore = () => {
  const shoppingBagStore = useShoppingBagStore()
  shoppingBagStore.initializeStore()
}

export default initializeStore
