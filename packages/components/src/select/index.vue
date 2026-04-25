<script setup lang="ts">
import type { AcceptableValue, SelectContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { useTextDirection } from '@vueuse/core'
import { cn } from '../../utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select'

interface Option {
  label: string
  value: AcceptableValue
  disabled?: boolean
}
interface GroupOption {
  label: string
  options: Option[]
}

defineOptions({
  name: 'FaSelect',
})

const props = defineProps<{
  multiple?: boolean
  disabled?: boolean
  position?: SelectContentProps['position']
  options: (Option | GroupOption)[]
  placeholder?: string
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  change: [value: AcceptableValue | undefined]
}>()

const value = defineModel<AcceptableValue>()

const dir = useTextDirection({
  observe: true,
})

watch(value, (newValue) => {
  emits('change', newValue)
})

const selectedOption = computed({
  get() {
    // 处理普通选项和分组选项
    if (!props.options || props.options.length === 0) {
      return null
    }
    for (const option of props.options) {
      if (Object.hasOwn(option, 'options')) {
        // 分组选项
        const group = option as GroupOption
        const found = group.options.find(opt => opt.value === value.value)
        if (found) {
          return found
        }
      }
      else {
        // 普通选项
        const single = option as Option
        if (single.value === value.value) {
          return single
        }
      }
    }
    // 如果没有找到匹配项，返回第一个有效选项
    if (props.options.length > 0) {
      const firstOption = props.options[0]

      if (Object.hasOwn(firstOption, 'options')) {
        const group = firstOption as GroupOption
        return group.options && group.options.length > 0 ? group.options[0] : null
      }
      else {
        return firstOption as Option
      }
    }
    return null
  },
  set(val) {
    value.value = val?.value || null
  },
})
</script>

<template>
  <Select v-model="value" :multiple :disabled :dir="dir === 'ltr' ? 'ltr' : 'rtl'">
    <SelectTrigger :class="cn('w-[200px]', props.class)">
      <SelectValue :placeholder="props.placeholder" :selected-option="selectedOption?.label" />
    </SelectTrigger>
    <SelectContent :position class="z-2000">
      <template v-for="option in props.options" :key="option.label">
        <SelectGroup v-if="option.hasOwnProperty('options')">
          <SelectLabel>{{ option.label }}</SelectLabel>
          <SelectItem
            v-for="(item, index) in (option as GroupOption).options"
            :key="index"
            :value="item.value"
            :disabled="item.disabled"
          >
            {{ item.label }}
          </SelectItem>
        </SelectGroup>
        <SelectItem
          v-else
          :value="(option as Option).value"
          :disabled="(option as Option).disabled"
        >
          {{ option.label }}
        </SelectItem>
      </template>
    </SelectContent>
  </Select>
</template>
