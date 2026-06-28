<script setup lang="ts">
import { zhCN } from './index'

const appSettingsStore = useAppSettingsStore()

// 跟随框架主题
const isSupportColorMix = CSS.supports('color', 'color-mix(in oklab, #fff, #000)')
if (isSupportColorMix) {
  document.body.style.setProperty('--el-bg-color', 'oklch(var(--background))')
  document.body.style.setProperty('--el-color-primary', 'oklch(var(--primary))')
  document.body.style.setProperty('--el-color-white', 'oklch(var(--primary-foreground))')
  document.body.style.setProperty('--el-color-black', 'oklch(var(--primary-foreground))')
  watch(() => appSettingsStore.currentColorScheme, (val) => {
    if (val === 'light') {
      for (let index = 1; index < 10; index++) {
        document.body.style.setProperty(`--el-color-primary-light-${index}`, `color-mix(in oklab, oklch(var(--primary)), #fff ${index * 10}%)`)
        document.body.style.setProperty(`--el-color-primary-dark-${index}`, `color-mix(in oklab, oklch(var(--primary)), #000 ${index * 10}%)`)
      }
    }
    else {
      for (let index = 1; index < 10; index++) {
        document.body.style.setProperty(`--el-color-primary-light-${index}`, `color-mix(in oklab, oklch(var(--primary)), #000 ${index * 10}%)`)
        document.body.style.setProperty(`--el-color-primary-dark-${index}`, `color-mix(in oklab, oklch(var(--primary)), #fff ${index * 10}%)`)
      }
    }
  }, {
    immediate: true,
  })
}
</script>

<template>
  <ElConfigProvider :locale="zhCN" :button="{ autoInsertSpace: true }">
    <slot />
  </ElConfigProvider>
</template>
