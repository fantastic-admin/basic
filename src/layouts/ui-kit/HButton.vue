<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    block?: boolean
    outline?: boolean
    disabled?: boolean
  }>(),
  {
    block: false,
    outline: false,
    disabled: false,
  },
)

const buttonClass = computed(() => [
  'focus-outline-none focus-visible-outline-0 cursor-pointer disabled-cursor-not-allowed disabled-opacity-75 flex-shrink-0 gap-x-1.5 px-2.5 py-1.5 border-size-0 font-medium text-sm rounded-md select-none',
  props.block ? 'w-full flex justify-center items-center' : 'inline-flex items-center',
  props.outline
    ? 'shadow-sm ring-1 ring-inset ring-ui-primary text-ui-primary bg-white dark-bg-dark hover-not-disabled-bg-ui-primary/10 dark-hover-not-disabled-bg-ui-primary/10 focus-visible-ring-2'
    : 'shadow-sm text-ui-text bg-ui-primary hover-bg-ui-primary/75 disabled-bg-ui-primary/90 focus-visible-ring-inset focus-visible-ring-2',
])
</script>

<template>
  <button :disabled="disabled" :class="buttonClass">
    <slot />
  </button>
</template>
