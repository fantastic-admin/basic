<script setup lang="ts">
withDefaults(
  defineProps<{
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
  change: [string | number | undefined]
}>()

const value = defineModel<string | number>()

watch(value, (val) => {
  emits('change', val)
})
</script>

<template>
  <div class="inline-flex select-none items-center justify-center of-hidden rounded-md bg-stone-3 dark-bg-stone-7">
    <button v-for="option in options" :key="option.value" :disabled="disabled || option.disabled" class="flex cursor-pointer items-center truncate border-size-0 bg-inherit px-2 py-1.5 text-sm disabled-cursor-not-allowed disabled-opacity-50 hover-not-disabled-(bg-ui-primary text-ui-text)" :class="{ 'text-ui-text bg-ui-primary': value === option.value }" @click="value = option.value">
      <SvgIcon v-if="option.icon" :name="option.icon" />
      <template v-else>
        {{ option.label }}
      </template>
    </button>
  </div>
</template>
