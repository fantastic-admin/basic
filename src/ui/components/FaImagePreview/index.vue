<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import { Dialog, DialogContent } from './dialog'

defineOptions({
  name: 'FaImagePreview',
})

const props = defineProps<{
  src: string
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  load: []
  error: []
}>()

const isLoading = ref(true)
const isError = ref(false)
const isOpen = ref(false)

// 图片操作相关状态
const scale = ref(1)
const rotate = ref(0)
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })

function handleLoad() {
  isLoading.value = false
  emits('load')
}

function handleError() {
  isError.value = true
  isLoading.value = false
  emits('error')
}

function handleClick() {
  if (!isError.value) {
    isOpen.value = true
  }
}

// 图片操作函数
function handleZoomIn() {
  scale.value = Math.min(scale.value + 0.25, 3)
}

function handleZoomOut() {
  scale.value = Math.max(scale.value - 0.25, 0.5)
}

function handleOriginalSize() {
  scale.value = 1
}

function handleRotateLeft() {
  rotate.value = rotate.value - 90
}

function handleRotateRight() {
  rotate.value = rotate.value + 90
}

// 处理滚轮缩放
function handleWheel(e: WheelEvent) {
  e.preventDefault()
  if (e.deltaY < 0) {
    handleZoomIn()
  }
  else {
    handleZoomOut()
  }
}

// 处理鼠标按下事件
function handleMouseDown(e: MouseEvent) {
  isDragging.value = true
  dragStart.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y,
  }
}

// 处理鼠标移动事件
function handleMouseMove(e: MouseEvent) {
  if (!isDragging.value) {
    return
  }
  position.value = {
    x: e.clientX - dragStart.value.x,
    y: e.clientY - dragStart.value.y,
  }
}

// 处理鼠标松开事件
function handleMouseUp() {
  isDragging.value = false
}

// 重置图片状态
function resetImageState() {
  scale.value = 1
  rotate.value = 0
  position.value = { x: 0, y: 0 }
}

// 监听鼠标事件
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
})

function handleAnimationEnd() {
  if (!isOpen.value) {
    resetImageState()
  }
}
</script>

<template>
  <div class="group/image-preview relative inline-block overflow-hidden border rounded-lg">
    <img
      :src="src"
      :class="cn('size-50 object-contain cursor-pointer bg-background transition-all duration-300 group-hover/image-preview:scale-110', props.class, {
        invisible: isError || isLoading,
      })"
      @error="handleError"
      @load="handleLoad"
      @click="!isLoading && !isError && handleClick()"
    >
    <div v-if="isLoading" class="absolute left-0 top-0 h-full w-full flex-center">
      <slot name="loading">
        <FaIcon name="i-line-md:loading-twotone-loop" class="size-8 text-secondary-foreground/50" />
      </slot>
    </div>
    <div v-if="isError" class="absolute left-0 top-0 h-full w-full flex-center">
      <slot name="error">
        <FaIcon name="i-ph:image-broken-duotone" class="size-8 text-secondary-foreground/50" />
      </slot>
    </div>
    <Dialog v-model:open="isOpen">
      <DialogContent class="size-full" @animation-end="handleAnimationEnd">
        <div class="relative size-full" @wheel="handleWheel">
          <img
            :src="src"
            class="mx-auto max-h-full max-w-full object-contain"
            :class="{
              'transition-all duration-300': !isDragging,
            }"
            :style="{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotate}deg)`,
              cursor: isDragging ? 'grabbing' : 'grab',
            }"
            @mousedown.prevent="handleMouseDown"
          >
          <FaButtonGroup class="absolute bottom-4 left-1/2 scale-125 -translate-x-1/2">
            <FaButton variant="outline" size="icon" class="border-none bg-muted/50" @click="handleZoomIn">
              <FaIcon name="i-carbon:zoom-in" class="size-5" />
            </FaButton>
            <FaButton variant="outline" size="icon" class="border-none bg-muted/50" @click="handleZoomOut">
              <FaIcon name="i-carbon:zoom-out" class="size-5" />
            </FaButton>
            <FaButton variant="outline" size="icon" class="border-none bg-muted/50" @click="handleOriginalSize">
              <FaIcon name="i-lucide:maximize" class="size-5" />
            </FaButton>
            <FaButton variant="outline" size="icon" class="border-none bg-muted/50" @click="handleRotateLeft">
              <FaIcon name="i-carbon:rotate" class="size-5" />
            </FaButton>
            <FaButton variant="outline" size="icon" class="border-none bg-muted/50" @click="handleRotateRight">
              <FaIcon name="i-carbon:rotate-180" class="size-5" />
            </FaButton>
          </FaButtonGroup>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
