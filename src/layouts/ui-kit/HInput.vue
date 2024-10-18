<script setup lang="ts" generic="T extends string | number">
withDefaults(
  defineProps<{
    placeholder?: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const value = defineModel<T>()

const inputRef = useTemplateRef('inputRef')

defineExpose({
  ref: inputRef,
})
</script>

<template>
  <div class="relative w-full lg-w-48">
    <input ref="inputRef" v-model="value" type="text" :placeholder="placeholder" :disabled="disabled" class="relative block w-full border-0 rounded-md bg-white px-2.5 py-1.5 text-sm shadow-sm ring-1 ring-stone-2 ring-inset disabled-cursor-not-allowed dark-bg-dark disabled-opacity-50 focus-outline-none focus-ring-2 dark-ring-stone-8 focus-ring-ui-primary placeholder-stone-4 dark-placeholder-stone-5">
  </div>
</template>
