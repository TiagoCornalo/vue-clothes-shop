<template>
  <section class="carousel-wrapper">
    <Carousel class="carousel-fullscreen">
      <CarouselContent>
        <CarouselItem v-for="(benefit, index) in benefits" :key="index" class="carousel-item">
          <div class="carousel-item-content">
            <h2 class="text-2xl text-center">{{ benefit.title }}</h2>
            <p class="text-center">{{ benefit.description }}</p>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </section>
</template>

<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem } from '@/components'

const benefits = [
  {
    title: 'Free Shipping',
    description: 'Free shipping on all orders over $100',
  },
  {
    title: 'Quality Guarantee',
    description: 'We guarantee the quality of all our products',
  },
  {
    title: '24/7 Support',
    description: 'We\'re here to help you whenever you need us',
  }
]

</script>

<style scoped>
.carousel-wrapper {
  position: relative;
  overflow: hidden;
  background-color: #f3f3f3;
  padding: 4rem 0;

  .carousel-fullscreen {
    width: 100%;
    height: 100%;
  }

  .carousel-item-content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .carousel-item {
    cursor: pointer;
    width: 33.3333%;
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
}
</style>