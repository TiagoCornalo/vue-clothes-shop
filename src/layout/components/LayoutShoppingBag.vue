<template>
  <div class="shopping-bag-container">
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
      <SheetContent>
        <SheetHeader>
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
        <div class="flex flex-col gap-4">
          <ProductCard
            v-for="item in items"
            :key="item.id"
            :id="item.id"
            :slug="item.slug"
            :image="item.images[0]"
            :name="item.name"
            :price="item.price"
            :category="item.category"
            :color="item.color"
            :size="item.size"
            :quantity="item.quantity"
          />
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  Button
} from '@/ui'
import { ProductCard } from '@/product/components'
import { ShoppingBag } from 'lucide-vue-next'
import { useShoppingBagStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const shoppingBagStore = useShoppingBagStore()
const { items } = storeToRefs(shoppingBagStore)

const itemCount = computed(() => items.value.length)
</script>

<style scoped>
.shopping-bag-container {
  position: relative;
}
</style>
