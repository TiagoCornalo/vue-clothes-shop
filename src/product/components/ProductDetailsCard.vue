<template>
  <div class="product-details-card">
  <Card v-animate class="animate relative">
    <CardHeader>
      <CardTitle>{{ name }}</CardTitle>
      <CardTitle>$ {{ price }}</CardTitle>
      <Button variant="ghost" size="icon" class="absolute right-4 top-4">
        <Bookmark class="h-6 w-6" :class="{ 'fill-bookmark': saved }" />
      </Button>
    </CardHeader>
    <CardContent class="product-content">
      <CardDescription>
        {{ description }}
      </CardDescription>
      <Separator />
      <CardDescription>Sizes</CardDescription>
      <div class="sizes-container">
        <Button v-for="size in sizes" :key="size" variant="outline">
          {{ size }}
        </Button>
      </div>
      <Separator />
    </CardContent>
    <CardFooter>
      <Button variant="outline" class="add-to-cart-button">
        Agregar al carrito
      </Button>
    </CardFooter>
  </Card>
</div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Separator, Button } from '@/ui';
import { Bookmark } from 'lucide-vue-next';

defineProps<{
  name: string;
  price: number;
  description: string;
  sizes: string[];
  saved: boolean;
}>();

</script>

<style scoped>
.fill-bookmark {
  fill: #10172A
}

.product-details-card {
  max-width: 500px;
}

.product-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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