<template>
  <div class="carousel-wrapper">
    <Carousel class="carousel-fullscreen">
      <CarouselContent>
        <CarouselItem
          v-for="(item, index) in galleryItems"
          :key="index"
          :class="`${shouldAnimate ? 'carousel-item carousel-item-animate' : 'carousel-item'}`"
        >
          <div class="carousel-item-content">
            <img
              :src="item.image"
              alt="Gallery item"
              class="carousel-img"
            />
            <h4
              v-if="item?.title"
              class="text-md text-gray-900 py-4  drop-shadow-md"
            >{{ item.title }}</h4>
            <p
              v-if="item?.price"
              class="text-sm text-gray-500 py-2 drop-shadow-md"
            >
              ${{ item.price }}</p>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>


<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem } from '@/ui'

interface GalleryItem {
  image: string;
  title?: string;
  price?: number;
}

defineProps({
  galleryItems: {
    type: Array as () => GalleryItem[],
    required: true,
  },
  shouldAnimate: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped>
.carousel-wrapper {
  position: relative;
  overflow: hidden;

  .carousel-fullscreen {
    width: 100%;
    height: 100%;
  }

  .carousel-item-content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }

  .carousel-item {
    cursor: pointer;
    height: 100%;
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.6s ease;
    opacity: 1;


    @media (max-width: 768px) {
      width: 90%;
    }
  }

  &:hover .carousel-item-animate:not(:hover) {
    opacity: 0.2;
    scale: 0.9;

    @media (max-width: 768px) {
      opacity: 1;
      scale: 1;
    }
  }

  .carousel-img {
    width: 100%;
    max-height: 650px;
    object-fit: contain;
    object-position: center;

  }

  @media (max-width: 768px) {
    width: 90vw;
  }
}
</style>
