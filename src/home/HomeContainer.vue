<template>
  <main class="page-container">
    <HomeHero />
    <HomeCollection />
    <Separator class="animate" />
    <HomeFeatured />
    <HomeBenefits class="animate" />
    <HomeFeaturedBanner class="animate" />
  </main>
</template>


<script setup lang="ts">
import {
  HomeHero,
  HomeCollection,
  HomeFeatured,
  HomeBenefits,
  HomeFeaturedBanner
} from './components';
import { onMounted } from 'vue';
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
</script>