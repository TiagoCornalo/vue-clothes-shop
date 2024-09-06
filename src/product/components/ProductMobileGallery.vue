<template>
  <section v-animate class="animate">
    <!-- Galería de imágenes con scroll -->
    <div class="image-scroller scroll-shadow">
      <div
        class="product-container-mobile"
        v-for="image in product.images"
        :key="image"
      >
        <img :src="image" alt="Product image" fetchpriority="high" />
      </div>
    </div>

    <!-- Sección fija con botón para abrir el drawer -->
    <div class="fixed-bottom">
      <Button @click="openDrawer = true" variant="outline">
        Ver detalles
      </Button>
    </div>

    <!-- Drawer que muestra más detalles del producto -->
    <Drawer v-model="openDrawer" position="bottom" class="mobile-drawer">
      <DrawerContent>
        <ProductDetailsCard
          :name="product.name"
          :price="product.price"
          :description="product.description"
          :sizes="product.sizes"
          :saved="product.saved"
        />
      </DrawerContent>
    </Drawer>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button, Drawer, DrawerContent } from '@/ui'; // Usando los componentes de shadcn
import ProductDetailsCard from './ProductDetailsCard.vue';
import { Product } from '@/types'; // Definición del tipo Product

// Props recibidas
defineProps<{
  product: Product;
}>();

// Estado para abrir y cerrar el drawer
const openDrawer = ref(false);
</script>

<style scoped>
/* Contenedor de la galería de imágenes con scroll */
.image-scroller {
  max-height: 70vh;
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

/* Efecto de sombra para indicar scroll */
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

/* Sección fija en la parte inferior con el botón */
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
}

.fixed-bottom button {
  width: 90%;
}

/* Drawer para mobile */
.mobile-drawer {
  max-height: 80vh;
  overflow-y: auto;
  padding: 1rem;
}
</style>
