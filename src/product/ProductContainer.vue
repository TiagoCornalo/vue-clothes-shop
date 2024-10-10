<template>
  <main class="page-container">
    <Toaster />
    <template v-if="product">
      <ProductDetailsContainer
        v-if="!isMobile"
        :product="product"
      />
      <ProductSuggested v-if="!isMobile" />
      <ProductMobileGallery
        v-else
        :product="product"
      />
    </template>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import {
  ProductDetailsContainer,
  ProductMobileGallery,
  ProductSuggested
} from './components'
import { useMobileDetection } from '@/composables'
import { Toaster } from '@/ui'
import { Product } from '@/types'
const { isMobile } = useMobileDetection()
const route = useRoute()

const { productId } = route.params as { productId: string }

const fetchProduct = async (id: string) => {
  return {
    id: parseInt(id),
    name: "Camisa Rayada Azul",
    slug: "camisa-rayada-azul",
    price: 49.99,
    description: "Descripción del producto...",
    images: [
      "https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633764/sbzhziwixshygpburaip.jpg",
      "https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/ko1l1vfxfshph1sfur31.jpg",
      "https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/nuwx3wir2monecizznuv.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "camisas",
    gender: "hombre",
    stock: 10,
    tags: ["camisas", "hombre", "azul"],
    isNewArrival: true,
    isOnSale: false,
    salePrice: 39.99,
    colors: [
      {
        name: "Rojo",
        hex: "#FF0000"
      },
      {
        name: "Azul",
        hex: "#0000FF"
      },
      {
        name: "Verde",
        hex: "#00FF00"
      }
    ],
    brand: "Nike",
    saved: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

const product = ref<Product | null>(null)

onMounted(async () => {
  try {
    product.value = await fetchProduct(productId)
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.page-container {
  height: 100vh;

  >section {
    justify-content: flex-start;
  }
}
</style>