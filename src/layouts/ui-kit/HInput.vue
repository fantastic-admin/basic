<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const emits = defineEmits<{
  'update:modelValue': [string]
}>()

const inputRef = ref()

function handleInput(event: Event) {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
}

defineExpose({
  ref: inputRef,
})
</script>

<template>
  <div class="relative w-full lg:w-48">
    <input ref="inputRef" type="text" :value="modelValue" :placeholder="placeholder" :disabled="disabled" class="relative block w-full border-0 rounded-md bg-white px-2.5 py-1.5 text-sm shadow-sm ring-1 ring-stone-2 ring-inset disabled:cursor-not-allowed dark:bg-dark disabled:opacity-50 focus:outline-none focus:ring-2 dark:ring-stone-8 focus:ring-ui-primary placeholder-stone-4 dark:placeholder-stone-5" @input="handleInput">
  </div>
</template>
