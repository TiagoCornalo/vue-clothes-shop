<template>
  <form @submit.prevent="submitForm">
    <Card class="rounded-none">
      <CardHeader>
        <CardTitle class="text-[18px]">
          Información de facturación
        </CardTitle>
        <CardDescription class="text-[18px]">
          Datos personales
        </CardDescription>
      </CardHeader>
      <CardContent class="billing-data-content">
        <div>
          <Label
            for="name"
            class="text-[12px]"
          >
            Nombre <span class="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            v-model="billingData.name"
            :value="billingData.name"
            class="mt-4"
            placeholder="Ej. Juan"
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
            v-model="billingData.lastName"
            :value="billingData.lastName"
            class="mt-4"
            placeholder="Ej. Pérez"
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
            v-model="billingData.document"
            :value="billingData.document"
            class="mt-4"
            placeholder="Ej. 27789456"
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
            v-model="billingData.phone"
            :value="billingData.phone"
            class="mt-4"
            placeholder="Ej. 3794567890"
          />
          <p
            v-if="errors.phone"
            class="text-red-500 text-sm mt-1"
          >{{ errors.phone }}</p>
        </div>
      </CardContent>
    </Card>
    <Separator class="w-full bg-gray-300" />
    <Card class="rounded-none">
      <CardHeader>
        <CardTitle class="text-[18px]">
          Dirección de facturación
        </CardTitle>
      </CardHeader>
      <CardContent class="billing-data-content">
        <div>
          <Label
            for="street"
            class="text-[12px]"
          >
            Calle <span class="text-red-500">*</span>
          </Label>
          <Input
            id="street"
            v-model="billingData.street"
            :value="billingData.street"
            class="mt-4"
            placeholder="Ej. Alem 1234"
          />
          <p
            v-if="errors.street"
            class="text-red-500 text-sm mt-1"
          >{{ errors.street }}</p>
        </div>
        <div>
          <Label
            for="number"
            class="text-[12px]"
          >
            Número <span class="text-red-500">*</span>
          </Label>
          <Input
            id="number"
            v-model="billingData.number"
            :value="billingData.number"
            class="mt-4"
            placeholder="Ej. 1234"
          />
          <p
            v-if="errors.number"
            class="text-red-500 text-sm mt-1"
          >{{ errors.number }}</p>
        </div>
        <div>
          <Label
            for="floor"
            class="text-[12px]"
          >
            Piso
          </Label>
          <Input
            id="floor"
            v-model="billingData.floor"
            :value="billingData.floor"
            class="mt-4"
            placeholder="Ej. 1"
          />
        </div>
        <div>
          <Label
            for="apartment"
            class="text-[12px]"
          >
            Departamento
          </Label>
          <Input
            id="apartment"
            v-model="billingData.apartment"
            :value="billingData.apartment"
            class="mt-4"
            placeholder="Ej. A"
          />
        </div>
        <div>
          <Label
            for="postalCode"
            class="text-[12px]"
          >
            Código postal <span class="text-red-500">*</span>
          </Label>
          <Input
            id="postalCode"
            v-model="billingData.postalCode"
            :value="billingData.postalCode"
            class="mt-4"
            placeholder="Ej. 1234"
          />
          <p
            v-if="errors.postalCode"
            class="text-red-500 text-sm mt-1"
          >{{ errors.postalCode }}</p>
        </div>
        <div>
          <Label
            for="state"
            class="text-[12px]"
          >
            Provincia <span class="text-red-500">*</span>
          </Label>
          <Select
            id="state"
            v-model="selectedState"
            :value="selectedState"
          >
            <SelectTrigger class="mt-4">
              <SelectValue placeholder="Selecciona una provincia" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="state in states"
                  :key="state.id"
                  :value="state.nombre"
                >
                  {{ state.nombre }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p
            v-if="errors.state"
            class="text-red-500 text-sm mt-1"
          >{{ errors.state }}</p>
        </div>

        <div>
          <Label
            for="city"
            class="text-[12px]"
          >
            Ciudad <span class="text-red-500">*</span>
          </Label>
          <Select
            id="city"
            v-model="billingData.city"
            :value="billingData.city"
          >
            <SelectTrigger class="mt-4">
              <SelectValue placeholder="Selecciona una ciudad" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="city in cities"
                  :key="city.id"
                  :value="city.nombre"
                >
                  {{ city.nombre }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p
            v-if="errors.city"
            class="text-red-500 text-sm mt-1"
          >{{ errors.city }}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          class="w-full pink-button"
        >
          Continuar
        </Button>
      </CardFooter>
    </Card>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Label,
  Input,
  Separator,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  useToast
} from '@/ui';
import { getArgentinaStates, getArgentinaCities, Province, City } from '@/services';
import { useCheckoutStore } from '@/store';

const emit = defineEmits<{
  (event: 'change-step', step: 'form' | 'summary'): void
}>();

const { billingDataInfo, setBillingData } = useCheckoutStore();
const { toast } = useToast()

const states = ref<Province[]>([]);
const selectedState = ref<string>('');
const cities = ref<City[]>([]);

const billingData = reactive({
  name: '',
  lastName: '',
  document: '',
  phone: '',
  street: '',
  number: '',
  floor: '',
  apartment: '',
  postalCode: '',
  state: selectedState,
  city: '',
});

const errors = reactive({
  name: '',
  lastName: '',
  document: '',
  phone: '',
  street: '',
  number: '',
  postalCode: '',
  state: '',
  city: '',
});

const validateForm = () => {
  let isValid = true;

  errors.name = billingData.name ? '' : 'Debe ingresar un nombre';
  errors.lastName = billingData.lastName ? '' : 'Debe ingresar un apellido';
  errors.document = billingData.document ? '' : 'Debe ingresar un documento';
  errors.phone = billingData.phone ? '' : 'Debe ingresar un teléfono';
  errors.street = billingData.street ? '' : 'Debe ingresar una calle';
  errors.number = billingData.number ? '' : 'Debe ingresar un número';
  errors.postalCode = billingData.postalCode ? '' : 'Debe ingresar un código postal';
  errors.state = billingData.state ? '' : 'Debe seleccionar una provincia';
  errors.city = billingData.city ? '' : 'Debe seleccionar una ciudad';

  for (const key in errors) {
    if (errors[key as keyof typeof errors]) {
      isValid = false;
    }
  }

  return isValid;
};

const submitForm = () => {
  if (validateForm()) {
    setBillingData(billingData);
    emit('change-step', 'summary');
  } else {
    toast({
      title: 'Error',
      description: 'Por favor, complete todos los campos requeridos.',
      variant: 'destructive'
    });
  }
};


watch(selectedState, async (newState) => {
  if (newState) {
    const selectedProvince = states.value.find(
      (province) => province.nombre === newState
    );
    if (selectedProvince) {
      cities.value = await getArgentinaCities(selectedProvince.id);
      billingData.state = newState;
    }
  } else {
    cities.value = [];
    billingData.city = "";
    billingData.state = "";
  }
});


onMounted(async () => {
  const result = await getArgentinaStates();
  states.value = result as Province[];

  if (billingDataInfo) {
    Object.assign(billingData, billingDataInfo);
    selectedState.value = billingData.state;

    if (selectedState.value) {
      const selectedProvince = states.value.find(
        (province) => province.nombre === selectedState.value
      );
      if (selectedProvince) {
        cities.value = await getArgentinaCities(selectedProvince.id);
      }
    }

    billingData.city = billingDataInfo.city;
  }
});
</script>

<style scoped lang="scss">
.billing-data-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
</style>
