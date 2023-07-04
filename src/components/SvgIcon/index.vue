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
  <i class="icon" :style="style">
    <Icon v-if="name.indexOf('ep:') === 0" :icon="name" />
    <svg v-else aria-hidden="true">
      <use :xlink:href="`#icon-${name}`" />
    </svg>
  </i>
</template>

<style lang="scss" scoped>
.icon {
  height: 1em;
  width: 1em;
  line-height: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fill: currentcolor;

  svg {
    height: 1em;
    width: 1em;
  }
}
</style>
