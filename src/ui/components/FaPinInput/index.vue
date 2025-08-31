<script setup lang="ts">
import { PinInput, PinInputGroup, PinInputSlot } from './pin-input'

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

function handleComplete(e: string[]) {
  modelValue.value = e.join('')
  emit('complete')
}

const id = useId()
</script>

<template>
  <PinInput :id v-model="value" placeholder="○" otp @complete="handleComplete">
    <PinInputGroup>
      <PinInputSlot v-for="(item, index) in length" :key="item" :index="index" />
    </PinInputGroup>
  </PinInput>
</template>
