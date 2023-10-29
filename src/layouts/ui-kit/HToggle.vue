<script setup lang="ts">
import { Switch } from '@headlessui/vue'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    disabled?: boolean
    onIcon?: string
    offIcon?: string
  }>(),
  {
    disabled: false,
  },
)

const emits = defineEmits<{
  'update:modelValue': [boolean]
}>()

const enabled = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})
</script>

<template>
  <Switch v-model="enabled" :disabled="disabled" class="relative inline-flex vertical-middle h-5 w-10 p-0 flex-shrink-0 border-2 border-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900" :class="[enabled ? 'bg-ui-primary' : 'bg-stone-3 dark:bg-stone-7']">
    <span class="pointer-events-none relative inline-block h-4 w-4 rounded-full bg-white dark:bg-dark shadow transform ring-0 transition ease-in-out duration-200" :class="[enabled ? 'translate-x-5' : 'translate-x-0']">
      <span class="absolute inset-0 h-full w-full flex items-center justify-center">
        <SvgIcon v-if="(enabled && onIcon) || (!enabled && offIcon)" :name="(enabled ? onIcon : offIcon) as string" class="h-3 w-3 text-stone-7 dark:text-stone-3" />
      </span>
    </span>
  </Switch>
</template>
