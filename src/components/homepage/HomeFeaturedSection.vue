<template>
  <section class="animate">
    <div class="text-center flex flex-col items-center justify-center">
      <h3 class="text-sm font-bold text-gray-400 drop-shadow-md animate">
        THE SPRING SUMMER COLLECTION
      </h3>
      <h2 class="text-3xl text-gray-700 drop-shadow-md py-4 animate">
        It's in bloom
      </h2>
      <Button class="my-5 animate">
        Shop now
      </Button>
    </div>
    <Gallery
      :gallery-items="galleryClothesItems"
      :should-animate="false"
    />
  </section>
</template>

<script setup lang="ts">
import { Gallery, Button } from '@/components';
import { ref } from 'vue';

const galleryClothesItems = ref([
  {
    image: 'https://static.zara.net/photos///2023/I/0/2/p/9621/304/712/2/w/750/9621304712_1_1_1.jpg?ts=1696415809031',
    title: 'STRETCH COAT',
    price: 49.99
  },
  {
    image: 'https://static.zara.net/assets/public/88f2/76a0/f80a4cb79a49/d14f040dc3b2/04164918800-p/04164918800-p.jpg?ts=1706111316734&w=750',
    title: 'STRETCH COAT',
    price: 49.99
  },
  {
    image: 'https://static.zara.net/assets/public/8503/f72a/87f8497eb1a9/8cebc138d929/04376266800-p/04376266800-p.jpg?ts=1706806936248&w=750',
    title: 'STRETCH COAT',
    price: 49.99
  },
  {
    image: 'https://static.zara.net/photos///2024/V/0/2/p/5854/270/064/2/w/750/5854270064_1_1_1.jpg?ts=1700214824309',
    title: 'STRETCH COAT',
    price: 49.99
  },
  {
    image: 'https://static.zara.net/assets/public/88f2/76a0/f80a4cb79a49/d14f040dc3b2/04164918800-p/04164918800-p.jpg?ts=1706111316734&w=750',
    title: 'STRETCH COAT',
    price: 49.99
  },
  {
    image: 'https://static.zara.net/assets/public/8503/f72a/87f8497eb1a9/8cebc138d929/04376266800-p/04376266800-p.jpg?ts=1706806936248&w=750',
    title: 'STRETCH COAT',
    price: 49.99
  }
])
</script>