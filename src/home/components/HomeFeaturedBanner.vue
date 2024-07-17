<template>
  <FeaturedBanner image="https://res.cloudinary.com/dopgj4dbg/image/upload/v1715801362/w5ehntha7rlsu4gnkklj.jpg">
    <div class="featured-banner-content">
      <h2 class="text-sm font-bold text-gray-500 drop-shadow-md text-center uppercase">Discover our new collection</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem animi ullam tenetur veritatis obcaecati
        harum fugit optio perspiciatis perferendis officia voluptate, adipisci ipsa nostrum nesciunt? Vero itaque ex
        sapiente distinctio.</p>
      <router-link
        to="/shop"
        class="button"
      >
        <Button>
          Shop Now
        </Button>
      </router-link>
    </div>
  </FeaturedBanner>
</template>

<script setup lang="ts">
import { FeaturedBanner } from '@/shared';
import { Button } from '@/ui';
</script>

<style scoped>
.featured-banner-content {
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 5rem;
  width: 40%;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 2rem;
  }
}
</style>