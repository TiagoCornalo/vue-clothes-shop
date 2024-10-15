<template>
  <div class="checkout-product-total">
    <h2 class="checkout-product-total__title">Resumen de compra</h2>
    <Separator />
    <div class="discount-container">
      <Accordion
        type="single"
        class="w-full"
        collapsible
      >
        <AccordionItem value="discount">
          <AccordionTrigger>
            <div class="flex items-center justify-start gap-2 w-full">
              <TicketPercent
                class="text-[#3b3a3a]"
                :stroke-width="1.5"
              />
              <span class="discount-title">¿Tenés un cupón de descuento?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div class="flex items-center justify-between gap-2 w-full">
              <Input
                v-model="discountCode"
                placeholder="Ej. TONINAS2024"
                class="w-full bg-white focus-visible:ring-0"
              />
              <Button
                variant="secondary"
                @click="applyDiscount"
              >Aplicar</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    <div class="checkout-product-total__content">
      <div class="checkout-product-total__content-total">
        <h2 class="checkout-product-total__content-title">Total</h2>
        <span class="checkout-product-total__content-price">${{ total.toFixed(2) }}</span>
      </div>
      <div class="checkout-product-total__content-button">
        <Button
          variant="secondary"
          class="w-full"
          @click="goToPayment"
        >
          FINALIZAR COMPRA
        </Button>

        <Button
          variant="secondary"
          class="w-full button-continue"
          v-if="isMobile"
          @click="continueShopping"
        >
          CONTINUAR COMPRANDO
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShoppingBagStore } from '@/store';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { TicketPercent } from 'lucide-vue-next';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Input, Separator, Button } from '@/ui';
import { useRouter } from 'vue-router';
import { useMobileDetection } from '@/composables';

const router = useRouter();
const { isMobile } = useMobileDetection();

const shoppingBagStore = useShoppingBagStore();
const { items } = storeToRefs(shoppingBagStore);

const discountCode = ref('');

const total = computed(() => items.value.reduce((acc, item) => acc + item.price * item.quantity, 0));

const continueShopping = () => {
  router.back();
};

const applyDiscount = () => {
  // TODO: Implement discount logic
  console.log('applyDiscount');
}

const goToPayment = () => {
  router.push(`/checkout/payment`);
}
</script>

<style scoped lang="scss">
.checkout-product-total {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #eaced1;
  color: #000;
  padding: 1.25rem;
  width: 100%;

  @media (min-width: 768px) {
    position: sticky;
    top: 1rem;
  }
}

.checkout-product-total__title {
  font-size: 1.125rem;
  font-weight: 500;
  align-self: flex-start;
  margin-bottom: 1.25rem;
}

.discount-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;

  .discount-title {
    font-size: 11px;
    font-weight: 400;

  }
}

.checkout-product-total__content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;


  &-title {
    font-size: 1.125rem;
    font-weight: 500;
  }

  &-price {
    font-size: 1.125rem;
    font-weight: 500;
  }

  &-total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &-button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
    gap: 1rem;
  }

  .button-continue {
    background-color: #000;
    color: #fff;
  }
}
</style>
