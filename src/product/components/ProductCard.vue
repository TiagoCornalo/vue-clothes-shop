<template>
  <div class="product-card">
    <div class="product-card-header" v-bind:style="{ backgroundImage: `url(${image})` }"></div>
    <div class="product-card-body">
      <h3 class="product-card-title">{{ name }}</h3>
      <p class="product-card-description">$ {{ price }}</p>
    </div>
    <div class="product-card-footer">
      <Button variant="outline">
        Agregar al carrito
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/ui';

defineProps<{
  image: string;
  name: string;
  price: number;
}>();
</script>

<style scoped>
.product-card {
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
  cursor: pointer;
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

.product-card-footer {
  padding: 1rem;
  border-top: 1px solid #eaeaea;
  text-align: center;
}
</style>
