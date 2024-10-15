<template>
  <Card class="rounded-none">
    <CardHeader>
      <CardTitle class="text-[18px]">Datos de facturación</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col gap-4 items-start justify-between">
      <div
        class="billing-data"
        v-if="billingDataInfo"
      >
        <p>{{ billingDataInfo.name }} {{ billingDataInfo.lastName }}</p>
        <p>Documento: {{ billingDataInfo.document }}</p>
        <p>Tel: {{ billingDataInfo.phone }}</p>
        <p>Dirección: {{ billingDataInfo.street }}, {{ billingDataInfo.number }}</p>
        <p>{{ billingDataInfo.city }}, {{ billingDataInfo.state }}, {{ billingDataInfo.postalCode }}</p>
      </div>
      <Button
        class="mt-4 edit-billing-data-button"
        @click="editBillingData"
        variant="outline"
      >
        <Pencil class="w-4 h-4" /> <span class="ml-2">Editar</span>
      </Button>
    </CardContent>
  </Card>
  <Card class="rounded-none">
    <CardHeader>
      <CardTitle class="text-[18px]">
        Método de pago
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="payment-method-container">
        <div class="payment-method-container__item">
          <Accordion
            v-model="paymentMethod"
            class="w-full"
          >
            <AccordionItem
              value="mercado-pago"
              :class="getAccordionItemClass('mercado-pago')"
            >
              <AccordionTrigger :isSelected="paymentMethod === 'mercado-pago'">
                <div class="payment-method-container__item__icon">
                  <img
                    :src="MercadoPago"
                    alt="Mercado Pago"
                  />
                  <span>Mercado Pago</span>
                </div>

              </AccordionTrigger>
              <AccordionContent>
                <div class="payment-method-container__item__content">
                  <p class="text-[14px]">Instrucciones</p>
                  <p class="text-[14px]">Pagá con el medio de pago que prefieras y disfrutá de la <span
                      class="font-bold"
                    >seguridad de Mercado
                      Pago</span>.
                  </p>
                  <p class="text-[14px]">Si ya tenés una cuenta en Mercado Libre, usá el mismo email y clave.</p>
                  <p class="text-[14px]">Usá tu saldo de Mercado Pago o tarjetas guardadas para comprar sin llenar más
                    detalles.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="efectivo"
              :class="getAccordionItemClass('efectivo')"
            >
              <AccordionTrigger :isSelected="paymentMethod === 'efectivo'">
                <div class="payment-method-container__item__icon">
                  <Banknote
                    class="w-[48px] h-[48px] text-[#6d6d6d]"
                    :stroke-width="1"
                  />
                  <span>Efectivo</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div class="payment-method-container__item__content">
                  <p class="text-[14px]">Instrucciones</p>
                  <p class="text-[14px]">
                    Paga en el momento de la entrega.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button
        class="w-full pink-button"
        @click="confirmPayment"
      >
        Confirmar
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useCheckoutStore } from '@/store';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
  Button,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  useToast
} from '@/ui';
import { Pencil, Banknote } from 'lucide-vue-next';
import MercadoPago from '@/assets/mercado-pago.svg';

const emit = defineEmits(['edit-billing-data']);

const checkoutStore = useCheckoutStore();
const { billingDataInfo } = storeToRefs(checkoutStore);
const { toast } = useToast();
const paymentMethod = ref('');

const getAccordionItemClass = computed(() => (value: string) => {
  return {
    'border-transparent': true,
    'border-[#f5b0b5]': paymentMethod.value === value,
    'border-2': paymentMethod.value === value
  };
});

const editBillingData = () => {
  emit('edit-billing-data');
}

const confirmPayment = () => {
  if (!paymentMethod.value) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'Debes seleccionar un método de pago'
    });
    return;
  }

  if (paymentMethod.value === 'mercado-pago') {
    console.log('mercado pago');
  } else if (paymentMethod.value === 'efectivo') {
    console.log('efectivo');
  }
}

</script>

<style scoped lang="scss">
.billing-data {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    font-size: 12px;
    font-weight: 400;
  }
}

.edit-billing-data-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.payment-method-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0 1rem;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0 1rem 1rem 1rem;
    }
  }
}
</style>
