<template>
  <div class="layout-container">
    <LayoutAnnouncementsCarousel />
    <LayoutSideBar />
    <LayoutShoppingBag
      v-if="shouldShowShoppingBag"
      :show-finish-button="!isPaymentPage"
    />
    <slot />
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
import { LayoutSideBar, LayoutFooter, LayoutShoppingBag, LayoutAnnouncementsCarousel } from './components'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useMobileDetection } from '@/composables';

const route = useRoute();
const { isMobile } = useMobileDetection();

const isCheckoutPage = computed(() => route.path.includes("checkout"));
const isPaymentPage = computed(() => route.path.includes("payment"));

const shouldShowShoppingBag = computed(() => {
  if (isCheckoutPage.value && !isPaymentPage.value) {
    return false;
  }
  if (isPaymentPage.value) {
    return isMobile.value;
  }
  return true;
})
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