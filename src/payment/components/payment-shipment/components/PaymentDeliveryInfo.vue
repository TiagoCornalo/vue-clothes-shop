<template>
  <form @submit="onSubmit">
    <form @submit.prevent="onSubmit">
      <FormField
        name="name"
        v-slot="{ field }"
      >
        <FormItem>
          <FormLabel>Nombre</FormLabel>
          <FormControl>
            <Input
              v-bind="field"
              placeholder="Ingrese su nombre"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Repite para los demás campos -->
      <!-- Ejemplo para 'lastName' -->

      <FormField
        name="lastName"
        v-slot="{ field }"
      >
        <FormItem>
          <FormLabel>Apellido</FormLabel>
          <FormControl>
            <Input
              v-bind="field"
              placeholder="Ingrese su apellido"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Continúa con 'document', 'email', etc. -->

      <Button type="submit">Continuar</Button>
    </form>
  </form>
</template>


<script setup lang="ts">
import { defineProps, defineEmits, reactive } from 'vue';
import { ShipmentInfo } from '@/types';
import { useForm } from 'vee-validate';
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';



const formSchema = toTypedSchema(
  z.object({
    name: z.string().nonempty({ message: 'Por favor, ingrese su nombre' }),
    lastName: z.string().nonempty({ message: 'Por favor, ingrese su apellido' }),
    document: z.string().nonempty({ message: 'Por favor, ingrese su documento' }),
    email: z.string().email({ message: 'Debe ser un correo electrónico válido' }),
    phone: z.string().nonempty({ message: 'Por favor, ingrese su teléfono' }),
    street: z.string().nonempty({ message: 'Por favor, ingrese su calle' }),
    streetNumber: z.string().nonempty({ message: 'Por favor, ingrese su número de calle' }),
    floor: z.string().optional(),
    apartment: z.string().optional(),
    zipCode: z.string().nonempty({ message: 'Por favor, ingrese su código postal' }),
    city: z.string().nonempty({ message: 'Por favor, ingrese su ciudad' }),
    province: z.string().nonempty({ message: 'Por favor, ingrese su provincia' }),
    type: z.literal('delivery'),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
});

const emits = defineEmits(['update:modelValue']);

const localShipmentInfo = reactive({ ...props.modelValue });

const onSubmit = handleSubmit((values) => {
  console.log('Formulario enviado:', values);
  // Aquí puedes emitir los valores al componente padre o realizar otras acciones
  emits('update:modelValue', values);
});
</script>
