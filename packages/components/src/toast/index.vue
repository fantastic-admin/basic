<script setup lang="ts">
import { Toaster } from './sonner'
import 'vue-sonner/style.css'

defineOptions({
  name: 'FaToast',
})
</script>

<template>
  <Toaster
    position="top-center" rich-colors :toast-options="{
      classes: {
        toast: 'group toast group-[.toaster]:text-foreground',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        icon: 'group-[.toast]:scale-120 group-[.toast[data-type=info]]:text-blue-600 dark:group-[.toast[data-type=info]]:text-blue-400 group-[.toast[data-type=error]]:text-red-600 dark:group-[.toast[data-type=error]]:text-red-400 group-[.toast[data-type=success]]:text-green-600 dark:group-[.toast[data-type=success]]:text-green-400 group-[.toast[data-type=warning]]:text-yellow-600 dark:group-[.toast[data-type=warning]]:text-yellow-400',
      },
    }"
  />
</template>
