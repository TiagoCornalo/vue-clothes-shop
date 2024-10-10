<template>
  <section
    v-animate
    class="animate"
  >
    <div class="product-details-container">
      <ProductPhotoGallery :image-list="product.images" />
      <ProductDetailsCard
        :name="product.name"
        :price="product.price"
        :description="product.description"
        :sizes="product.sizes"
        :saved="product.saved"
        :colors="product.colors"
        @add-to-cart="addToCart"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductPhotoGallery from './ProductPhotoGallery.vue';
import ProductDetailsCard from './ProductDetailsCard.vue';
import { Product } from '@/types';
import { useShoppingBagStore } from '@/store'

const props = defineProps<{
  product: Product
}>();

const shoppingBagStore = useShoppingBagStore()

const addToCart = (size: string, color: string) => {
  shoppingBagStore.addItem({
    ...props.product,
    size,
    color,
    quantity: 1
  })
}
</script>

<style scoped lang="scss">
.product-details-container {
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  gap: 2rem;
}
</style>