<template>
  <section>
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
          <DrawerTitle>
            Detalles del producto
          </DrawerTitle>
          <ProductDetailsCard
            :name="product.name"
            :price="product.price"
            :description="product.description"
            :sizes="product.sizes"
            :saved="product.saved"
            :colors="product.colors"
            @add-to-cart="addToCart"
          />
        </DrawerContent>
      </Drawer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button, Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from '@/ui';
import ProductDetailsCard from './ProductDetailsCard.vue';
import { Product } from '@/types';
import { useShoppingBagStore } from '@/store';

const props = defineProps<{
  product: Product;
}>();

const shoppingBagStore = useShoppingBagStore()

const addToCart = (size: string, color: string) => {
  shoppingBagStore.addItem({
    ...props.product,
    slug: props.product.slug,
    size,
    color,
    quantity: 1
  })
}

</script>

<style scoped>
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
