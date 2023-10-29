<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string | number | undefined
    options: {
      label?: string | number
      icon?: string
      value: string | number
      disabled?: boolean
    }[]
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const emits = defineEmits<{
  'update:modelValue': [string | number]
  'change': [string | number | undefined]
}>()

watch(() => props.modelValue, (val) => {
  emits('change', val)
})
</script>

<template>
  <div class="inline-flex items-center justify-center rounded-md bg-stone-3 dark:bg-stone-7 of-hidden select-none">
    <button v-for="option in options" :key="option.value" :disabled="disabled || option.disabled" class="flex items-center px-2 py-1.5 border-size-0 cursor-pointer bg-inherit disabled:cursor-not-allowed disabled:opacity-50 text-sm truncate hover:not-disabled:(text-ui-text bg-ui-primary)" :class="{ 'text-ui-text bg-ui-primary': modelValue === option.value }" @click="emits('update:modelValue', option.value)">
      <SvgIcon v-if="option.icon" :name="option.icon" />
      <template v-else>
        {{ option.label }}
      </template>
    </button>
  </div>
</template>
