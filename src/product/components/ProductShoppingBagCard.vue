<template>
  <div class="product-card">
    <div
      class="product-card-header"
      v-bind:style="{ backgroundImage: `url(${image})` }"
    ></div>
    <div class="product-card-body">
      <h3 class="product-card-title">{{ name }}</h3>
      <p class="product-card-description">
        <span class="product-card-description-item">$ {{ price * quantity }}</span>
        <span class="product-card-description-item"> | </span>
        <span class="product-card-description-item">{{ capitalize(color) }}</span>
        <span class="product-card-description-item"> | </span>
        <span class="product-card-description-item">{{ size }}</span>
      </p>
      <NumberField
        :min="0"
        :max="availableStock"
        :model-value="quantity"
        @update:model-value="handleQuantityChange"
        class="w-[50%]"
      >
        <NumberFieldContent>
          <NumberFieldDecrement class="bg-primary text-primary-foreground shadow pink-button" />
          <NumberFieldInput
            ref="numberInput"
            :autofocus="false"
            @focus="removeFocus"
          />
          <NumberFieldIncrement class="bg-primary text-primary-foreground shadow pink-button" />
        </NumberFieldContent>
      </NumberField>
    </div>
    <AlertDialog
      :open="showRemoveDialog"
      @update:open="showRemoveDialog = $event"
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de querer eliminar este producto?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="cancelRemove">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            @click="confirmRemove"
            class="pink-button"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { useShoppingBagStore } from '@/store'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/ui'
import { capitalize } from '@/utils'
import { nextTick, onMounted, onUpdated, ref, computed } from 'vue';
import { useToast } from '@/ui';

const { toast } = useToast();

const props = defineProps<{
  id: number
  slug: string
  image: string
  color: string
  size: string
  name: string
  price: number
  category: string
  quantity: number
}>()

const shoppingBagStore = useShoppingBagStore()

const numberInput = ref<InstanceType<typeof NumberFieldInput> | null>(null);
const showRemoveDialog = ref(false)
const pendingQuantity = ref(props.quantity)


const availableStock = computed(() => {
  // Aquí deberías obtener el stock actual del producto desde el backend
  // Por ahora, usaremos un valor fijo de 10 como ejemplo
  const totalStock = 10
  const quantityInCart = shoppingBagStore.getItemQuantity(props.id, props.color, props.size)
  return totalStock - quantityInCart + props.quantity
})

const handleQuantityChange = (newQuantity: number) => {
  if (newQuantity === 0) {
    showRemoveDialog.value = true
    pendingQuantity.value = 0
  } else if (newQuantity > availableStock.value) {
    toast({
      title: 'Stock insuficiente',
      description: `Solo hay ${availableStock.value} unidades disponibles`,
      variant: 'destructive',
      duration: 3000
    })
  } else {
    updateQuantity(newQuantity)
  }
}


const updateQuantity = (newQuantity: number) => {
  shoppingBagStore.updateItemQuantity({
    id: props.id,
    color: props.color,
    size: props.size,
    quantity: newQuantity
  })
}

const cancelRemove = () => {
  showRemoveDialog.value = false
  pendingQuantity.value = props.quantity
}

const confirmRemove = () => {
  updateQuantity(0)
  showRemoveDialog.value = false
}

const removeFocus = () => {
  nextTick(() => {
    if (numberInput.value && numberInput.value.$el instanceof HTMLElement) {
      numberInput.value.$el.blur();
    }
  });
};

onMounted(removeFocus);
onUpdated(removeFocus);
</script>

<style scoped>
.product-card {
  max-width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
  text-decoration: none;
  color: inherit;
}

.product-card-header {
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
}

.product-card-body {
  padding: 1rem;
}

.product-card-title {
  font-size: 1rem;
  font-weight: bold;
}

.product-card-description {
  font-size: 0.875rem;
  color: #555;
  padding: 1rem 0;
}

.product-card-description-item {
  margin-right: 0.5rem;
}
</style>
