<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import { useElementSize, useScroll } from '@vueuse/core'
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

const arrivedState = ref<{
  left: boolean
  right: boolean
  top: boolean
  bottom: boolean
}>()
const showMaskStart = computed(() => {
  if (props.horizontal) {
    return !arrivedState.value?.left
  }
  return !arrivedState.value?.top
})
const showMaskEnd = computed(() => {
  if (props.horizontal) {
    return !arrivedState.value?.right
  }
  return !arrivedState.value?.bottom
})

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

const scrollContainerRef = useTemplateRef('scrollContainerRef')

onMounted(() => {
  const { arrivedState: arrivedStateValue } = useScroll(scrollAreaRef.value?.el?.viewportElement)
  watch(arrivedStateValue, (value) => {
    arrivedState.value = value
  }, {
    immediate: true,
  })
  const { width, height } = useElementSize(scrollContainerRef.value)
  watch([width, height], () => {
    scrollAreaRef.value?.el?.viewportElement?.dispatchEvent(new Event('scroll'))
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
    ref="scrollContainerRef" :class="cn('relative flex overflow-hidden after:(pointer-events-none absolute z-1 from-transparent to-[var(--mask-scroll-container-gradient-color)] opacity-0 transition-opacity content-empty) before:(pointer-events-none absolute z-1 from-transparent to-[var(--mask-scroll-container-gradient-color)] opacity-0 transition-opacity content-empty)', {
      'after:(bg-gradient-to-r rtl:bg-gradient-to-l h-full w-12 end-0) before:(bg-gradient-to-l rtl:bg-gradient-to-r h-full w-12 start-0)': props.horizontal,
      'after:(bg-gradient-to-b h-12 w-full bottom-0) before:(bg-gradient-to-t h-12 w-full)': !props.horizontal,
      'before:(opacity-100!)': props.mask && showMaskStart,
      'after:(opacity-100!)': props.mask && showMaskEnd,
    }, props.class)" :style="props.mask ? {
      '--mask-scroll-container-gradient-color': props.gradientColor,
    } : {}"
  >
    <ScrollArea ref="scrollAreaRef" :class="cn('relative z-0 flex-1', props.contentClass)" :scrollbar="props.scrollbar" :on-wheel="onWheel">
      <slot />
      <ScrollBar v-if="props.horizontal" orientation="horizontal" :class="{ 'opacity-0 pointer-events-none': !props.scrollbar }" />
    </ScrollArea>
  </div>
</template>
