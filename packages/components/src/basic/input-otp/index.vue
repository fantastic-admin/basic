<script setup lang="ts">
import { useId } from 'vue'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './input-otp'

defineOptions({
  name: 'BuiltInInputOTP',
})

withDefaults(
  defineProps<{
    length?: number
  }>(),
  {
    length: 6,
  },
)

const emit = defineEmits<{
  complete: []
}>()

const modelValue = defineModel<string>()

const id = useId()
</script>

<template>
  <InputOTP :id v-model="modelValue" :maxlength="length" @complete="emit('complete')">
    <InputOTPGroup>
      <InputOTPSlot v-for="(item, index) in length" :key="item" :index="index" />
    </InputOTPGroup>
  </InputOTP>
</template>
