<template>
  <div class="product-details-card">
    <Card class="relative">
      <CardHeader>
        <CardTitle>{{ name }}</CardTitle>
        <CardTitle>$ {{ price }}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          class="absolute right-4 top-4"
        >
          <Bookmark
            class="h-6 w-6"
            :class="{ 'fill-bookmark': saved }"
          />
        </Button>
      </CardHeader>
      <CardContent class="product-content">
        <CardDescription>
          {{ description }}
        </CardDescription>
        <Separator />
        <CardDescription>
          Color: {{ capitalize(selectedColor) }}
        </CardDescription>
        <div class="colors-container">
          <Button
            v-for="color in colors"
            :key="color.name"
            variant="outline"
            class="color-button"
            :style="{ backgroundColor: color.hex }"
            @click="$emit('update:selected-color', color.name)"
            :aria-label="color.name"
          >
            <div :class="{ 'selected-color': selectedColor === color.name }" />
          </Button>
        </div>
        <Separator />
        <CardDescription>Talles</CardDescription>
        <div class="sizes-container">
          <Button
            v-for="size in availableSizes"
            :key="size.size"
            variant="outline"
            :class="{ 'bg-gray-200': selectedSize === size.size }"
            @click="$emit('update:selected-size', size.size)"
          >
            {{ size.size }}
          </Button>
        </div>
        <Separator />
      </CardContent>
      <CardFooter>
        <Button
          class="add-to-cart-button pink-button"
          @click="$emit('add-to-cart')"
        >
          Agregar a la cesta
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
  Button
} from '@/ui'
import { capitalize } from '@/utils'
import { Bookmark } from 'lucide-vue-next'
import { Size } from '@/types'

defineProps<{
  name: string
  price: number
  description: string
  colors: {
    name: string
    hex: string
    sizes: {
      size: string
      quantity: number
    }[]
  }[]
  saved: boolean
  selectedSize: string
  selectedColor: string
  availableSizes: Size[]
}>()

defineEmits<{
  (e: "update:selected-size", size: string): void
  (e: "update:selected-color", color: string): void
  (e: "add-to-cart"): void
}>()
</script>

<style scoped lang="scss">
.fill-bookmark {
  fill: #10172a;
}

.product-details-card {
  min-width: 300px;
  max-width: 500px;

  > :first-child {
    filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3));

    @media (max-width: 768px) {
      filter: none;
      border-radius: 0;
    }
  }

  @media (max-width: 975px) {
    min-width: 100%;
  }
}

.product-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.colors-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24px, 1fr));
  gap: 16px;
  width: 50%;
}

.color-button {
  width: 24px;
  height: 24px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 0;
  box-sizing: border-box;
  position: relative;
}

.selected-color {
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #10172a;
}

.sizes-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
}

.add-to-cart-button {
  width: 100%;
}
</style>
