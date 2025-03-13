<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import zhCN from 'element-plus/es/locale/lang/zh-cn.mjs'

const settingsStore = useSettingsStore()

// 跟随框架主题
const isSupprotColorMix = CSS.supports('color', 'color-mix(in srgb, #fff, #000)')
if (isSupprotColorMix) {
  document.body.style.setProperty('--el-bg-color', 'hsl(var(--background))')
  document.body.style.setProperty('--el-color-primary', 'hsl(var(--primary))')
  document.body.style.setProperty('--el-color-white', 'hsl(var(--primary-foreground))')
  document.body.style.setProperty('--el-color-black', 'hsl(var(--primary-foreground))')
  watch(() => settingsStore.currentColorScheme, (val) => {
    if (val === 'light') {
      for (let index = 1; index < 10; index++) {
        document.body.style.setProperty(`--el-color-primary-light-${index}`, `color-mix(in hsl, hsl(var(--primary)), #fff ${index * 10}%)`)
        document.body.style.setProperty(`--el-color-primary-dark-${index}`, `color-mix(in hsl, hsl(var(--primary)), #000 ${index * 10}%)`)
      }
    }
    else {
      for (let index = 1; index < 10; index++) {
        document.body.style.setProperty(`--el-color-primary-light-${index}`, `color-mix(in hsl, hsl(var(--primary)), #000 ${index * 10}%)`)
        document.body.style.setProperty(`--el-color-primary-dark-${index}`, `color-mix(in hsl, hsl(var(--primary)), #fff ${index * 10}%)`)
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
