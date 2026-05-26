<script setup lang="ts">
import { computed, useId } from 'vue'
import { REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'vue-input-otp'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp'

defineOptions({
  name: 'BuiltInInputOTP',
})

const props = withDefaults(
  defineProps<{
    length?: number
    pattern?: 'only-chars' | 'only-digits' | 'only-digits-and-chars' | (string & NonNullable<unknown>)
    separator?: number[]
    disabled?: boolean
  }>(),
  {
    length: 6,
    separator: () => [],
  },
)

const emit = defineEmits<{
  input: [value: string]
  complete: [value: string]
}>()

const modelValue = defineModel<string>()

const id = useId()

const pattern = computed(() => {
  switch (props.pattern) {
    case 'only-chars':
      return REGEXP_ONLY_CHARS
    case 'only-digits':
      return REGEXP_ONLY_DIGITS
    case 'only-digits-and-chars':
      return REGEXP_ONLY_DIGITS_AND_CHARS
    default:
      return props.pattern
  }
})

const groups = computed(() => {
  const result: { start: number, length: number }[] = []
  let start = 0

  for (const value of props.separator) {
    const groupLength = Math.trunc(value)

    if (groupLength <= 0) {
      continue
    }
    if (start >= props.length) {
      break
    }

    result.push({
      start,
      length: Math.min(groupLength, props.length - start),
    })
    start += groupLength
  }

  if (start < props.length) {
    result.push({
      start,
      length: props.length - start,
    })
  }

  return result
})
</script>

<template>
  <InputOTP :id v-model="modelValue" :maxlength="length" :pattern :disabled @input="emit('input', $event)" @complete="emit('complete', $event)">
    <template v-for="(group, groupIndex) in groups" :key="group.start">
      <InputOTPGroup>
        <InputOTPSlot
          v-for="item in group.length"
          :key="group.start + item"
          :index="group.start + item - 1"
        />
      </InputOTPGroup>
      <InputOTPSeparator v-if="groupIndex < groups.length - 1" />
    </template>
  </InputOTP>
</template>
