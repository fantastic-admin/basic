<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'

defineOptions({
  name: 'FaSelect',
})

const props = defineProps<{
  disabled?: boolean
  options: {
    label: string
    value: string
    disabled?: boolean
  }[]
  class?: HTMLAttributes['class']
}>()

const value = defineModel<string>()

const selectedOption = computed({
  get() {
    return props.options.find(option => option.value === value.value) ?? props.options[0]
  },
  set(val) {
    value.value = val.value
  },
})
</script>

<template>
  <Select v-model="value" :disabled>
    <SelectTrigger :class="cn('w-[200px]', props.class)">
      <SelectValue :placeholder="selectedOption.label" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="option in options" :key="option.value" :value="option.value" :disabled="option.disabled">
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
