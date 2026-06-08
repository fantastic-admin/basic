<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '#utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div data-slot="table-container" class="h-full w-full relative overflow-auto">
    <table data-slot="table" :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>
