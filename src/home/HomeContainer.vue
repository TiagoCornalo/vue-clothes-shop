<template>
  <main class="page-container">
    <HomeHero v-animate class="animate" />
    <HomeCollection v-animate class="animate" />
    <Separator v-animate class="animate" />
    <HomeFeatured v-animate class="animate" />
    <HomeBenefits v-animate class="animate" />
    <HomeFeaturedBanner v-animate class="animate" />
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

</script>