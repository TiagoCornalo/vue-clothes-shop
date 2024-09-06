<template>
  <main class="page-container">
    <ProductDetailsContainer v-if="!isMobile" :product="product" />
    <ProductSuggested v-if="!isMobile" />
    <ProductMobileGallery v-else :product="product" />
  </main>
</template>

<script setup lang="ts">
import {
  ProductDetailsContainer,
  ProductMobileGallery,
  ProductSuggested
} from './components'
import { useMobileDetection } from '@/composables'

const { isMobile } = useMobileDetection()

const product = {
  id: 1,
  name: 'Product name',
  price: 49.99,
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem animi ullam tenetur veritatis obcaecati harum fugit optio perspiciatis perferendis officia voluptate, adipisci ipsa nostrum nesciunt? Vero itaque ex sapiente distinctio.',
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
