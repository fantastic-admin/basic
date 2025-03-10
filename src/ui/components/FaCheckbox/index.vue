<script setup lang="ts">
import { Checkbox } from './checkbox'

defineOptions({
  name: 'FaCheckbox',
})

defineProps<{
  disabled?: boolean
}>()

const value = defineModel<boolean>()

const id = useId()
</script>

<template>
  <div class="flex-center-start gap-2">
    <Checkbox :id v-model="value" :disabled />
    <label :for="id" class="cursor-pointer text-sm">
      <slot />
    </label>
  </div>
</template>
