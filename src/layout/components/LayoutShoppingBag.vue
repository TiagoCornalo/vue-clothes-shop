<template>
  <div class="shopping-bag-container">
    <Toaster />
    <Sheet>
      <SheetTrigger>
        <Button
          variant="ghost"
          class="fixed top-8 right-8 z-50 p-4"
        >
          <ShoppingBag class="text-[#3b3a3a]" />
          <div
            v-if="itemCount > 0"
            class="absolute -top-2 -right-2 bg-transparent text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
          >
            {{ itemCount }}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent class="overflow-y-auto">
        <SheetHeader class="py-4">
          <SheetTitle>
            {{ itemCount > 0 ? 'Tu cesta' : 'Tu cesta está vacía' }}
          </SheetTitle>
          <SheetDescription>
            <template v-if="itemCount === 0">
              Los artículos que añadas se mostrarán aquí.
            </template>
            <template v-else>
              Tienes {{ itemCount }} artículo{{ itemCount > 1 ? 's' : '' }} en tu cesta.
            </template>
          </SheetDescription>
        </SheetHeader>
        <div class="products-container">
          <ProductShoppingBagCard
            v-for="item in items"
            :key="item.id"
            :id="item.id"
            :slug="item.slug"
            :image="item.image"
            :name="item.name"
            :price="item.price"
            :category="item.category"
            :color="item.color"
            :size="item.size"
            :quantity="item.quantity"
          />
        </div>
        <SheetFooter class="sticky bottom-[-30px] bg-white py-4">
          <router-link
            to="/checkout"
            class="w-full"
          >
            <Button class="w-full pink-button">
              Finalizar compra
            </Button>
          </router-link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script setup lang="ts">
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  Button
} from '@/ui'
import { ProductShoppingBagCard } from '@/product/components'
import { ShoppingBag } from 'lucide-vue-next'
import { useShoppingBagStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { Toaster } from '@/ui'

const shoppingBagStore = useShoppingBagStore()
const { items } = storeToRefs(shoppingBagStore)

const itemCount = computed(() => items.value.length)
</script>

<style scoped>
.shopping-bag-container {
  position: fixed;
  padding: 2rem 0 0 2rem;
  top: 0;
  left: 0;
  z-index: 50;
}

.products-container {
  display: flex;
  flex-direction: column;
}
</style>