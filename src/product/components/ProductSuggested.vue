<template>
  <section class="suggested-container">
    <div v-if="isLoading" class="skeleton-container">
      <Skeleton class="product-card-skeleton" v-for="i in 6" :key="i"/>
    </div>
    <template v-else-if="products.length > 0">
    <h2 class="text-md">Te puede interesar</h2>
    <div class="products-container">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :slug="product.slug"
        :image="product.image"
        :name="product.name"
        :price="product.price"
        :category="product.category"
          />
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ProductSuggested } from '@/types'
import { Skeleton } from '@/ui'
import ProductCard from './ProductCard.vue'

const products = ref<ProductSuggested[]>([])
const isLoading = ref(true)

const fetchProducts = async () => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  return [
  {
    id: 1,
    slug: 'camisa-rayada-azul',
    image:
      'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633764/sbzhziwixshygpburaip.jpg',
    name: 'Product name',
    price: 49.99,
    category: 'camisas'
  },
  {
    id: 2,
    slug: 'camisa-rayada-roja',
    image:
      'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/ko1l1vfxfshph1sfur31.jpg',
    name: 'Product name',
    price: 49.99,
    category: 'camisas'
  },
  {
    id: 3,
    slug: 'camisa-rayada-verde',
    image:
      'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/nuwx3wir2monecizznuv.jpg',
    name: 'Product name',
    price: 49.99,
    category: 'camisas'
  },
  {
    id: 4,
    slug: 'camisa-rayada-amarilla',
    image:
      'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633764/sbzhziwixshygpburaip.jpg',
    name: 'Product name',
    price: 49.99,
    category: 'camisas'
  },
  {
    id: 5,
    slug: 'camisa-rayada-morada',
    image:
      'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/ko1l1vfxfshph1sfur31.jpg',
    name: 'Product name',
    price: 49.99,
    category: 'camisas'
  },
  {
    id: 6,
    slug: 'camisa-rayada-rosa',
    image:
      'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/nuwx3wir2monecizznuv.jpg',
    name: 'Product name',
    price: 49.99,
    category: 'camisas'
    }
  ]
}

onMounted(async () => {
  try {
    products.value = await fetchProducts()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

</script>

<style scoped>
.suggested-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: unset;
  height: fit-content;
}

.skeleton-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    width: 100%;
  }
}

.product-card-skeleton {
  width: 300px;
  height: 400px;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    width: 100%;
  }
}
</style>
