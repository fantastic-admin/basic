<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import { Icon } from '@iconify/vue'
import { UseImage } from '@vueuse/components'

defineOptions({
  name: 'FaIcon',
})

const props = defineProps<{
  name: string
  class?: HTMLAttributes['class']
}>()

const outputType = computed(() => {
  const hasPathFeatures = (str: string) => {
    return /^\.{1,2}\//.test(str) || str.startsWith('/') || str.includes('/')
  }
  if (/^https?:\/\//.test(props.name) || hasPathFeatures(props.name) || !props.name) {
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
    <i v-if="outputType === 'unocss'" class="size-inherit shrink-0" :class="name" />
    <Icon v-else-if="outputType === 'iconify'" :icon="name" class="shrink-0 size-inherit!" />
    <svg v-else-if="outputType === 'svg'" class="size-inherit shrink-0" aria-hidden="true">
      <use :xlink:href="`#icon-${name}`" />
    </svg>
    <UseImage v-else-if="outputType === 'img'" :src="name" class="size-inherit shrink-0">
      <template #loading>
        <i class="i-line-md:loading-loop size-inherit" />
      </template>
      <template #error>
        <i class="i-tdesign:image-error size-inherit" />
      </template>
    </UseImage>
  </i>
</template>
