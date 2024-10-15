import { useShoppingBagStore, useCheckoutStore } from '@/store'

const initializeStore = () => {
  const shoppingBagStore = useShoppingBagStore()
  shoppingBagStore.initializeStore()
  const checkoutStore = useCheckoutStore()
  checkoutStore.initializeStore()
}

export default initializeStore
