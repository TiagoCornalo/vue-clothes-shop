import { defineStore } from 'pinia'
import {
  getArgentinaStates,
  getArgentinaCities,
  Province,
  City
} from '@/services'

export const useProvincesAndCitiesStore = defineStore('provincesAndCities', {
  state: () => ({
    provinces: [] as Province[],
    cities: [] as City[]
  }),
  actions: {
    async fetchProvinces() {
      this.provinces = await getArgentinaStates()
    },
    async fetchCities(provinceId: number) {
      this.cities = await getArgentinaCities(provinceId)
    }
  }
})
