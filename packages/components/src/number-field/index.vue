<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../utils'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from './number-field'

const props = defineProps<{
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()

const modelValue = defineModel<number>({
  required: true,
})
</script>

<template>
  <NumberField v-model="modelValue" :min="props.min" :max="props.max" :step="props.step" :disabled="props.disabled" :class="cn('w-[200px]', props.class)">
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
