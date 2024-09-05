<template>
  <main class="page-container">
    <section v-animate class="animate" v-if="!isMobile">
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
    <ProductSuggested  />
  </section>
    <section v-animate class="animate" v-else>
      <div class="product-container-mobile" v-for="image in product.images" :key="image">
        <img :src="image" alt="Product image" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ProductPhotoGallery, ProductDetailsCard, ProductSuggested } from './components';
import { useMobileDetection } from '@/composables';

const { isMobile } = useMobileDetection();

const product = {
  name: 'Product name',
  price: 49.99,
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem animi ullam tenetur veritatis obcaecati harum fugit optio perspiciatis perferendis officia voluptate, adipisci ipsa nostrum nesciunt? Vero itaque ex sapiente distinctio.',
  images: [
    'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633764/sbzhziwixshygpburaip.jpg',
    'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/ko1l1vfxfshph1sfur31.jpg',
    'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/nuwx3wir2monecizznuv.jpg',
    'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633764/sbzhziwixshygpburaip.jpg',
    'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/ko1l1vfxfshph1sfur31.jpg',
    'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/nuwx3wir2monecizznuv.jpg'
  ],
  sizes: ['S', 'M', 'L', 'XL'],
  saved: true
}

</script>

<style scoped>
.product-details-container {
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.product-container-mobile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>