<script setup lang="ts">
import type { ToastTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ToastTitle } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/utils'

const props = defineProps<ToastTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastTitle v-bind="delegatedProps" :class="cn('text-sm font-semibold', props.class)">
    <slot />
  </ToastTitle>
</template>
