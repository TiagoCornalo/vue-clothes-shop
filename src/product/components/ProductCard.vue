<template>
  <router-link
    :to="productUrl"
    class="product-card"
  >
    <div
      class="product-card-header"
      v-bind:style="{ backgroundImage: `url(${image})` }"
    ></div>
    <div class="product-card-body">
      <h3 class="product-card-title">{{ name }}</h3>
      <p class="product-card-description">$ {{ price }}</p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  id: number
  slug: string
  image: string
  name: string
  price: number
  category: string
}>()

const productUrl = computed(() => `/${props.category}/${props.slug}-${props.id}`)
</script>

<style scoped>
.product-card {
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
  cursor: pointer;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
  text-decoration: none;
  color: inherit;
}

.product-card-header {
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
}

.product-card-body {
  padding: 1rem;
}

.product-card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.product-card-description {
  font-size: 1rem;
  color: #555;
}
</style>
