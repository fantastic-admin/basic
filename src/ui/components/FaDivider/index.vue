<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'

defineOptions({
  name: 'FaDivider',
})

const props = defineProps<{
  position?: 'start' | 'end'
  class?: HTMLAttributes['class']
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
    }, props.class)"
  >
    <slot />
  </div>
</template>
