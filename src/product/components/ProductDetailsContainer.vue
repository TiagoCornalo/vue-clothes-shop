<template>
  <section
    v-animate
    class="animate"
  >
    <div class="product-details-container">
      <img
        :src="logo"
        alt="logo"
      />
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
          :selected-size="selectedSize"
          :selected-color="selectedColor"
          :available-sizes="availableSizes"
          @update:selected-size="selectedSize = $event"
          @update:selected-color="selectedColor = $event"
          @add-to-cart="addToCart"
        />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ProductPhotoGallery from './ProductPhotoGallery.vue';
import ProductDetailsCard from './ProductDetailsCard.vue';
import logo from '@/assets/logo.svg'
import { Skeleton } from '@/ui'
import { useProduct } from '../composables/useProduct'

const props = defineProps<{
  productId: string
}>();

const {
  product,
  selectedSize,
  selectedColor,
  availableSizes,
  isLoading,
  fetchProduct,
  addToCart
} = useProduct()

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

  @media (max-width: 975px) {
    flex-direction: column;
  }
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