<script setup lang="ts">
import { cn } from '@/utils'

defineOptions({
  name: 'FaDivider',
})

defineProps<{
  position?: 'start' | 'end'
}>()

const slots = defineSlots<{
  default?: () => VNode
}>()
</script>

<template>
  <div
    :class="cn('my-4 w-full flex-center whitespace-nowrap text-sm font-500 after:(h-px w-full min-w-4 bg-border content-empty) before:(h-px w-full min-w-4 bg-border content-empty)', {
      'before:(flex-basis-0)': position === 'start',
      'after:(flex-basis-0)': position === 'end',
      'gap-4': !!slots.default,
    })"
  >
    <slot />
  </div>
</template>
