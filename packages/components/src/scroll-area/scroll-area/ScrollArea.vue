<script setup lang="ts">
import type { ScrollAreaRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit, useResizeObserver } from '@vueuse/core'
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaViewport,
} from 'reka-ui'
import { cn } from '../../../utils'
import ScrollBar from './ScrollBar.vue'

const props = defineProps<ScrollAreaRootProps & {
  class?: HTMLAttributes['class']
  horizontal?: boolean
  scrollbar?: boolean
  mask?: boolean
  onScroll?: (event: Event) => void
  onWheel?: (event: WheelEvent) => void
}>()

const delegatedProps = reactiveOmit(props, 'class')

const viewportRef = useTemplateRef('viewportRef')
const canScroll = ref(false)

function checkCanScroll() {
  const el = viewportRef.value?.$el ?? viewportRef.value
  if (!el) {
    return
  }
  canScroll.value = props.horizontal
    ? el.scrollWidth > el.clientWidth
    : el.scrollHeight > el.clientHeight
}

useResizeObserver(computed(() => {
  const el = viewportRef.value?.$el ?? viewportRef.value
  // 同时观察 viewport 和其内容子元素，以便内容尺寸变化时也能触发
  return el ? [el, el.firstElementChild].filter(Boolean) : []
}), checkCanScroll)

defineExpose({
  el: viewportRef,
})
</script>

<template>
  <ScrollAreaRoot
    data-slot="scroll-area"
    v-bind="delegatedProps"
    :class="cn('relative overflow-hidden', props.class)"
  >
    <ScrollAreaViewport
      ref="viewportRef"
      data-slot="scroll-area-viewport"
      class="scroll-area-viewport outline-none rounded-[inherit] size-full transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50"
      :class="{
        'scroll-area-mask-vertical': props.mask && !props.horizontal,
        'scroll-area-mask-horizontal': props.mask && props.horizontal,
        'can-scroll': canScroll,
      }"
      :style="{ scrollTimelineName: '--scroll-area-mask-timeline', scrollTimelineAxis: props.horizontal ? 'x' : 'y' }"
      @scroll="onScroll"
      @wheel="onWheel"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollBar :class="{ 'opacity-0 pointer-events-none': !props.scrollbar }" />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<style scoped>
/* @property 必须定义在 @supports 外部才能生效 */
@property --mask-start {
  syntax: "<length-percentage>";
  initial-value: 0;
  inherits: false;
}

@property --mask-end {
  syntax: "<length-percentage>";
  initial-value: 0;
  inherits: false;
}

@supports (animation-timeline: auto) {
  @keyframes scroll-area-mask-start-in {
    from {
      --mask-start: 0;
    }

    to {
      --mask-start: 40px;
    }
  }

  @keyframes scroll-area-mask-end-out {
    from {
      --mask-end: 40px;
    }

    to {
      --mask-end: 0;
    }
  }

  /* 垂直滚动遮罩 */
  :deep(.scroll-area-mask-vertical.can-scroll) {
    --mask-end: 40px;
  }

  :deep(.scroll-area-mask-vertical) {
    mask-image:
      linear-gradient(
        to bottom,
        transparent,
        black var(--mask-start),
        black calc(100% - var(--mask-end)),
        transparent
      );
    animation:
      scroll-area-mask-start-in linear forwards,
      scroll-area-mask-end-out linear forwards;
    animation-range: 0 40px, calc(100% - 40px) 100%;
    animation-timeline: --scroll-area-mask-timeline, --scroll-area-mask-timeline;
  }

  /* 水平滚动遮罩 */
  :deep(.scroll-area-mask-horizontal.can-scroll) {
    --mask-end: 40px;
  }

  :deep(.scroll-area-mask-horizontal) {
    mask-image:
      linear-gradient(
        to right,
        transparent,
        black var(--mask-start),
        black calc(100% - var(--mask-end)),
        transparent
      );
    animation:
      scroll-area-mask-start-in linear forwards,
      scroll-area-mask-end-out linear forwards;
    animation-range: 0 40px, calc(100% - 40px) 100%;
    animation-timeline: --scroll-area-mask-timeline, --scroll-area-mask-timeline;
  }
}

:deep(.scroll-area-viewport > div) {
  height: 100%;
}
</style>
