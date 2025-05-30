<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import { Toaster } from './sonner'
import 'vue-sonner/style.css'

defineOptions({
  name: 'FaToast',
})

const settingsStore = useSettingsStore()
</script>

<template>
  <Toaster position="top-center" :theme="settingsStore.currentColorScheme" />
</template>
