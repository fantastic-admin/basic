<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Progress } from './progress'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const modelValue = defineModel<number>({
  default: 0,
})
</script>

<template>
  <Progress v-bind="props" :model-value="modelValue" />
</template>
