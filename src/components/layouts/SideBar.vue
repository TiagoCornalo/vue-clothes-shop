<template>
  <Drawer >
    <DrawerTrigger @click="toggleDrawer">Open</DrawerTrigger>
    <DrawerContent :class="isOpen ? 'open' : 'closed'">
      <DrawerHeader>
        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
        <DrawerDescription>This action cannot be undone.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button>Submit</Button>
        <DrawerClose>
          <Button variant="outline">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components';
import { ref } from 'vue';

const isOpen = ref(false);

const toggleDrawer = () => {
  isOpen.value = !isOpen.value;
}

</script>

<style scoped>
.open {
  transform: translateY(-100%);
}

.closed {
  transform: translateY(0);
  transition: transform 300ms ease-in-out;
}

</style>