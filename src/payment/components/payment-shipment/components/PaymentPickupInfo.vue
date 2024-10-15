<template>
  <form @submit.prevent="submitForm">
    <Card class="rounded-none">
      <CardHeader>
        <CardTitle class="text-[18px]">Ingresá tu correo</CardTitle>
        <CardDescription class="text-[12px]">
          Para continuar con tu compra y recibir el resumen
        </CardDescription>
      </CardHeader>
      <CardContent class="email-container">
        <Label
          for="email"
          class="text-[12px]"
        >
          Correo electrónico <span class="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          v-model="localShipmentInfo.email"
          :value="localShipmentInfo.email"
          class="mt-4"
        />
        <p
          v-if="errors.email"
          class="text-red-500 text-sm mt-1"
        >{{ errors.email }}</p>
      </CardContent>
    </Card>

    <Card class="rounded-none mt-8 mb-8">
      <CardHeader>
        <CardTitle class="text-[18px]">
          Elegí la tienda para retirar tu pedido
          <span class="text-red-500">*</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center space-x-2">
          <Checkbox
            id="store"
            :checked="!!localShipmentInfo.store"
            @update:checked="updateStore"
          />
          <Label for="store">
            {{ storeAddress }}
          </Label>
        </div>
        <p
          v-if="errors.store"
          class="text-red-500 text-sm mt-1"
        >{{ errors.store }}</p>
      </CardContent>
    </Card>

    <Card class="rounded-none mt-8 mb-8">
      <CardHeader>
        <CardTitle class="text-[18px]">¿Quién retirará la orden?</CardTitle>
      </CardHeader>
      <CardContent class="payment-pickup-info">
        <div>
          <Label
            for="name"
            class="text-[12px]"
          >
            Nombre <span class="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            v-model="localShipmentInfo.name"
            class="mt-4"
            placeholder="Ej. Juan"
            :value="localShipmentInfo.name"
          />
          <p
            v-if="errors.name"
            class="text-red-500 text-sm mt-1"
          >{{ errors.name }}</p>
        </div>
        <div>
          <Label
            for="lastName"
            class="text-[12px]"
          >
            Apellido <span class="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            v-model="localShipmentInfo.lastName"
            class="mt-4"
            placeholder="Ej. Perez"
            :value="localShipmentInfo.lastName"
          />
          <p
            v-if="errors.lastName"
            class="text-red-500 text-sm mt-1"
          >{{ errors.lastName }}</p>
        </div>
        <div>
          <Label
            for="document"
            class="text-[12px]"
          >
            Documento <span class="text-red-500">*</span>
          </Label>
          <Input
            id="document"
            v-model="localShipmentInfo.document"
            class="mt-4"
            placeholder="Ej. 27123456"
            :value="localShipmentInfo.document"
          />
          <p
            v-if="errors.document"
            class="text-red-500 text-sm mt-1"
          >{{ errors.document }}</p>
        </div>
        <div>
          <Label
            for="phone"
            class="text-[12px]"
          >
            Teléfono <span class="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            v-model="localShipmentInfo.phone"
            class="mt-4"
            placeholder="Ej. 3794712345"
            :value="localShipmentInfo.phone"
          />
          <p
            v-if="errors.phone"
            class="text-red-500 text-sm mt-1"
          >{{ errors.phone }}</p>
        </div>
      </CardContent>
      <CardFooter class="flex justify-end">
        <Button
          type="submit"
          class="pink-button"
        >
          Confirmar
        </Button>
      </CardFooter>
    </Card>
  </form>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useCheckoutStore } from '@/store';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  Input,
  Label,
  Checkbox,
  Button,
  useToast
} from '@/ui';

const storeAddress = 'Paraguay 1054 1 A, Corrientes, Corrientes, 3400, Argentina';

const { pickupInfo, setPickupInfo } = useCheckoutStore()
const { toast } = useToast()

const emit = defineEmits(['change-step']);

const localShipmentInfo = reactive({
  name: '',
  lastName: '',
  document: '',
  email: '',
  phone: '',
  type: 'pickup',
  store: ''
});

const errors = reactive({
  name: '',
  lastName: '',
  document: '',
  email: '',
  phone: '',
  store: ''
});

const updateStore = (checked: boolean) => {
  localShipmentInfo.store = checked ? storeAddress : '';
};

const validateForm = () => {
  let isValid = true;

  errors.name = localShipmentInfo.name ? '' : 'Debe ingresar un nombre';
  errors.lastName = localShipmentInfo.lastName ? '' : 'Debe ingresar un apellido';
  errors.document = localShipmentInfo.document ? '' : 'Debe ingresar un documento';
  errors.email = localShipmentInfo.email ? '' : 'Debe ingresar un correo electrónico';
  errors.phone = localShipmentInfo.phone ? '' : 'Debe ingresar un teléfono';
  errors.store = localShipmentInfo.store ? '' : 'Debe seleccionar una tienda';

  for (const key in errors) {
    if (errors[key as keyof typeof errors]) {
      isValid = false;
    }
  }

  return isValid;
};

onMounted(() => {
  if (pickupInfo) {
    Object.assign(localShipmentInfo, pickupInfo);
  }
});

const submitForm = () => {
  if (validateForm()) {
    setPickupInfo({ ...localShipmentInfo });
    emit('change-step', 'payment');
  } else {
    toast({
      title: 'Error',
      description: 'Por favor, complete todos los campos requeridos.',
      variant: 'destructive'
    });
  }
};
</script>

<style scoped lang="scss">
.email-container {
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
}

.payment-pickup-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
</style>
