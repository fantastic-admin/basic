<script setup lang="ts">
const props = withDefaults(
  defineProps<{
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

const value = defineModel<string | number>()

const selected = computed({
  get() {
    return props.options.find(option => option.value === value.value) ?? props.options[0]
  },
  set(val) {
    value.value = val.value
  },
})
</script>

<template>
  <VMenu :triggers="['click']" :popper-triggers="['click']" :delay="0" :disabled="disabled" v-bind="$attrs">
    <div class="w-full inline-flex">
      <button class="relative block w-full flex cursor-default items-center gap-x-2 border-0 rounded-md bg-white px-2.5 py-1.5 pe-9 text-left text-sm shadow-sm ring-1 ring-stone-2 ring-inset lg-w-48 disabled-cursor-not-allowed dark-bg-dark focus-outline-none focus-ring-2 dark-ring-stone-8 focus-ring-ui-primary" :disabled="disabled">
        <span class="block truncate">
          {{ selected.label }}
        </span>
        <span class="pointer-events-none absolute end-0 inset-y-0 flex items-center pe-2.5">
          <SvgIcon name="i-carbon:chevron-down" class="h-5 w-5 flex-shrink-0 text-stone-5" />
        </span>
      </button>
    </div>
    <template #popper>
      <div class="max-h-60 w-full scroll-py-1 overflow-y-auto p-1 lg-w-48 focus-outline-none">
        <button v-for="option in options" :key="option.value" :disabled="option.disabled" class="w-full cursor-pointer truncate border-size-0 rounded-md bg-inherit px-2 py-1.5 text-left text-sm disabled-cursor-not-allowed hover-not-disabled-bg-stone-1 dark-hover-not-disabled-bg-stone-9" :class="{ 'font-bold': modelValue === option.value }" @click="selected = option">
          {{ option.label }}
        </button>
      </div>
    </template>
  </VMenu>
</template>
