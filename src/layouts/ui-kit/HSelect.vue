<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string | number | undefined
    options: {
      label: string | number
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
}>()

const selected = computed({
  get() {
    return props.options.find(option => option.value === props.modelValue) ?? props.options[0]
  },
  set(val) {
    emits('update:modelValue', val.value)
  },
})
</script>

<template>
  <VMenu :triggers="['click']" :popper-triggers="['click']" :delay="0" :disabled="disabled" v-bind="$attrs">
    <div class="inline-flex w-full">
      <button class="relative block w-full lg:w-48 disabled:cursor-not-allowed focus:outline-none border-0 rounded-md text-left cursor-default text-sm gap-x-2 px-2.5 py-1.5 shadow-sm bg-white dark:bg-dark ring-1 ring-inset ring-stone-2 dark:ring-stone-8 focus:ring-2 focus:ring-ui-primary pe-9 flex items-center" :disabled="disabled">
        <span class="block truncate">
          {{ selected.label }}
        </span>
        <span class="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-2.5">
          <SvgIcon name="carbon:chevron-down" class="flex-shrink-0 text-stone-5 h-5 w-5" />
        </span>
      </button>
    </div>
    <template #popper>
      <div class="w-full lg:w-48 focus:outline-none overflow-y-auto scroll-py-1 p-1 max-h-60">
        <button v-for="option in options" :key="option.value" :disabled="option.disabled" class="w-full px-2 py-1.5 border-size-0 cursor-pointer disabled:cursor-not-allowed text-sm text-left rounded-md truncate bg-inherit hover:not-disabled:bg-stone-1 dark:hover:not-disabled:bg-stone-9" :class="{ 'font-bold': modelValue === option.value }" @click="selected = option">
          {{ option.label }}
        </button>
      </div>
    </template>
  </VMenu>
</template>
