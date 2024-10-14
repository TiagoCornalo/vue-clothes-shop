<template>
  <div
    class="checkout-product-table"
    v-if="!isMobile"
  >
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="table-header text-left">Producto</TableHead>
          <TableHead class="table-header text-center">Precio</TableHead>
          <TableHead class="table-header text-center">Cantidad</TableHead>
          <TableHead class="table-header text-center">Subtotal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="item in items"
          :key="`${item.id}-${item.color}-${item.size}`"
          class="min-h-32"
        >
          <TableCell>
            <div class="flex items-center space-x-3">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-24 h-32 object-cover"
              />
              <div>
                <div class="font-bold">{{ item.name }}</div>
                <div class="text-sm opacity-50">{{ item.color }} | {{ item.size }}</div>
              </div>
            </div>
          </TableCell>
          <TableCell class="text-center">${{ item.price.toFixed(2) }}</TableCell>
          <TableCell class="flex items-center justify-center h-36">
            <NumberField
              :min="0"
              :max="getAvailableStock(item)"
              :model-value="item.quantity"
              @update:model-value="(newQuantity) => handleQuantityChange(item, newQuantity)"
              class="w-36"
            >
              <NumberFieldContent>
                <NumberFieldDecrement class="bg-primary text-primary-foreground shadow pink-button" />
                <NumberFieldInput />
                <NumberFieldIncrement class="bg-primary text-primary-foreground shadow pink-button" />
              </NumberFieldContent>
            </NumberField>
          </TableCell>
          <TableCell class="text-center">${{ (item.price * item.quantity).toFixed(2) }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <div class="checkout-product-table__continue-shopping">
      <Button
        class="w-full pink-button"
        @click="continueShopping"
      >
        CONTINUAR COMPRANDO
      </Button>
    </div>
  </div>
  <div
    v-else
    class="table-mobile"
    v-for="item in items"
    :key="`${item.id}-${item.color}-${item.size}`"
  >
    <div class="table-mobile__item">
      <div class="table-mobile__image">
        <img
          :src="item.image"
          :alt="item.name"
          class="w-24 h-32 object-cover"
        />
      </div>
      <div class="table-mobile__info">
        <router-link
          :to="`/${item.category}/${item.slug}-${item.id}`"
          class="table-mobile__info-name"
        >
          {{ item.name }}
        </router-link>
        <span class="table-mobile__info-color">{{ item.color }} | {{ item.size }}</span>
        <span class="table-mobile__info-price">${{ item.price.toFixed(2) }}</span>
        <div class="table-mobile__info-quantity">
          <NumberField
            :min="0"
            :max="getAvailableStock(item)"
            :model-value="item.quantity"
            @update:model-value="(newQuantity) => handleQuantityChange(item, newQuantity)"
            class="w-36"
          >
            <NumberFieldContent>
              <NumberFieldDecrement class="bg-primary text-primary-foreground shadow pink-button" />
              <NumberFieldInput />
              <NumberFieldIncrement class="bg-primary text-primary-foreground shadow pink-button" />
            </NumberFieldContent>
          </NumberField>
        </div>
      </div>
      <span class="table-mobile__total">
        ${{ (item.price * item.quantity).toFixed(2) }}
      </span>
    </div>
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
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
  AlertDialogAction,
  Button
} from '@/ui';
import { useToast } from '@/ui';
import { ShoppingBagItem } from '@/types';
import { useShoppingBagStore } from '@/store';
import { ref } from 'vue';
import { useMobileDetection } from '@/composables';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps<{
  items: ShoppingBagItem[];
}>();

const { isMobile } = useMobileDetection();
const shoppingBagStore = useShoppingBagStore();
const { toast } = useToast();

const showRemoveDialog = ref(false);
const itemToRemove = ref<ShoppingBagItem | null>(null);

const continueShopping = () => {
  router.back();
};

const getAvailableStock = (item: ShoppingBagItem) => {
  // Aquí deberías obtener el stock actual del producto desde el backend
  // Por ahora, usaremos un valor fijo de 10 como ejemplo
  const totalStock = 10;
  const quantityInCart = shoppingBagStore.getItemQuantity(item.id, item.color, item.size);
  return totalStock - quantityInCart + item.quantity;
};

const handleQuantityChange = (item: ShoppingBagItem, newQuantity: number) => {
  if (newQuantity === 0) {
    showRemoveDialog.value = true;
    itemToRemove.value = item;
  } else if (newQuantity > getAvailableStock(item)) {
    toast({
      title: 'Stock insuficiente',
      description: `Solo hay ${getAvailableStock(item)} unidades disponibles`,
      variant: 'destructive',
      duration: 3000
    });
  } else {
    updateQuantity(item, newQuantity);
  }
};

const updateQuantity = (item: ShoppingBagItem, newQuantity: number) => {
  shoppingBagStore.updateItemQuantity({
    id: item.id,
    color: item.color,
    size: item.size,
    quantity: newQuantity
  });
};

const cancelRemove = () => {
  showRemoveDialog.value = false;
  itemToRemove.value = null;
};

const confirmRemove = () => {
  if (itemToRemove.value) {
    updateQuantity(itemToRemove.value, 0);
  }
  showRemoveDialog.value = false;
  itemToRemove.value = null;
};
</script>

<style scoped lang="scss">
.checkout-product-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
}

.table-header {
  font-weight: bold;
  font-size: 0.875rem;
}

.table-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.table-mobile__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem 1rem 1rem;
}

.table-mobile__info {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  &-name {
    font-size: 12px;
    font-weight: 500;
  }

  &-color {
    font-size: 11px;
    font-weight: 400;
  }

  &-price {
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
