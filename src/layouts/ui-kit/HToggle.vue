<script setup lang="ts">
import { Switch } from '@headlessui/vue'

withDefaults(
  defineProps<{
    disabled?: boolean
    onIcon?: string
    offIcon?: string
  }>(),
  {
    disabled: false,
  },
)

const enabled = defineModel<boolean>()
</script>

<template>
  <Switch v-model="enabled" :disabled="disabled" class="relative h-5 w-10 inline-flex flex-shrink-0 cursor-pointer border-2 border-transparent rounded-full p-0 vertical-middle disabled-cursor-not-allowed disabled-opacity-50 focus-outline-none focus-visible-ring-2 focus-visible-ring-offset-2 focus-visible-ring-offset-white dark-focus-visible-ring-offset-gray-900" :class="[enabled ? 'bg-ui-primary' : 'bg-stone-3 dark-bg-stone-7']">
    <span class="pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out dark-bg-dark" :class="[enabled ? 'translate-x-5' : 'translate-x-0']">
      <span class="absolute inset-0 h-full w-full flex items-center justify-center">
        <SvgIcon v-if="(enabled && onIcon) || (!enabled && offIcon)" :name="(enabled ? onIcon : offIcon) as string" class="h-3 w-3 text-stone-7 dark-text-stone-3" />
      </span>
    </span>
  </Switch>
</template>
