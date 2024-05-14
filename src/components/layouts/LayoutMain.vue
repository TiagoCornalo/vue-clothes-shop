<template>
  <div class="layout-main">
    <Nav />
      <slot />
  </div>
</template>

<script setup lang="ts">
import Nav from './Nav.vue';

</script>

<style scoped lang="scss">
.layout-main {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
</style>