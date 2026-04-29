<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '../../utils'
import { Checkbox } from '../checkbox/checkbox'
import { Label } from '../label/label'

interface CheckboxGroupOption {
  label: string
  value: AcceptableValue
  description?: string
  disabled?: boolean
  id?: string
}

defineOptions({
  name: 'FaCheckboxGroup',
})

const props = defineProps<{
  options: CheckboxGroupOption[]
  disabled?: boolean
  min?: number
  max?: number
  dir?: 'ltr' | 'rtl'
  class?: HTMLAttributes['class']
  optionClass?: HTMLAttributes['class']
  itemClass?: HTMLAttributes['class']
  labelClass?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
  change: [value: AcceptableValue[]]
}>()

const slots = defineSlots<{
  option?: (props: {
    option: CheckboxGroupOption
    checked: boolean
    disabled: boolean
    id: string
  }) => any
}>()

const value = defineModel<AcceptableValue[]>({
  default: () => [],
})

const baseId = useId()
const checkedCount = computed(() => value.value.length)

watch(value, (newValue) => {
  emit('change', newValue)
})

function getOptionId(option: CheckboxGroupOption, index: number) {
  return option.id || `${baseId}-${index}`
}

function getOptionKey(option: CheckboxGroupOption, index: number) {
  if (option.id) {
    return option.id
  }

  return typeof option.value === 'string' || typeof option.value === 'number'
    ? option.value
    : index
}

function isOptionDisabled(option: CheckboxGroupOption) {
  if (props.disabled || option.disabled) {
    return true
  }

  const checked = isOptionChecked(option)

  if (checked && props.min !== undefined && checkedCount.value <= props.min) {
    return true
  }

  if (!checked && props.max !== undefined && checkedCount.value >= props.max) {
    return true
  }

  return false
}

function findOptionIndex(option: CheckboxGroupOption) {
  return value.value.findIndex(item => Object.is(item, option.value))
}

function isOptionChecked(option: CheckboxGroupOption) {
  return findOptionIndex(option) > -1
}

function updateOptionChecked(option: CheckboxGroupOption, checked: boolean) {
  const nextValue = [...value.value]
  const optionIndex = nextValue.findIndex(item => Object.is(item, option.value))

  if (checked) {
    if (optionIndex === -1) {
      nextValue.push(option.value)
    }
  }
  else if (optionIndex > -1) {
    nextValue.splice(optionIndex, 1)
  }

  value.value = nextValue
}

function handleOptionModelValueChange(option: CheckboxGroupOption, checked: boolean | 'indeterminate') {
  if (isOptionDisabled(option)) {
    return
  }

  updateOptionChecked(option, checked === true)
}

function handleCustomOptionClick(option: CheckboxGroupOption) {
  if (!slots.option || isOptionDisabled(option)) {
    return
  }

  updateOptionChecked(option, !isOptionChecked(option))
}

function handleCustomOptionKeydown(option: CheckboxGroupOption) {
  if (!slots.option || isOptionDisabled(option)) {
    return
  }

  updateOptionChecked(option, !isOptionChecked(option))
}
</script>

<template>
  <div
    role="group"
    :dir="dir"
    :class="cn('grid gap-3', props.class)"
  >
    <div
      v-for="(option, index) in props.options"
      :key="getOptionKey(option, index)"
      :tabindex="slots.option && !isOptionDisabled(option) ? 0 : undefined"
      :role="slots.option ? 'checkbox' : undefined"
      :aria-checked="slots.option ? `${isOptionChecked(option)}` : undefined"
      :aria-disabled="slots.option ? `${isOptionDisabled(option)}` : undefined"
      :class="
        cn(
          'flex gap-2',
          option.description ? 'items-start' : 'items-center',
          slots.option && 'outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-xl',
          props.optionClass,
        )
      "
      @click="handleCustomOptionClick(option)"
      @keydown.enter.prevent="handleCustomOptionKeydown(option)"
      @keydown.space.prevent="handleCustomOptionKeydown(option)"
    >
      <Checkbox
        v-show="!slots.option"
        :id="getOptionId(option, index)"
        :model-value="isOptionChecked(option)"
        :disabled="isOptionDisabled(option)"
        :class="props.itemClass"
        @update:model-value="handleOptionModelValueChange(option, $event)"
      />
      <Label
        :for="slots.option ? undefined : getOptionId(option, index)"
        :class="
          cn(
            'min-w-0 flex-1 cursor-pointer gap-0',
            option.description ? 'items-start' : 'items-center',
            isOptionDisabled(option) && 'cursor-not-allowed opacity-60',
            props.labelClass,
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
  </div>
</template>
