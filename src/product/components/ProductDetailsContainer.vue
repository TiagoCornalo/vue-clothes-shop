<template>
  <section v-animate class="animate">
      <div class="product-details-container">
      <ProductPhotoGallery :image-list="product.images" />
      <ProductDetailsCard
        :name="product.name"
        :price="product.price"
        :description="product.description"
        :sizes="product.sizes"
        :saved="product.saved"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductPhotoGallery from './ProductPhotoGallery.vue';
import ProductDetailsCard from './ProductDetailsCard.vue';
import { Product } from '@/types';

defineProps<{
  product: Product
}>();
</script>

<style scoped>
.product-details-container {
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

</style>