<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/utils'

const props = defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>()
const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <Primitive v-bind="forwardedProps" :class="cn('flex items-center', props.class)">
    <slot />
  </primitive>
</template>
