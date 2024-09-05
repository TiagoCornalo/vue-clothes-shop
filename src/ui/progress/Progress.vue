<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<ProgressRootProps & { class?: HTMLAttributes['class'], orientation?: 'horizontal' | 'vertical' }>(),
  {
    modelValue: 0,
    orientation: 'horizontal',
  },
)

const delegatedProps = computed(() => {
  const { class: _, orientation: __, ...delegated } = props

  return delegated
})

const isVertical = computed(() => props.orientation === 'vertical')
</script>

<template>
  <ProgressRoot
    v-bind="delegatedProps"
    :class="cn(
      'relative overflow-hidden rounded-full bg-primary/20',
      isVertical ? 'h-full w-1' : 'h-1 w-full',
      props.class,
    )
      "
  >
    <ProgressIndicator
      :class="cn(
        'flex-1 bg-primary transition-all',
        isVertical ? 'w-full h-full' : 'h-full w-full',
      )
        "
      :style="isVertical
        ? `transform: translateY(-${100 - (props.modelValue ?? 0)}%);`
        : `transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>
