<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'
import { computed, ref } from 'vue'
import { cn } from '#utils'
import { Badge } from './badge'

defineOptions({
  name: 'BuiltInBadge',
})

const props = defineProps<{
  variant?: BadgeVariant['variant']
  value: string | number | boolean
  class?: HTMLAttributes['class']
  badgeClass?: HTMLAttributes['class']
}>()

const badgeDotVariant = cva(
  'absolute start-[100%] h-1.5 w-1.5 rounded-full px-0 ring-1 ring-background before:(absolute inset-0 bg-inherit block h-full w-full animate-ping rounded-full content-empty) -translate-x-[50%] -translate-y-[50%] rtl:(translate-x-[50%]) -indent-9999',
  {
    variants: {
      variant: {
        default:
          'bg-primary hover:bg-primary/80',
        secondary:
          'bg-secondary hover:bg-secondary/80',
        destructive:
          'bg-destructive hover:bg-destructive/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
type BadgeVariant = VariantProps<typeof badgeDotVariant>

const show = computed(() => {
  switch (typeof props.value) {
    case 'string':
      return props.value.length > 0
    case 'number':
      return props.value > 0
    case 'boolean':
      return props.value
    default:
      return props.value !== undefined && props.value !== null
  }
})

const transitionClass = ref({
  enterActiveClass: 'ease-in-out duration-500',
  enterFromClass: 'opacity-0',
  enterToClass: 'opacity-100',
  leaveActiveClass: 'ease-in-out duration-500',
  leaveFromClass: 'opacity-100',
  leaveToClass: 'opacity-0',
})
</script>

<template>
  <div :class="cn('relative inline-flex', props.class)">
    <slot />
    <Transition v-bind="transitionClass">
      <div v-if="show" class="h-full w-full absolute">
        <div v-if="value === true" :class="badgeDotVariant({ variant })" />
        <Badge v-else :variant :class="cn('absolute start-[50%] top-0 z-20 whitespace-nowrap px-1.5 py-0 ring-1 ring-primary-foreground -translate-y-[50%] hover:bg-none!', props.badgeClass)">
          {{ value }}
        </Badge>
      </div>
    </Transition>
  </div>
</template>
