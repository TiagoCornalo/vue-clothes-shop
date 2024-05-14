<template>
  <section class="hero" :style="{ backgroundImage: `url(${heroImage})` }">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  heroImage: {
    type: String,
    required: true,
  },
});

</script>

<style scoped>
.hero {
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}
</style>