<template>
  <div class="layout-main">
    <SideBar />
    <slot />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import SideBar from './SideBar.vue';
import Footer from './Footer.vue';

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