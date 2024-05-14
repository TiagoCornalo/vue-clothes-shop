<template>
  <div class="carousel-wrapper">
    <Carousel class="carousel-fullscreen">
      <CarouselContent>
        <CarouselItem v-for="(item, index) in galleryItems" :key="index" class="carousel-item">
          <div class="carousel-item-content">
            <img :src="item.image" alt="Gallery item" />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
</template>


<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components'
import { defineProps } from 'vue';

interface GalleryItem {
  image: string;
}

defineProps({
  galleryItems: {
    type: Array as () => GalleryItem[],
    required: true,
  },
})
</script>

<style scoped>
.carousel-wrapper {
  width: 90vw;
  position: relative;
}

.carousel-fullscreen {
  width: 100%;
  height: 100%;
}

.carousel-item-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}

.carousel-item {
  width: 33.3333%;
  height: 100%;
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
