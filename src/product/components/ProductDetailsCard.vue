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
            @click="selectedColor = color.name"
            :aria-label="color.name"
          />
        </div>
        <Separator />
        <CardDescription>Talles</CardDescription>
        <div class="sizes-container">
          <Button
            v-for="size in sizes"
            :key="size"
            variant="outline"
            :class="{ 'bg-gray-200': selectedSize === size }"
            @click="selectedSize = size"
          >
            {{ size }}
          </Button>
        </div>
        <Separator />
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          class="add-to-cart-button"
          @click="addToCart"
        >
          Agregar al carrito
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
import { ref } from 'vue'
import { useToast } from '@/ui'

const props = defineProps<{
  name: string
  price: number
  description: string
  colors: {
    name: string
    hex: string
  }[]
  sizes: string[]
  saved: boolean
}>()

const selectedSize = ref('')
const selectedColor = ref(props.colors[0].name)
const { toast } = useToast()

const emit = defineEmits<{
  (e: "addToCart", size: string, color: string): void
}>()

const addToCart = () => {
  if (!selectedSize.value) {
    toast({
      title: "Tamaño no seleccionado",
      description: "Por favor, selecciona un tamaño antes de agregar al carrito",
      variant: "destructive",
      duration: 3000,
    });
    return;
  }

  emit("addToCart", selectedSize.value, selectedColor.value);

  toast({
    title: "Producto agregado al carrito",
    description: `Se ha agregado "${props.name}" al carrito`,
    variant: "default",
    duration: 3000,
  });

  selectedSize.value = "";
}
</script>

<style scoped lang="scss">
.fill-bookmark {
  fill: #10172a;
}

.product-details-card {
  min-width: 400px;
  max-width: 500px;

  > :first-child {
    filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3));

    @media (max-width: 768px) {
      filter: none;
      border-radius: 0;
    }
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
  box-sizing: border-box;
  position: relative;
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
