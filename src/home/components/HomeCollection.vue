<template>
  <section class="animate collection-section">
    <h3 class="text-md text-gray-900 py-6 drop-shadow-md">
      Explore our collection
    </h3>
    <Gallery :gallery-items="galleryItems" />
  </section>
</template>

<script setup lang="ts">
import { Gallery } from '@/shared';
import { ref } from 'vue';

const galleryItems = ref([
  { image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633764/sbzhziwixshygpburaip.jpg', title: "Spring summer 2024" },
  { image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/ko1l1vfxfshph1sfur31.jpg', title: "New arrivals" },
  { image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/nuwx3wir2monecizznuv.jpg', title: "Hand-picked pieces" },
  { image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633764/sbzhziwixshygpburaip.jpg', title: "Footwear" },
  { image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/ko1l1vfxfshph1sfur31.jpg', title: "Dresses" },
  { image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/nuwx3wir2monecizznuv.jpg', title: "Best sellers" }
])

</script>