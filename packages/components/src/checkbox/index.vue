<script setup lang="ts">
import type { CheckboxRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '../../utils'
import { Label } from '../label/label'
import { Checkbox } from './checkbox'

defineOptions({
  name: 'FaCheckbox',
})

const props = defineProps<{
  id?: string
  disabled?: boolean
  class?: HTMLAttributes['class']
  itemClass?: HTMLAttributes['class']
  labelClass?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
  change: [value: CheckboxRootProps['modelValue'] | undefined]
}>()

const value = defineModel<CheckboxRootProps['modelValue']>()
const generatedId = useId()
const checkboxId = computed(() => props.id || generatedId)

watch(value, (newValue) => {
  emit('change', newValue)
})
</script>

<template>
  <div :class="cn('flex-center-start gap-2', props.class)">
    <Checkbox :id="checkboxId" v-model="value" :disabled="disabled" :class="props.itemClass" />
    <Label
      :for="checkboxId"
      :class="
        cn(
          'text-sm cursor-pointer empty:hidden',
          props.disabled && 'cursor-not-allowed opacity-60',
          props.labelClass,
        )
      "
    >
      <slot />
    </Label>
  </div>
</template>
