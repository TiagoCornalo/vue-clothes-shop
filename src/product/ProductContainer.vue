<template>
  <main class="page-container">
    <Toaster />
      <ProductDetailsContainer
        v-if="!isMobile"
        :product-id="productId"
      />
      <ProductSuggested v-if="!isMobile" />
      <ProductMobileGallery
        v-else
        :product-id="productId"
      />
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import {
  ProductDetailsContainer,
  ProductMobileGallery,
  ProductSuggested
} from './components'
import { useMobileDetection } from '@/composables'
import { Toaster } from '@/ui'
const { isMobile } = useMobileDetection()
const route = useRoute()

const { productId } = route.params as { productId: string }

</script>

<style scoped lang="scss">
.page-container {
  height: 100vh;

  >section {
    justify-content: flex-start;
  }
}
</style>