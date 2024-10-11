<template>
  <section>
    <div
      v-if="isLoading"
      class="skeleton-container"
    >
      <Skeleton
        class="image-skeleton"
        v-for="i in 3"
        :key="i"
      />
    </div>
    <template v-else-if="product">
      <div class="image-scroller scroll-shadow">
        <div
          class="product-container-mobile"
          v-for="image in product.images"
          :key="image"
        >
          <img
            :src="image"
            alt="Product image"
            fetchpriority="high"
          />
        </div>
      </div>

      <div class="fixed-bottom">
        <Drawer
          position="bottom"
          class="mobile-drawer"
        >
          <DrawerTrigger as-child>
            <Button variant="outline">
              Ver detalles
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerTitle class="p-6">
              Detalles del producto
            </DrawerTitle>
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
          </DrawerContent>
        </Drawer>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Button, Drawer, DrawerContent, DrawerTrigger, DrawerTitle, Skeleton } from '@/ui';
import ProductDetailsCard from './ProductDetailsCard.vue';
import { useProductDetails } from '../composables/useProductDetails'

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
} = useProductDetails()

onMounted(async () => {
  await fetchProduct(props.productId)
})
</script>

<style scoped>
.skeleton-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  max-height: 90vh;
  overflow-y: auto;
}

.image-skeleton {
  width: 300px;
  height: 400px;
}

.image-scroller {
  max-height: 90vh;
  overflow-y: auto;
  padding: 1rem;
}

.product-container-mobile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.product-container-mobile img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.scroll-shadow {
  background: linear-gradient(white 30%, rgba(255, 255, 255, 0)),
    linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
    radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)),
    radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)) 0 100%;
  background-repeat: no-repeat;
  background-color: white;
  background-size: 100% 50px, 100% 50px, 100% 18px, 100% 18px;
  background-attachment: local, local, scroll, scroll;
  overflow-y: auto;
}

.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 1rem;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  z-index: 10;
  padding-bottom: calc(env(safe-area-inset-bottom) + 1rem);
}

.fixed-bottom button {
  width: 90%;
}

.mobile-drawer {
  max-height: 80vh;
  overflow-y: auto;
  padding: 1rem;
}
</style>
