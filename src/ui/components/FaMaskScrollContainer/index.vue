<script setup lang="ts">
import { useElementSize, useScroll } from '@vueuse/core'

defineOptions({
  name: 'FaMaskScrollContainer',
})

const props = withDefaults(
  defineProps<{
    scroll?: 'x' | 'y'
    gradientColor?: string
  }>(),
  {
    scroll: 'y',
    gradientColor: 'hsl(var(--background))',
  },
)

const maskScrollContainerOuterRef = useTemplateRef('maskScrollContainerOuterRef')
const maskScrollContainerInnerRef = useTemplateRef('maskScrollContainerInnerRef')

const showMaskStart = ref(false)
const showMaskEnd = ref(false)

function updateMask() {
  if (props.scroll === 'x') {
    const scrollLeft = maskScrollContainerOuterRef.value?.scrollLeft ?? 0
    showMaskStart.value = scrollLeft > 0
    const clientWidth = maskScrollContainerOuterRef.value?.clientWidth ?? 0
    const scrollWidth = maskScrollContainerOuterRef.value?.scrollWidth ?? 0
    showMaskEnd.value = Math.ceil(scrollLeft + clientWidth) < scrollWidth
  }
  else {
    const scrollTop = maskScrollContainerOuterRef.value?.scrollTop ?? 0
    showMaskStart.value = scrollTop > 0
    const clientHeight = maskScrollContainerOuterRef.value?.clientHeight ?? 0
    const scrollHeight = maskScrollContainerOuterRef.value?.scrollHeight ?? 0
    showMaskEnd.value = Math.ceil(scrollTop + clientHeight) < scrollHeight
  }
}

function onWheel(event: WheelEvent) {
  if (props.scroll === 'x') {
    maskScrollContainerOuterRef.value?.scrollBy({
      left: event.deltaY || event.detail,
    })
  }
  else {
    maskScrollContainerOuterRef.value?.scrollBy({
      top: event.deltaY || event.detail,
    })
  }
}

const { x, y } = useScroll(maskScrollContainerOuterRef)
watch([() => x.value, () => y.value], updateMask)

const { width, height } = useElementSize(maskScrollContainerInnerRef)
watch([() => width.value, () => height.value], () => {
  if (width.value > 0 || height.value > 0) {
    updateMask()
  }
}, {
  immediate: true,
})

function scrollTo(scrollNumber: number) {
  if (props.scroll === 'x') {
    maskScrollContainerOuterRef.value?.scrollTo({
      left: scrollNumber,
      behavior: 'smooth',
    })
  }
  else {
    maskScrollContainerOuterRef.value?.scrollTo({
      top: scrollNumber,
      behavior: 'smooth',
    })
  }
}

defineExpose({
  ref: useTemplateRef('maskScrollContainerRef'),
  scrollTo,
})
</script>

<template>
  <div
    ref="maskScrollContainerRef" class="relative flex overflow-hidden after:(pointer-events-none absolute z-1 from-transparent to-[var(--mask-scroll-container-gradient-color)] opacity-0 transition-opacity content-empty) before:(pointer-events-none absolute z-1 from-transparent to-[var(--mask-scroll-container-gradient-color)] opacity-0 transition-opacity content-empty)" :class="{
      'after:(bg-gradient-to-r h-full w-12 right-0) before:(bg-gradient-to-l h-full w-12)': props.scroll === 'x',
      'after:(bg-gradient-to-b h-12 w-full bottom-0) before:(bg-gradient-to-t h-12 w-full)': props.scroll === 'y',
      'before:(opacity-100!)': showMaskStart,
      'after:(opacity-100!)': showMaskEnd,
    }" :style="{
      '--mask-scroll-container-gradient-color': props.gradientColor,
    }"
  >
    <div ref="maskScrollContainerOuterRef" class="relative z-0 flex-1 overflow-auto scrollbar-none" @wheel.prevent="onWheel">
      <div ref="maskScrollContainerInnerRef" class="h-full w-full">
        <slot />
      </div>
    </div>
  </div>
</template>
