<template>
  <main>
    <HomeHeroSection />
    <HomeCollectionSection />
    <Separator class="animate" />
    <HomeFeaturedSection />
    <HomeBenefitsSection class="animate" />
    <HomeFeaturedBannerSection class="animate" />
  </main>
</template>


<script setup lang="ts">
import {
  HomeHeroSection,
  HomeCollectionSection,
  HomeFeaturedSection,
  Separator,
  HomeBenefitsSection,
  HomeFeaturedBannerSection
} from '@/components';
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

<style scoped>
main {
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
</style>