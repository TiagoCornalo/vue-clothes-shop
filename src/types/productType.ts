export interface Size {
  size: string
  quantity: number
}

export interface Product {
  id: number
  slug: string
  name: string
  description: string
  price: number
  images: string[]
  colors: {
    name: string
    hex: string
    sizes: Size[]
  }[]
  category: string
  gender: string
  brand?: string
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
  image: string
  size: string
  quantity: number
  color: string
  category: string
}

export interface ProductSuggested {
  id: number
  slug: string
  image: string
  name: string
  price: number
  category: string
}
