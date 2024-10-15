<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  AccordionHeader,
  AccordionTrigger,
  type AccordionTriggerProps,
} from 'radix-vue'
import { CheckIcon } from '@radix-icons/vue'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionTriggerProps & {
  class?: HTMLAttributes['class'],
  isSelected?: boolean,
  customIcon?: any // Tipo 'any' para permitir cualquier componente de icono
}>()

const delegatedProps = computed(() => {
  const { class: _, isSelected: __, customIcon: ___, ...delegated } = props
  return delegated
})
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      v-bind="delegatedProps"
      :class="cn(
        'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all',
        props.class,
      )"
    >
      <slot />
      <slot name="icon">
        <component
          :is="props.customIcon || CheckIcon"
          v-if="props.isSelected"
          class="h-6 w-6 shrink-0 text-green-500"
        />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>