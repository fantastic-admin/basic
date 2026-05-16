<script setup lang="ts">
import { VisuallyHidden } from 'reka-ui'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import ButtonGroup from '../button-group/index.vue'
import Button from '../button/index.vue'
import Icon from '../icon/index.vue'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './dialog'

const props = defineProps<{
  src: string | string[]
  index?: number
}>()

const isOpen = defineModel<boolean>()

// 多图操作
const index = ref(props.index ?? 0)
const srcList = computed(() => {
  if (Array.isArray(props.src)) {
    return props.src
  }
  return [props.src]
})
function handlePrev() {
  index.value = index.value - 1
  if (index.value < 0) {
    index.value = srcList.value.length - 1
  }
}
function handleNext() {
  index.value = index.value + 1
  if (index.value >= srcList.value.length) {
    index.value = 0
  }
}
watch(index, resetImageState)

// 图片操作相关状态
const scale = ref(1)
const rotate = ref(0)
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })

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
  <Dialog v-model:open="isOpen">
    <DialogContent @animation-end="handleAnimationEnd">
      <VisuallyHidden>
        <DialogTitle />
        <DialogDescription />
      </VisuallyHidden>
      <div class="flex-center size-full relative" @wheel="handleWheel">
        <img
          :src="srcList[index]"
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
        <template v-if="srcList.length > 1">
          <div class="text-sm text-muted-foreground bottom-20 left-1/2 absolute -translate-x-1/2">
            {{ index + 1 }} / {{ srcList.length }}
          </div>
          <Button variant="ghost" size="icon" class="rounded-full bg-muted/50 scale-125 left-4 top-1/2 absolute backdrop-blur-xs -translate-y-1/2" @click="handlePrev">
            <Icon name="i-lucide:chevron-left" class="size-6" />
          </Button>
          <Button variant="ghost" size="icon" class="rounded-full bg-muted/50 scale-125 right-4 top-1/2 absolute backdrop-blur-xs -translate-y-1/2" @click="handleNext">
            <Icon name="i-lucide:chevron-right" class="size-6" />
          </Button>
        </template>
        <ButtonGroup class="scale-125 bottom-4 left-1/2 absolute backdrop-blur-xs -translate-x-1/2">
          <Button variant="outline" size="icon" class="border-none bg-muted/50" @click="handleZoomIn">
            <Icon name="i-carbon:zoom-in" class="size-5" />
          </Button>
          <Button variant="outline" size="icon" class="border-none bg-muted/50" @click="handleZoomOut">
            <Icon name="i-carbon:zoom-out" class="size-5" />
          </Button>
          <Button variant="outline" size="icon" class="border-none bg-muted/50" @click="handleOriginalSize">
            <Icon name="i-lucide:maximize" class="size-5" />
          </Button>
          <Button variant="outline" size="icon" class="border-none bg-muted/50" @click="handleRotateLeft">
            <Icon name="i-carbon:rotate" class="size-5" />
          </Button>
          <Button variant="outline" size="icon" class="border-none bg-muted/50" @click="handleRotateRight">
            <Icon name="i-carbon:rotate-180" class="size-5" />
          </Button>
        </ButtonGroup>
      </div>
    </DialogContent>
  </Dialog>
</template>
