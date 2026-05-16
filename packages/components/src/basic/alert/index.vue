<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AlertVariants } from './alert'
import Icon from '../icon/index.vue'
import { Alert, AlertDescription, AlertTitle } from './alert'

defineOptions({
  name: 'BuiltInAlert',
})

const props = defineProps<{
  icon?: string
  title?: string
  description?: string
  variant?: AlertVariants['variant']
  class?: HTMLAttributes['class']
}>()

defineSlots<{
  description: () => any
}>()
</script>

<template>
  <Alert
    :variant="variant"
    :class="[
      icon && 'grid-cols-[calc(var(--spacing)*4)_1fr] gap-x-3 [&>[data-slot=alert-icon]]:(size-4 translate-y-0.5 text-current)',
      props.class,
    ]"
  >
    <Icon v-if="icon" data-slot="alert-icon" :name="icon" />
    <AlertTitle v-if="title">
      {{ title }}
    </AlertTitle>
    <AlertDescription v-if="$slots.description || description">
      <slot name="description">
        {{ description }}
      </slot>
    </AlertDescription>
  </Alert>
</template>
