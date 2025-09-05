<script setup lang="ts">
import type { CheckboxRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import { Checkbox } from './checkbox'

defineOptions({
  name: 'FaCheckbox',
})

const props = defineProps<{
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()

const value = defineModel<CheckboxRootProps['modelValue']>()

const id = useId()
</script>

<template>
  <div :class="cn('flex-center-start gap-2', props.class)">
    <Checkbox :id v-model="value" :disabled />
    <label :for="id" class="cursor-pointer text-sm empty:hidden">
      <slot />
    </label>
  </div>
</template>
