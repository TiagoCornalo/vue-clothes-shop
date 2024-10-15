<template>
  <div class="payment-shipment-info">
    <Card class="rounded-none">
      <CardHeader class="">
        <CardTitle class="text-xl">¿Cómo entregamos tu compra?</CardTitle>
      </CardHeader>
      <CardContent class="flex flex-row gap-8">
        <Button
          @click="shipmentType = 'pickup'"
          :class="shipmentType === 'pickup' ? 'bg-primary text-primary-foreground pink-button' : 'bg-secondary text-secondary-foreground'"
          class="rounded-none shipment-select-button"
        >
          RETIRO EN TIENDA
          <span class="button-text">¡Gratis!</span>
        </Button>
        <!--  <Button
          @click="shipmentInfo.type = 'delivery'"
          :class="shipmentInfo.type === 'delivery' ? 'bg-primary text-primary-foreground pink-button' : 'bg-secondary text-secondary-foreground'"
          class="w-full rounded-none shipment-select-button"
        >
          ENVÍO A DOMICILIO
          <span class="button-text">envio GRATIS apartir de $30000</span>
        </Button> -->
      </CardContent>
    </Card>
    <PaymentPickupInfo
      v-if="shipmentType === 'pickup'"
      @change-step="$emit('change-step', $event)"
    />
    <PaymentDeliveryInfo v-if="shipmentType === 'delivery'" />
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { PaymentPickupInfo, PaymentDeliveryInfo } from './components';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/ui';

const shipmentType = ref<'pickup' | 'delivery'>('pickup');

defineEmits(['change-step']);
</script>

<style scoped lang="scss">
.payment-shipment-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.shipment-select-button {
  padding: 20px 35px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  font-size: 14px;
  height: 100%;
  border: 1px solid #000;
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
}

.button-text {
  font-size: 12px;
  margin-top: 10px;
  color: #808080;
}

.pink-button {
  border-radius: 0;
  height: 100%;
  border: 1px solid #f5b0b5;
}
</style>
