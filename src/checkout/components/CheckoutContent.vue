<template>
  <section
    v-animate
    class="animate checkout-content"
  >
    <h2 class="checkout-content__title">
      MI CESTA
    </h2>
    <div
      class="checkout-content__items animate"
      v-if="items.length"
    >
      <div class="checkout-content__items-wrapper animate">
        <CheckoutProductTable :items="items" />
        <div class="checkout-content__total-wrapper animate">
          <CheckoutProductTotal />
        </div>
      </div>
    </div>
    <div
      class="checkout-content__empty"
      v-else
    >
      <h3 class="checkout-content__empty-title">TU CESTA ESTÁ VACIA</h3>
      <p class="checkout-content__empty-text">Los artículos que agregues aparecerán aquí</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useShoppingBagStore } from '@/store';
import { storeToRefs } from 'pinia';
import CheckoutProductTable from './CheckoutProductTable.vue';
import CheckoutProductTotal from './CheckoutProductTotal.vue';

const shoppingBagStore = useShoppingBagStore();
const { items } = storeToRefs(shoppingBagStore);

</script>

<style scoped lang="scss">
.checkout-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.checkout-content__title {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 1.5rem;
  font-weight: 500;
  width: 100%;
  max-width: 1300px;
  padding: 0.5rem;
}

.checkout-content__items {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin: 1rem;
  width: 100%;
  max-width: 1300px;
  height: 100%;
  gap: 1rem;

  &-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    gap: 1rem;

    @media (min-width: 875px) {
      flex-direction: row;
    }
  }
}

.checkout-content__total-wrapper {
  width: 100%;

  @media (min-width: 875px) {
    width: 50%;
  }
}

.checkout-content__empty {
  padding: 3rem;
}

.checkout-content__empty-title {
  font-size: 1rem;
  font-weight: 500;
  padding-bottom: 0.5rem;
}

.checkout-content__empty-text {
  font-size: 0.875rem;
  font-weight: 400;
}
</style>
