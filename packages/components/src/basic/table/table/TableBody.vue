<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '#utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <tbody
    data-slot="table-body"
    :class="cn('[&_tr:last-child]:border-0 [&_tr:last-child]:shadow-[0_1px_0_0_oklch(var(--border))]', props.class)"
  >
    <slot />
  </tbody>
</template>
