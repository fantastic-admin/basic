<script setup lang="ts">
import { cn } from '@/utils'
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import ScrollBar from './ScrollBar.vue'

const props = defineProps<ScrollAreaRootProps & {
  class?: HTMLAttributes['class']
  scrollbar?: boolean
  onWheel?: (event: WheelEvent) => void
  onScroll?: (event: Event) => void
}>()

const delegatedProps = computed(() => {
  const { class: _, onWheel, ...delegated } = props

  return delegated
})

const viewportRef = useTemplateRef('viewportRef')

defineExpose({
  el: viewportRef,
})
</script>

<template>
  <ScrollAreaRoot v-bind="delegatedProps" :class="cn('relative overflow-hidden', props.class)">
    <ScrollAreaViewport ref="viewportRef" class="h-full w-full rounded-[inherit]" @wheel.prevent="onWheel" @scroll="onScroll">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar :class="{ 'opacity-0 pointer-events-none': !props.scrollbar }" />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
