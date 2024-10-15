import { ShoppingBagItem } from './productType'

export interface ShipmentInfo {
  name: string
  lastName: string
  document: string
  email: string
  phone: string
  street: string
  streetNumber: string
  floor: string
  apartment: string
  zipCode: string
  city: string
  province: string
  type: 'delivery' | 'pickup'
  store?: string
}

export interface PickupInfo {
  name: string
  lastName: string
  document: string
  email: string
  phone: string
  type: string
  store: string
}

export interface Payment {
  id: string
  status: string
  amount: number
  currency: string
  createdAt: Date
  updatedAt: Date
  shipmentInfo: ShipmentInfo
  items: ShoppingBagItem[]
}

export interface BillingData {
  name: string
  lastName: string
  document: string
  phone: string
  street: string
  number: string
  floor: string
  apartment: string
  postalCode: string
  state: string
  city: string
}
