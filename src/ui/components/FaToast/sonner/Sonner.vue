<script setup lang="ts">
import type { ToasterProps } from 'vue-sonner'
import { Toaster as Sonner } from 'vue-sonner'

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    class="group toaster"
    v-bind="props"
    :toast-options="{
      classes: {
        toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        icon: 'group-[.toast]:scale-120 group-[.toast[data-type=info]]:text-blue-600 dark:group-[.toast[data-type=info]]:text-blue-400 group-[.toast[data-type=error]]:text-red-600 dark:group-[.toast[data-type=error]]:text-red-400 group-[.toast[data-type=success]]:text-green-600 dark:group-[.toast[data-type=success]]:text-green-400 group-[.toast[data-type=warning]]:text-yellow-600 dark:group-[.toast[data-type=warning]]:text-yellow-400',
      },
    }"
  />
</template>
