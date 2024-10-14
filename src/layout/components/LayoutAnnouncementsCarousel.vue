<template>
  <div
    class="carousel"
    @mouseover="pauseCarousel"
    @mouseleave="startCarousel"
  >
    <div
      class="carousel-track"
      :style="{ animationPlayState: isPaused ? 'paused' : 'running' }"
    >
      <span
        v-for="(item, index) in items"
        :key="index"
        class="carousel-item"
      >
        {{ item }}
      </span>
      <span
        v-for="(item, index) in items"
        :key="'duplicate-' + index"
        class="carousel-item"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const items = ref<string[]>([
  "APROVECHÁ 3 CUOTAS SIN INTERÉS PAGANDO CON MERCADO CRÉDITOS",
  "APROVECHÁ 3 CUOTAS SIN INTERÉS PAGANDO CON MERCADO CRÉDITOS",
  "APROVECHÁ 3 CUOTAS SIN INTERÉS PAGANDO CON MERCADO CRÉDITOS",
  "APROVECHÁ 3 CUOTAS SIN INTERÉS PAGANDO CON MERCADO CRÉDITOS",
  "APROVECHÁ 3 CUOTAS SIN INTERÉS PAGANDO CON MERCADO CRÉDITOS",
  "APROVECHÁ 3 CUOTAS SIN INTERÉS PAGANDO CON MERCADO CRÉDITOS",
  "APROVECHÁ 3 CUOTAS SIN INTERÉS PAGANDO CON MERCADO CRÉDITOS",
  "APROVECHÁ 3 CUOTAS SIN INTERÉS PAGANDO CON MERCADO CRÉDITOS",
  "APROVECHÁ 3 CUOTAS SIN INTERÉS PAGANDO CON MERCADO CRÉDITOS",
  "APROVECHÁ 3 CUOTAS SIN INTERÉS PAGANDO CON MERCADO CRÉDITOS",
  "APROVECHÁ 3 CUOTAS SIN INTERÉS PAGANDO CON MERCADO CRÉDITOS",
  "APROVECHÁ 3 CUOTAS SIN INTERÉS PAGANDO CON MERCADO CRÉDITOS",
]);

const isPaused = ref<boolean>(false);

const pauseCarousel = () => {
  isPaused.value = true;
};

const startCarousel = () => {
  isPaused.value = false;
};
</script>

<style scoped>
.carousel {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #aabf62;
}

.carousel-track {
  display: inline-flex;
  animation: scroll 25s linear infinite;
  width: auto;
  min-width: 100%;
  gap: 1rem;

  @media (min-width: 768px) {
    padding: 0.5rem 0;
  }
}

.carousel-item {
  flex: 0 0 auto;
  padding: 0 10px;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
}

@keyframes scroll {

  0% {
    transform: translateX(100%);
    animation-delay: -25s;
  }

  100% {
    transform: translateX(-100%);
    animation-delay: -25s;
  }
}
</style>