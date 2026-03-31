<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Label } from './label'

defineOptions({
  name: 'FaLabel',
})

const props = defineProps<{
  label?: string
  labelWidth?: string | number
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Label :class="props.class">
    <div v-if="props.label" class="text-muted-foreground text-nowrap" :style="{ width: props.labelWidth ? (typeof props.labelWidth === 'number' ? `${props.labelWidth}px` : props.labelWidth) : undefined }">
      {{ props.label }}
    </div>
    <slot />
  </Label>
</template>
