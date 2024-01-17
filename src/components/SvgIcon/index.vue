<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'SvgIcon',
})

const props = defineProps<{
  name: string
  flip?: 'horizontal' | 'vertical' | 'both'
  rotate?: number
  color?: string
  size?: string | number
}>()

const outputType = computed(() => {
  if (/^https?:\/\//.test(props.name)) {
    return 'img'
  }
  else if (/i-[^:]+:[^:]+/.test(props.name)) {
    return 'unocss'
  }
  else if (props.name.includes(':')) {
    return 'iconify'
  }
  else {
    return 'svg'
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
  <i class="relative h-[1em] w-[1em] flex-inline items-center justify-center fill-current leading-[1em]" :class="{ [name]: outputType === 'unocss' }" :style="style">
    <Icon v-if="outputType === 'iconify'" :icon="name" />
    <svg v-else-if="outputType === 'svg'" class="h-[1em] w-[1em]" aria-hidden="true">
      <use :xlink:href="`#icon-${name}`" />
    </svg>
    <img v-else-if="outputType === 'img'" :src="name" class="h-[1em] w-[1em]">
  </i>
</template>
