<template>
  <main class="page-container">
    <Toaster />
    <LogoHeader />
    <CheckoutContent />
  </main>
</template>

<script setup lang="ts">
import { CheckoutContent } from './components';
import { LogoHeader } from '@/shared';
import { Toaster } from '@/ui';
</script>
