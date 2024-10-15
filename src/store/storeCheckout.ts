import { defineStore } from 'pinia'
import { ShipmentInfo, PickupInfo, BillingData } from '@/types'

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    shipmentInfo: null as ShipmentInfo | null,
    pickupInfo: null as PickupInfo | null,
    billingDataInfo: null as BillingData | null,
    step: 'shipment' as 'shipment' | 'payment'
  }),
  actions: {
    initializeStore() {
      const savedShipmentInfo = localStorage.getItem('shipmentInfo')
      const savedPickupInfo = localStorage.getItem('pickupInfo')
      if (savedShipmentInfo) {
        this.shipmentInfo = JSON.parse(savedShipmentInfo) as ShipmentInfo
      }
      if (savedPickupInfo) {
        this.pickupInfo = JSON.parse(savedPickupInfo) as PickupInfo
      }
      const savedStep = localStorage.getItem('step')
      const savedBillingData = localStorage.getItem('billingData')
      if (savedStep && savedPickupInfo) {
        this.step = savedStep as 'shipment' | 'payment'
      }
      if (savedBillingData) {
        this.billingDataInfo = JSON.parse(savedBillingData) as BillingData
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('shipmentInfo', JSON.stringify(this.shipmentInfo))
      localStorage.setItem('pickupInfo', JSON.stringify(this.pickupInfo))
      localStorage.setItem('step', this.step)
      localStorage.setItem('billingData', JSON.stringify(this.billingDataInfo))
    },
    setShipmentInfo(shipmentInfo: ShipmentInfo) {
      this.shipmentInfo = shipmentInfo
      this.setStep('payment')
      this.saveToLocalStorage()
    },
    setPickupInfo(pickupInfo: PickupInfo) {
      this.pickupInfo = pickupInfo
      this.setStep('payment')
      this.saveToLocalStorage()
    },
    setBillingData(billingData: BillingData) {
      this.billingDataInfo = billingData
      this.saveToLocalStorage()
    },
    setStep(step: 'shipment' | 'payment') {
      this.step = step
    },
    clearCheckout() {
      this.shipmentInfo = null
      this.pickupInfo = null
      this.saveToLocalStorage()
    }
  }
})
