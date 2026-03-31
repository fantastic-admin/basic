<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useElementSize, useTextDirection } from '@vueuse/core'
import { cn } from '../../utils'
import { ScrollArea, ScrollBar } from './scroll-area'

defineOptions({
  name: 'FaScrollArea',
})

const props = withDefaults(
  defineProps<{
    horizontal?: boolean
    scrollbar?: boolean
    mask?: boolean
    class?: HTMLAttributes['class']
    contentClass?: HTMLAttributes['class']
  }>(),
  {
    horizontal: false,
    scrollbar: true,
    mask: false,
  },
)

const emits = defineEmits<{
  onScroll: [Event]
}>()

const dir = useTextDirection({
  observe: true,
})

const scrollAreaRef = useTemplateRef('scrollAreaRef')

function onScroll(event: Event) {
  emits('onScroll', event)
}

function onWheel(event: WheelEvent) {
  if (props.horizontal) {
    scrollAreaRef.value?.el?.viewportElement?.scrollBy({
      left: event.deltaY || event.detail,
    })
  }
}

const scrollContainerRef = useTemplateRef('scrollContainerRef')

onMounted(() => {
  const { width, height } = useElementSize(scrollContainerRef.value)
  watch([width, height], () => {
    scrollAreaRef.value?.el?.viewportElement?.dispatchEvent(new Event('scroll'))
  }, {
    immediate: true,
  })
})

function scrollTo(scrollNumber: number, behavior: ScrollBehavior = 'auto') {
  if (props.horizontal) {
    scrollAreaRef.value?.el?.viewportElement?.scrollTo({
      left: scrollNumber,
      behavior,
    })
  }
  else {
    scrollAreaRef.value?.el?.viewportElement?.scrollTo({
      top: scrollNumber,
      behavior,
    })
  }
}

defineExpose({
  ref: scrollAreaRef,
  scrollTo,
})
</script>

<template>
  <div ref="scrollContainerRef" :class="cn('relative flex overflow-hidden', props.class)">
    <ScrollArea ref="scrollAreaRef" :class="cn('relative z-0 flex-1', props.contentClass)" :dir="dir === 'ltr' ? 'ltr' : 'rtl'" :horizontal="props.horizontal" :scrollbar="props.scrollbar" :mask="props.mask" :on-scroll="onScroll" :on-wheel="onWheel">
      <slot />
      <ScrollBar v-if="props.horizontal" orientation="horizontal" :class="{ 'opacity-0 pointer-events-none': !props.scrollbar }" />
    </ScrollArea>
  </div>
</template>
