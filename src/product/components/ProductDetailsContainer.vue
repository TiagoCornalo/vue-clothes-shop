<template>
  <section
    v-animate
    class="animate"
  >
    <div class="product-details-container">
      <template v-if="isLoading">
        <Skeleton class="photo-gallery-skeleton" />
        <Skeleton class="product-details-skeleton" />
      </template>
      <template v-else-if="product">
        <ProductPhotoGallery :image-list="product.images" />
        <ProductDetailsCard
          :name="product.name"
          :price="product.price"
          :description="product.description"
          :saved="product.saved"
          :colors="product.colors"
          @add-to-cart="addToCart"
          @update-stock="updateStock"
        />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ProductPhotoGallery from './ProductPhotoGallery.vue';
import ProductDetailsCard from './ProductDetailsCard.vue';
import { Skeleton } from '@/ui'
import { useProductDetails } from '../composables/useProductDetails'

const props = defineProps<{
  productId: string
}>();

const { product, isLoading, fetchProduct, addToCart, updateStock } = useProductDetails()


onMounted(async () => {
  await fetchProduct(props.productId)
})

</script>

<style scoped lang="scss">
.product-details-container {
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.photo-gallery-skeleton {
  width: 500px;
  height: 600px;
}

.product-details-skeleton {
  width: 400px;
  height: 500px;
}
</style>