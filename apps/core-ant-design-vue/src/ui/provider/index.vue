<script setup lang="ts">
import { theme } from 'ant-design-vue'
import antDesignVueLocaleZhCN from 'ant-design-vue/es/locale/zh_CN'

const appSettingsStore = useAppSettingsStore()

function toHexChannel(value: number) {
  return Math.round(Math.min(Math.max(value, 0), 1) * 255).toString(16).padStart(2, '0')
}

function linearSrgbToSrgb(value: number) {
  if (value <= 0.0031308) {
    return 12.92 * value
  }
  return 1.055 * value ** (1 / 2.4) - 0.055
}

function oklchToHex(value: string) {
  const normalizedValue = value
    .trim()
    .replace(/^oklch\(/, '')
    .replace(/\)$/, '')

  const [colorValue] = normalizedValue.split('/')
  const [lightnessValue, chromaValue, hueValue] = colorValue.trim().split(/\s+/)

  if (!lightnessValue || !chromaValue || !hueValue) {
    return '#000000'
  }

  const lightness = lightnessValue.endsWith('%')
    ? Number.parseFloat(lightnessValue) / 100
    : Number.parseFloat(lightnessValue)
  const chroma = Number.parseFloat(chromaValue)
  const hue = Number.parseFloat(hueValue.replace(/deg$/, ''))

  if ([lightness, chroma, hue].some(Number.isNaN)) {
    return '#000000'
  }

  const hueInRadians = hue * Math.PI / 180
  const a = chroma * Math.cos(hueInRadians)
  const b = chroma * Math.sin(hueInRadians)

  const l = lightness + 0.3963377774 * a + 0.2158037573 * b
  const m = lightness - 0.1055613458 * a - 0.0638541728 * b
  const s = lightness - 0.0894841775 * a - 1.291485548 * b

  const l3 = l ** 3
  const m3 = m ** 3
  const s3 = s ** 3

  const red = linearSrgbToSrgb(+4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3)
  const green = linearSrgbToSrgb(-1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3)
  const blue = linearSrgbToSrgb(-0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3)

  return `#${toHexChannel(red)}${toHexChannel(green)}${toHexChannel(blue)}`
}

const token = ref({
  colorPrimary: '',
  borderRadius: 0,
})

watch([
  () => appSettingsStore.settings.theme.colorScheme,
  () => appSettingsStore.settings.theme.radius,
], () => {
  const rootStyles = getComputedStyle(document.documentElement)
  token.value = {
    colorPrimary: oklchToHex(rootStyles.getPropertyValue('--primary')),
    borderRadius: Number.parseFloat(rootStyles.getPropertyValue('--radius')) * 16,
  }
}, {
  immediate: true,
})

const themeConfig = computed(() => ({
  algorithm: appSettingsStore.currentColorScheme === 'dark' ? [theme.darkAlgorithm] : [theme.defaultAlgorithm],
  token: token.value,
}))
</script>

<template>
  <AConfigProvider :locale="antDesignVueLocaleZhCN" :theme="themeConfig">
    <slot />
  </AConfigProvider>
</template>
