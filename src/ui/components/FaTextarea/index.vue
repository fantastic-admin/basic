<script setup lang="ts" generic="T extends string | number">
import type { HTMLAttributes } from 'vue'
import { Textarea } from './textarea'

defineOptions({
  name: 'FaTextarea',
})

const props = defineProps<{
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()

const value = defineModel<T>()
</script>

<template>
  <Textarea v-model="value" :disabled :class="props.class" />
</template>
