<template>
  <main class="page-container">
    <Toaster />
    <section class="animate">
      <LogoHeader />
      <div
        class="payment-container"
        v-if="items.length > 0"
      >
        <Tabs
          v-model="step"
          class="w-full"
        >
          <TabsList class="w-full tabs-container">
            <TabsTrigger
              value="shipment"
              class="w-full pink-button"
            >Información de envío</TabsTrigger>
            <TabsTrigger
              value="payment"
              class="w-full pink-button"
              :disabled="step === 'shipment'"
            >Revisión y pago</TabsTrigger>
          </TabsList>
          <TabsContent
            value="shipment"
            class="flex flex-row"
          >
            <PaymentShipmentInfoContainer @change-step="changeStep" />
          </TabsContent>
          <TabsContent value="payment">
            <PaymentRevisionContainer />
          </TabsContent>
        </Tabs>
        <PaymentOrderSummary v-if="!isMobile" />
      </div>
      <div v-else>
        <h3 class="payment-container__empty-title">TU CESTA ESTÁ VACIA</h3>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/ui';
import { PaymentShipmentInfoContainer, PaymentRevisionContainer, PaymentOrderSummary } from './components';
import { LogoHeader } from '@/shared';
import { useMobileDetection } from '@/composables';
import { useShoppingBagStore } from '@/store';
import { Toaster } from '@/ui';

const { isMobile } = useMobileDetection();
const { items } = useShoppingBagStore();
const step = ref<'shipment' | 'payment'>('shipment');

const changeStep = (newStep: "shipment" | "payment") => {
  step.value = newStep;
};

</script>

<style scoped lang="scss">
.payment-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  max-width: 1300px;
}

.tabs-container {
  display: flex;
  flex-direction: row;
  gap: 0;
  width: 100%;
  max-width: 1300px;

  @media (min-width: 768px) {
    gap: 1rem;
  }
}

.payment-container__empty-title {
  font-size: 1rem;
  font-weight: 500;
  padding-bottom: 0.5rem;
}
</style>