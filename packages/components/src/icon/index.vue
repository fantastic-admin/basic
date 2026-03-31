<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { UseImage } from '@vueuse/components'
import { Transition } from 'vue'
import { cn } from '../../utils'

defineOptions({
  name: 'FaIcon',
})

const props = defineProps<{
  name: string
  transition?: boolean
  class?: HTMLAttributes['class']
}>()

const IconWrapper = defineComponent({
  render() {
    const content = this.$slots.default?.()
    return props.transition
      ? h(Transition, { name: 'icon-flip' }, () => content)
      : content
  },
})

const outputType = computed(() => {
  if (!props.name) {
    return
  }
  const hasPathFeatures = (str: string) => {
    return /^\.{1,2}\//.test(str) || str.startsWith('/') || str.includes('/')
  }
  if (/^https?:\/\//.test(props.name) || hasPathFeatures(props.name)) {
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
</script>

<template>
  <i :class="cn('relative size-[1em] flex-inline items-center justify-center fill-current leading-[1em]', props.class)">
    <IconWrapper>
      <i v-if="outputType === 'unocss'" :key="`unocss-${name}`" class="shrink-0 size-inherit inset-0 absolute" :class="name" />
      <span v-else-if="outputType === 'iconify'" :key="`iconify-${name}`" class="flex shrink-0 size-inherit items-center inset-0 justify-center absolute">
        <Icon :icon="name" class="shrink-0 size-inherit!" />
      </span>
      <svg v-else-if="outputType === 'svg'" :key="`svg-${name}`" class="shrink-0 size-inherit inset-0 absolute" aria-hidden="true">
        <use :xlink:href="`/__spritemap#sprite-${name}`" />
      </svg>
      <span v-else-if="outputType === 'img'" :key="`img-${name}`" class="flex shrink-0 size-inherit items-center inset-0 justify-center absolute">
        <UseImage :src="name" class="shrink-0 size-inherit">
          <template #loading>
            <i class="i-line-md:loading-loop size-inherit" />
          </template>
          <template #error>
            <i class="i-ph:image-broken-duotone size-inherit" />
          </template>
        </UseImage>
      </span>
    </IconWrapper>
  </i>
</template>

<style scoped>
.icon-flip-enter-active {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.icon-flip-leave-active {
  transition: all 0.2s cubic-bezier(0.36, 0, 0.66, -0.56);
}

.icon-flip-enter-from {
  opacity: 0;
  transform: scale(0.5) rotate(90deg);
}

.icon-flip-leave-to {
  opacity: 0;
  transform: scale(0.5) rotate(-90deg);
}
</style>
