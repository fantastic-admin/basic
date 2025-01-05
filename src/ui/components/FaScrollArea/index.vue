<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import { useElementSize } from '@vueuse/core'
import { ScrollArea, ScrollBar } from './scroll-area'

defineOptions({
  name: 'FaScrollArea',
})

const props = withDefaults(
  defineProps<{
    horizontal?: boolean
    scrollbar?: boolean
    mask?: boolean
    gradientColor?: string
    class?: HTMLAttributes['class']
    contentClass?: HTMLAttributes['class']
  }>(),
  {
    horizontal: false,
    scrollbar: true,
    mask: false,
    gradientColor: 'hsl(var(--background))',
  },
)

const scrollAreaRef = useTemplateRef('scrollAreaRef')

const showMaskStart = ref(false)
const showMaskEnd = ref(false)

function checkMask(el: HTMLElement) {
  if (props.horizontal) {
    const scrollLeft = el.scrollLeft ?? 0
    showMaskStart.value = scrollLeft > 0
    const clientWidth = el.clientWidth ?? 0
    const scrollWidth = el.scrollWidth ?? 0
    showMaskEnd.value = Math.ceil(scrollLeft + clientWidth) < scrollWidth
  }
  else {
    const scrollTop = el.scrollTop ?? 0
    showMaskStart.value = scrollTop > 0
    const clientHeight = el.clientHeight ?? 0
    const scrollHeight = el.scrollHeight ?? 0
    showMaskEnd.value = Math.ceil(scrollTop + clientHeight) < scrollHeight
  }
}

function onWheel(event: WheelEvent) {
  if (props.horizontal) {
    scrollAreaRef.value?.el?.viewportElement?.scrollBy({
      left: event.deltaY || event.detail,
    })
  }
  else {
    scrollAreaRef.value?.el?.viewportElement?.scrollBy({
      top: event.deltaY || event.detail,
    })
  }
}
function onScroll(event: Event) {
  checkMask(event.target as HTMLElement)
}

onMounted(() => {
  const { width, height } = useElementSize(scrollAreaRef.value?.el?.viewportElement?.children[0] as HTMLElement)
  watch([width, height], ([width, height]) => {
    if (width > 0 || height > 0) {
      checkMask(scrollAreaRef.value?.el?.viewportElement as HTMLElement)
    }
  }, {
    immediate: true,
  })
})

function scrollTo(scrollNumber: number) {
  if (props.horizontal) {
    scrollAreaRef.value?.el?.viewportElement?.scrollTo({
      left: scrollNumber,
      behavior: 'smooth',
    })
  }
  else {
    scrollAreaRef.value?.el?.viewportElement?.scrollTo({
      top: scrollNumber,
      behavior: 'smooth',
    })
  }
}

defineExpose({
  ref: scrollAreaRef,
  scrollTo,
})
</script>

<template>
  <div
    :class="cn('relative flex overflow-hidden after:(pointer-events-none absolute z-1 from-transparent to-[var(--mask-scroll-container-gradient-color)] opacity-0 transition-opacity content-empty) before:(pointer-events-none absolute z-1 from-transparent to-[var(--mask-scroll-container-gradient-color)] opacity-0 transition-opacity content-empty)', {
      'after:(bg-gradient-to-r rtl:bg-gradient-to-l h-full w-12 end-0) before:(bg-gradient-to-l rtl:bg-gradient-to-r h-full w-12 start-0)': props.horizontal,
      'after:(bg-gradient-to-b h-12 w-full bottom-0) before:(bg-gradient-to-t h-12 w-full)': !props.horizontal,
      'before:(opacity-100!)': props.mask && showMaskStart,
      'after:(opacity-100!)': props.mask && showMaskEnd,
    }, props.class)" :style="props.mask ? {
      '--mask-scroll-container-gradient-color': props.gradientColor,
    } : {}"
  >
    <ScrollArea ref="scrollAreaRef" :class="cn('relative z-0 flex-1', props.contentClass)" :scrollbar="props.scrollbar" :on-wheel="onWheel" :on-scroll="onScroll">
      <slot />
      <ScrollBar v-if="props.horizontal" orientation="horizontal" :class="{ 'opacity-0 pointer-events-none': !props.scrollbar }" />
    </ScrollArea>
  </div>
</template>
