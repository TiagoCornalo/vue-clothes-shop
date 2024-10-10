<template>
  <div class="layout-container">
    <LayoutSideBar />
    <LayoutShoppingBag />
    <slot />
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
import { LayoutSideBar, LayoutFooter, LayoutShoppingBag } from './components'

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