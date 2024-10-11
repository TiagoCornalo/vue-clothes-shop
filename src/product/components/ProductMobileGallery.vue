<template>
 <section>
    <div v-if="isLoading" class="skeleton-container">
      <Skeleton class="image-skeleton" v-for="i in 3" :key="i"/>
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
              @add-to-cart="addToCart"
              @update-stock="updateStock"
            />
          </DrawerContent>
        </Drawer>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Button, Drawer, DrawerContent, DrawerTrigger, DrawerTitle, Skeleton } from '@/ui';
import ProductDetailsCard from './ProductDetailsCard.vue';
import { Product } from '@/types';
import { useShoppingBagStore } from '@/store';

const props = defineProps<{
  productId: string;
}>();

const shoppingBagStore = useShoppingBagStore()
const isLoading = ref(true)
const product = ref<Product | null>(null)

const fetchProduct = async (id: string): Promise<Product> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

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
    category: "camisas",
    gender: "hombre",
    tags: ["camisas", "hombre", "azul"],
    isNewArrival: true,
    isOnSale: false,
    salePrice: 39.99,
    colors: [
      {
        name: "Rojo",
        hex: "#E8A5A6",
        sizes: [
          {
            size: "S",
            quantity: 10
          },
          {
            size: "M",
            quantity: 10
          }
        ]
      },
      {
        name: "Azul",
        hex: "#A7C9D4",
        sizes: [
          {
            size: "S",
            quantity: 10
          },
        ]
      },
      {
        name: "Verde",
        hex: "#91EC99",
        sizes: [
          {
            size: "L",
            quantity: 10
          },
          {
            size: "XL",
            quantity: 10
          }
        ]
      }
    ],
    brand: "Nike",
    saved: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

onMounted(async () => {
  try {
    product.value = await fetchProduct(props.productId);
  } catch (error) {
    console.error('Error al cargar el producto:', error);
  } finally {
    isLoading.value = false;
  }
})

const updateStock = (color: string, size: string) => {
  if (product.value) {
    const colorIndex = product.value.colors.findIndex(c => c.name === color);
    if (colorIndex !== -1) {
      const sizeIndex = product.value.colors[colorIndex].sizes.findIndex(s => s.size === size);
      if (sizeIndex !== -1) {
        product.value.colors[colorIndex].sizes[sizeIndex].quantity--;
      }
    }
  }
}

const addToCart = (size: string, color: string) => {
  if (product.value) {
    shoppingBagStore.addItem({
      ...product.value,
      size,
      color,
      quantity: 1
    })
  }
}

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
