<template>
  <main class="page-container">
    <Toaster />
    <CheckoutHeader />
    <CheckoutContent />
  </main>
</template>

<script setup lang="ts">
import { CheckoutHeader, CheckoutContent } from './components';
import { Toaster } from '@/ui';
</script>
