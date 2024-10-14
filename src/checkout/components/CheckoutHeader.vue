<template>
  <div class="checkout-header">
    <router-link to="/">
      <img
        :src="logo"
        alt="logo"
      />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.svg';
</script>

<style scoped>
.checkout-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
</style>