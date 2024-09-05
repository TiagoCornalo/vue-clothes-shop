<template>
  <section v-animate class="animate">
    <h2 class="text-md">Te puede interesar</h2>
    <div class="suggested-container">
      <ProductCard
        v-animate
        v-for="product in products"
        :key="product.id"
        :image="product.image"
        :name="product.name"
        :price="product.price"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue';

const products = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633764/sbzhziwixshygpburaip.jpg',
    name: 'Product name',
    price: 49.99
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/ko1l1vfxfshph1sfur31.jpg',
    name: 'Product name',
    price: 49.99
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/nuwx3wir2monecizznuv.jpg',
    name: 'Product name',
    price: 49.99
  },
  {
    id: 4,
    image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633764/sbzhziwixshygpburaip.jpg',
    name: 'Product name',
    price: 49.99
  },
  {
    id: 5,
    image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/ko1l1vfxfshph1sfur31.jpg',
    name: 'Product name',
    price: 49.99
  },
  {
    id: 6,
    image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/nuwx3wir2monecizznuv.jpg',
    name: 'Product name',
    price: 49.99
  }
]
</script>

<style scoped>
.suggested-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
   width: 100%;
  }
}
</style>