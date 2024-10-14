<template>
  <div class="layout-container">
    <LayoutAnnouncementsCarousel />
    <LayoutSideBar />
    <LayoutShoppingBag v-if="!isCheckout" />
    <slot />
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
import { LayoutSideBar, LayoutFooter, LayoutShoppingBag, LayoutAnnouncementsCarousel } from './components'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isCheckout = computed(() => route.path.includes('checkout'))
</script>

<style scoped lang="scss">
.layout-container {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
</style>