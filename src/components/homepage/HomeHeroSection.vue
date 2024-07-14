<template>
  <Hero hero-image="https://res.cloudinary.com/dopgj4dbg/image/upload/v1715629379/fhrb3ller7oexscdcj1d.jpg">
    <h3 class="text-sm font-bold text-white drop-shadow-md animate text-center">
      SPRING SUMMER '24
    </h3>
    <h1 class="text-7xl font-bold text-white drop-shadow-md py-4 animate text-center">
      New Arrivals
    </h1>
    <p class="text-white drop-shadow-md animate text-center">
      Shop the latest collection of our hand-picked pieces.
    </p>
    <Button
      variant="ghost"
      class="mt-8 animate"
      @click="goToNextSection"
    >
      <ChevronDown class="h-6 w-6" />
    </Button>
  </Hero>
</template>

<script setup lang="ts">
import { Hero, Button } from '@/components'
import { ChevronDown } from "lucide-vue-next"

const goToNextSection = () => {
  const nextSection = document.querySelector('.collection-section')
  nextSection?.scrollIntoView({ behavior: 'smooth' })
}
</script>
