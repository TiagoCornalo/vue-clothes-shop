<template>
  <main>
    <Hero hero-image="https://res.cloudinary.com/dopgj4dbg/image/upload/v1715629379/fhrb3ller7oexscdcj1d.jpg">
      <h3 class="text-sm font-bold text-white drop-shadow-md animate">
        SPRING SUMMER '24
      </h3>
      <h1 class="text-7xl font-bold text-white drop-shadow-md py-4 animate">
        New Arrivals
      </h1>
      <p class="text-white drop-shadow-md animate">
        Shop the latest collection of our hand-picked pieces.
      </p>
      <Button variant="ghost" class="mt-8 animate">
        <ChevronDown class="h-6 w-6" />
      </Button>
    </Hero>
    <section class="animate">
      <h3 class="text-md text-gray-900 py-6 drop-shadow-md">
        Explore our collection
      </h3>
      <Gallery :gallery-items="galleryItems" />
    </section>
  </main>
</template>


<script setup lang="ts">
import { Hero, Button, Gallery } from '@/components';
import { ref, onMounted } from 'vue';
import { ChevronDown } from "lucide-vue-next"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  gsap.utils.toArray('.animate').forEach((section: any) => {
    gsap.from(section, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.3,
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none none",
      }
    });
  });
});

const galleryItems = ref([
  { image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633764/sbzhziwixshygpburaip.jpg' },
  { image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/ko1l1vfxfshph1sfur31.jpg' },
  { image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/nuwx3wir2monecizznuv.jpg' },
  { image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633764/sbzhziwixshygpburaip.jpg' },
  { image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/ko1l1vfxfshph1sfur31.jpg' },
  { image: 'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/nuwx3wir2monecizznuv.jpg' },
])

</script>

<style scoped>
main {
  margin-top: -50px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: 100%;
  width: 100%;
}

.section {
  visibility: hidden;
}
</style>