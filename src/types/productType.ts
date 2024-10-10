export interface Product {
  id: number
  slug: string
  name: string
  description: string
  price: number
  images: string[]
  sizes: string[]
  colors: {
    name: string
    hex: string
  }[]
  category: string
  gender: string
  brand?: string
  stock: number
  tags?: string[]
  isNewArrival?: boolean
  isOnSale?: boolean
  salePrice?: number
  saved: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface ShoppingBagItem {
  id: number
  slug: string
  name: string
  price: number
  description: string
  images: string[]
  size: string
  quantity: number
  color: string
  category: string
}
