<script setup lang="ts">
import { theme } from 'antdv-next'
import antdvNextLocaleZhCN from 'antdv-next/locale/zh_CN'

const appSettingsStore = useAppSettingsStore()

const themeConfig = computed(() => ({
  algorithm: appSettingsStore.currentColorScheme === 'dark' ? [theme.darkAlgorithm] : [theme.defaultAlgorithm],
}))
</script>

<template>
  <AConfigProvider :locale="antdvNextLocaleZhCN" :theme="themeConfig">
    <slot />
  </AConfigProvider>
</template>
