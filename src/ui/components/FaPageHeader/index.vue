<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'

defineOptions({
  name: 'FaPageHeader',
})

const props = defineProps<{
  title?: string
  description?: string
  class?: HTMLAttributes['class']
  mainClass?: HTMLAttributes['class']
  defaultClass?: HTMLAttributes['class']
}>()

const slots = defineSlots<{
  title?: () => VNode
  description?: () => VNode
  default?: () => VNode
}>()
</script>

<template>
  <div :class="cn('mb-4 flex flex-wrap items-center justify-between gap-5 border-b bg-background px-5 py-4 transition-[background-color,border-color]', props.class)">
    <div :class="cn('flex-[1_1_70%]', props.mainClass)">
      <div class="text-2xl">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="mt-2 text-sm text-secondary-foreground/50 empty-hidden">
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>
    <div v-if="!!slots.default" :class="cn('ml-a flex-none', props.defaultClass)">
      <slot />
    </div>
  </div>
</template>
