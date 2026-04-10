<script setup lang="ts">
import type { GlobalConfigProvider } from 'tdesign-vue-next'
import { merge } from 'es-toolkit'
import zhCN from 'tdesign-vue-next/es/locale/zh_CN'

const appSettingsStore = useAppSettingsStore()

const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
watch(() => appSettingsStore.settings.theme.colorScheme, (colorScheme) => {
  if (colorScheme === '') {
    prefersColorScheme.addEventListener('change', updateTheme)
  }
  else {
    prefersColorScheme.removeEventListener('change', updateTheme)
  }
  nextTick(() => {
    updateTheme()
  })
}, {
  immediate: true,
})
function updateTheme() {
  switch (appSettingsStore.currentColorScheme) {
    case 'light':
      document.documentElement.removeAttribute('theme-mode')
      break
    case 'dark':
      document.documentElement.setAttribute('theme-mode', 'dark')
      break
  }
}

// 跟随框架主题
const isSupportColorMix = CSS.supports('color', 'color-mix(in oklab, #fff, #000)')
if (isSupportColorMix) {
  document.documentElement.style.setProperty('--td-brand-color', 'oklch(var(--primary))')
  watch(() => appSettingsStore.currentColorScheme, (val) => {
    if (val === 'light') {
      for (let index = 1; index <= 10; index++) {
        document.documentElement.style.setProperty(`--td-brand-color-${index}`, `color-mix(in oklab, oklch(var(--primary)), #fff ${(10 - index) * 10}%)`)
      }
    }
    else {
      for (let index = 1; index <= 10; index++) {
        document.documentElement.style.setProperty(`--td-brand-color-${index}`, `color-mix(in oklab, oklch(var(--primary)), #000 ${(10 - index) * 10}%)`)
      }
    }
  }, {
    immediate: true,
  })
}
</script>

<template>
  <TConfigProvider :global-config="merge({} as GlobalConfigProvider, zhCN)">
    <slot />
  </TConfigProvider>
</template>
