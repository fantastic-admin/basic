<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'

const appSettingsStore = useAppSettingsStore()

function oklchToRgb(lightness: number, chroma: number, hue: number) {
  const hueInRadians = hue * Math.PI / 180
  const a = chroma * Math.cos(hueInRadians)
  const b = chroma * Math.sin(hueInRadians)

  const l = lightness + 0.3963377774 * a + 0.2158037573 * b
  const m = lightness - 0.1055613458 * a - 0.0638541728 * b
  const s = lightness - 0.0894841775 * a - 1.291485548 * b

  const l3 = l ** 3
  const m3 = m ** 3
  const s3 = s ** 3

  return [
    toSrgbChannel(4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3),
    toSrgbChannel(-1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3),
    toSrgbChannel(-0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3),
  ]
}

function toSrgbChannel(value: number) {
  const clampedValue = Math.min(Math.max(value, 0), 1)
  const srgbValue = clampedValue <= 0.0031308
    ? 12.92 * clampedValue
    : 1.055 * clampedValue ** (1 / 2.4) - 0.055

  return Math.round(srgbValue * 255)
}

function parseOklchValue(value: string) {
  return value.trim().split(/\s+/).map(channel => Number.parseFloat(channel)) as [number, number, number]
}

const themeOverrides = ref<GlobalThemeOverrides>({
  common: {
    primaryColor: '',
    primaryColorHover: '',
  },
  Button: {
    textColor: '',
  },
})

watch([
  () => appSettingsStore.settings.theme.colorScheme,
  () => appSettingsStore.settings.theme.radius,
], () => {
  const rootStyles = getComputedStyle(document.documentElement)
  const primaryColor = oklchToRgb(...parseOklchValue(rootStyles.getPropertyValue('--primary')))
  const foregroundColor = oklchToRgb(...parseOklchValue(rootStyles.getPropertyValue('--foreground')))
  const backgroundColor = oklchToRgb(...parseOklchValue(rootStyles.getPropertyValue('--background')))
  themeOverrides.value = {
    common: {
      primaryColor: `rgb(${primaryColor.join(',')})`,
      primaryColorHover: `rgba(${primaryColor.join(',')},0.8)`,
      primaryColorPressed: `rgb(${primaryColor.join(',')})`,
      bodyColor: `rgb(${backgroundColor.join(',')})`,
      borderRadius: `${Number.parseFloat(rootStyles.getPropertyValue('--radius')) * 16}px`,
      borderRadiusSmall: `${Number.parseFloat(rootStyles.getPropertyValue('--radius')) * 12}px`,
    },
    Button: {
      textColor: `rgb(${foregroundColor.join(',')})`,
    },
  }
}, {
  immediate: true,
})
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme="appSettingsStore.currentColorScheme === 'dark' ? darkTheme : undefined" :theme-overrides="themeOverrides" class="h-full">
    <NMessageProvider>
      <slot />
      <NGlobalStyle />
    </NMessageProvider>
  </NConfigProvider>
</template>
