<script setup lang="ts">
import { PinInput, PinInputGroup, PinInputInput } from './pin-input'

defineOptions({
  name: 'FaPinInput',
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

const value = ref<string[]>([])

watch(modelValue, (val) => {
  value.value = val?.split('') ?? []
})

watch(value, (val) => {
  modelValue.value = val.join('')
})

function handleComplete(e: string[]) {
  modelValue.value = e.join('')
  emit('complete')
}

const id = useId()
</script>

<template>
  <PinInput :id :model-value="value" placeholder="○" otp type="number" @complete="handleComplete" @update:model-value="arrStr => value = arrStr.filter(Boolean)">
    <PinInputGroup>
      <PinInputInput v-for="(item, index) in length" :key="item" :index="index" />
    </PinInputGroup>
  </PinInput>
</template>
