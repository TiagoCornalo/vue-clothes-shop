<template>
  <div class="payment-order-resume">
    <h2 class="payment-order-resume__title">
      Resumen de compra
    </h2>
    <h3 class="payment-order-resume__subtitle">
      {{ totalProducts }} {{ totalProducts > 1 ? 'Productos' : 'Producto' }}
    </h3>
    <Separator class="w-full bg-white" />
    <div class="payment-order-resume__content">
      <div
        class="payment-order-resume__content-item"
        v-for="item in items"
        :key="item.id"
      >
        <div class="payment-order-resume__content-item-image">
          <img
            :src="item.image"
            :alt="item.name"
          />
        </div>
        <div class="payment-order-resume__content-item-info">
          <h4 class="payment-order-resume__content-item-title">
            {{ item.name }}
          </h4>
          <div class="payment-order-resume__content-item-quantity">
            <p class="payment-order-resume__content-item-quantity-text">
              Cantidad: {{ item.quantity }}
            </p>
            <p class="payment-order-resume__content-item-quantity-price">
              $ {{ item.price * item.quantity }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <Separator class="w-full bg-white" />
    <div class="payment-order-resume__total">
      <p class="payment-order-resume__total-text">
        Total
      </p>
      <span class="payment-order-resume__total-price">$ {{ total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useShoppingBagStore } from '@/store';
import { Separator } from '@/ui';
import { computed } from 'vue';

const shoppingBagStore = useShoppingBagStore();
const { items } = storeToRefs(shoppingBagStore);

const totalProducts = computed(() => {
  return items.value.reduce((acc, item) => acc + item.quantity, 0);
});

const total = computed(() => {
  return items.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
});
</script>

<style scoped lang="scss">
.payment-order-resume {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #eaced1;
  color: #000;
  padding: 1.25rem;
  width: 50%;
  height: fit-content;

  @media (min-width: 768px) {
    position: sticky;
    top: 1rem;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
  }

  &__subtitle {
    font-size: 11px;
    font-weight: 400;
    margin: 0.5rem 0;

  }
}

.payment-order-resume__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-height: 370px;
  overflow-y: auto;

  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid #fff;
    padding: 1rem 0;
    gap: 0.5rem;

    &:last-child {
      border-bottom: none;
    }

    &-image {
      width: 75px;
      height: 75px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      gap: 1rem;
    }

    &-title {
      font-size: 12px;
      font-weight: 400;
    }

    &-quantity {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      &-text {
        font-size: 12px;
        font-weight: 400;
        color: #fff;
      }

      &-price {
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
}

.payment-order-resume__total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0;

  &-text {
    font-size: 18px;
    font-weight: 400;
  }

  &-price {
    font-size: 18px;
    font-weight: 400;
  }
}
</style>
