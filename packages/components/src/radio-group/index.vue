<script setup lang="ts">
import type { AcceptableValue, RadioGroupRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '../../utils'
import { Label } from '../label/label'
import { RadioGroup, RadioGroupItem } from './radio-group'

interface RadioGroupOption {
  label: string
  value: AcceptableValue
  description?: string
  disabled?: boolean
  id?: string
}

defineOptions({
  name: 'FaRadioGroup',
})

const props = defineProps<{
  options: RadioGroupOption[]
  disabled?: RadioGroupRootProps['disabled']
  dir?: RadioGroupRootProps['dir']
  class?: HTMLAttributes['class']
  optionClass?: HTMLAttributes['class']
  itemClass?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
  change: [value: AcceptableValue | undefined]
}>()

const slots = defineSlots<{
  option?: (props: {
    option: RadioGroupOption
    checked: boolean
    disabled: boolean
    id: string
  }) => any
}>()

const value = defineModel<AcceptableValue | undefined>()
const baseId = useId()

watch(value, (newValue) => {
  emit('change', newValue)
})

function getOptionId(option: RadioGroupOption, index: number) {
  return option.id || `${baseId}-${index}`
}

function getOptionKey(option: RadioGroupOption, index: number) {
  if (option.id) {
    return option.id
  }

  return typeof option.value === 'string' || typeof option.value === 'number'
    ? option.value
    : index
}

function isOptionDisabled(option: RadioGroupOption) {
  return Boolean(props.disabled || option.disabled)
}

function isOptionChecked(option: RadioGroupOption) {
  return Object.is(value.value, option.value)
}
</script>

<template>
  <RadioGroup
    v-model="value"
    :disabled="disabled"
    :dir="dir"
    :class="props.class"
  >
    <div
      v-for="(option, index) in props.options"
      :key="getOptionKey(option, index)"
      :class="
        cn(
          'flex gap-2',
          option.description ? 'items-start' : 'items-center',
          props.optionClass,
        )
      "
    >
      <RadioGroupItem
        v-show="!slots.option"
        :id="getOptionId(option, index)"
        :value="option.value"
        :disabled="isOptionDisabled(option)"
        :class="props.itemClass"
      />
      <Label
        :for="getOptionId(option, index)"
        :class="
          cn(
            'min-w-0 flex-1 cursor-pointer gap-0',
            option.description ? 'items-start' : 'items-center',
            isOptionDisabled(option) && 'cursor-not-allowed opacity-60',
          )
        "
      >
        <slot
          :id="getOptionId(option, index)"
          name="option"
          :option="option"
          :checked="isOptionChecked(option)"
          :disabled="isOptionDisabled(option)"
        >
          <div class="gap-1 grid min-w-0">
            <span class="truncate">{{ option.label }}</span>
            <span
              v-if="option.description"
              class="text-xs text-muted-foreground leading-5 font-normal"
            >
              {{ option.description }}
            </span>
          </div>
        </slot>
      </Label>
    </div>
  </RadioGroup>
</template>
