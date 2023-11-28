<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { isOfflineUse } from '@/iconify/index.json'

defineOptions({
  name: 'SvgIcon',
})

const props = defineProps<{
  name: string
  async?: boolean
  flip?: 'horizontal' | 'vertical' | 'both'
  rotate?: number
  color?: string
  size?: string | number
}>()

const outputType = computed(() => {
  if (props.name.indexOf('i-') === 0) {
    return (props.async || isOfflineUse) ? 'svg' : 'css'
  }
  else if (props.name.includes(':')) {
    return 'svg'
  }
  else {
    return 'custom'
  }
})

const outputName = computed(() => {
  if (props.name.indexOf('i-') === 0) {
    let conversionName = props.name
    if (props.async || isOfflineUse) {
      conversionName = conversionName.replace('i-', '')
    }
    return conversionName
  }
  else {
    return props.name
  }
})

const style = computed(() => {
  const transform = []
  if (props.flip) {
    switch (props.flip) {
      case 'horizontal':
        transform.push('rotateY(180deg)')
        break
      case 'vertical':
        transform.push('rotateX(180deg)')
        break
      case 'both':
        transform.push('rotateX(180deg)')
        transform.push('rotateY(180deg)')
        break
    }
  }
  if (props.rotate) {
    transform.push(`rotate(${props.rotate % 360}deg)`)
  }
  return {
    ...(props.color && { color: props.color }),
    ...(props.size && { fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size }),
    ...(transform.length && { transform: transform.join(' ') }),
  }
})
</script>

<template>
  <i class="relative h-[1em] w-[1em] flex-inline items-center justify-center fill-current leading-[1em]" :style="style">
    <i v-if="outputType === 'css'" :class="outputName" />
    <Icon v-else-if="outputType === 'svg'" :icon="outputName" />
    <svg v-else h-1em w-1em aria-hidden="true">
      <use :xlink:href="`#icon-${outputName}`" />
    </svg>
  </i>
</template>
