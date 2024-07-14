<template>
  <div class="fixed top-0 left-0 p-2 z-50">
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <Menu class="text-gray-800" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Button,
} from '@/components'
import { Menu } from 'lucide-vue-next'

</script>