<script setup lang="ts">
import type { CSSProperties } from 'vue'

type SnapSide = 'left' | 'right'

const EDGE_OFFSET = 4
const DRAG_THRESHOLD = 8
const DEFAULT_BUTTON_SIZE = 40

const appSettingsStore = useAppSettingsStore()
const buttonRef = useTemplateRef('buttonRef')

const buttonState = ref({
  initialized: false,
  width: DEFAULT_BUTTON_SIZE,
  height: DEFAULT_BUTTON_SIZE,
  left: EDGE_OFFSET,
  top: EDGE_OFFSET,
  snapSide: 'left' as SnapSide,
})

const dragState = ref({
  pointerId: -1,
  active: false,
  moved: false,
  suppressClick: false,
  startX: 0,
  startY: 0,
  startLeft: 0,
  startTop: 0,
})

const buttonStyle = computed<CSSProperties>(() => ({
  left: buttonState.value.initialized
    ? `${buttonState.value.left}px`
    : `${EDGE_OFFSET}px`,
  right: buttonState.value.initialized
    ? 'auto'
    : 'auto',
  top: buttonState.value.initialized
    ? `${buttonState.value.top}px`
    : 'auto',
  bottom: buttonState.value.initialized
    ? 'auto'
    : `${EDGE_OFFSET}px`,
  transition: dragState.value.active ? 'none' : 'left 200ms ease, top 200ms ease',
  willChange: 'left, top',
}))

function getButtonElement() {
  const el = buttonRef.value?.$el
  return el instanceof HTMLElement ? el : null
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getViewportBounds() {
  return {
    minLeft: EDGE_OFFSET,
    maxLeft: Math.max(EDGE_OFFSET, window.innerWidth - buttonState.value.width - EDGE_OFFSET),
    minTop: EDGE_OFFSET,
    maxTop: Math.max(EDGE_OFFSET, window.innerHeight - buttonState.value.height - EDGE_OFFSET),
  }
}

function syncButtonMetrics() {
  const rect = getButtonElement()?.getBoundingClientRect()
  if (!rect) {
    return
  }
  buttonState.value.width = rect.width || DEFAULT_BUTTON_SIZE
  buttonState.value.height = rect.height || DEFAULT_BUTTON_SIZE
}

function setButtonPosition(left = buttonState.value.left, top = buttonState.value.top) {
  const bounds = getViewportBounds()
  buttonState.value.left = clamp(left, bounds.minLeft, bounds.maxLeft)
  buttonState.value.top = clamp(top, bounds.minTop, bounds.maxTop)
}

function snapToSide(side: SnapSide) {
  const bounds = getViewportBounds()
  buttonState.value.snapSide = side
  buttonState.value.left = side === 'left' ? bounds.minLeft : bounds.maxLeft
  buttonState.value.top = clamp(buttonState.value.top, bounds.minTop, bounds.maxTop)
}

function syncPositionToViewport() {
  syncButtonMetrics()
  const bounds = getViewportBounds()
  buttonState.value.top = clamp(buttonState.value.top, bounds.minTop, bounds.maxTop)
  buttonState.value.left = buttonState.value.snapSide === 'right'
    ? bounds.maxLeft
    : clamp(buttonState.value.left, bounds.minLeft, bounds.maxLeft)
}

async function initializeButtonPosition() {
  if (appSettingsStore.mode !== 'mobile') {
    return
  }

  await nextTick()
  syncButtonMetrics()
  if (!getButtonElement()) {
    return
  }

  if (!buttonState.value.initialized) {
    const bounds = getViewportBounds()
    buttonState.value.snapSide = 'left'
    buttonState.value.left = bounds.minLeft
    buttonState.value.top = bounds.maxTop
    buttonState.value.initialized = true
  }

  setButtonPosition()
}

function handlePointerDown(event: PointerEvent) {
  if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) {
    return
  }

  const target = event.currentTarget
  if (!(target instanceof HTMLElement)) {
    return
  }

  syncButtonMetrics()
  dragState.value.pointerId = event.pointerId
  dragState.value.active = true
  dragState.value.moved = false
  dragState.value.startX = event.clientX
  dragState.value.startY = event.clientY
  dragState.value.startLeft = buttonState.value.left
  dragState.value.startTop = buttonState.value.top
  target.setPointerCapture?.(event.pointerId)
}

function handlePointerMove(event: PointerEvent) {
  if (!dragState.value.active || dragState.value.pointerId !== event.pointerId) {
    return
  }

  const deltaX = event.clientX - dragState.value.startX
  const deltaY = event.clientY - dragState.value.startY

  if (!dragState.value.moved && Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) {
    return
  }

  dragState.value.moved = true
  setButtonPosition(dragState.value.startLeft + deltaX, dragState.value.startTop + deltaY)
}

function finishDrag(target?: EventTarget | null) {
  const pointerId = dragState.value.pointerId
  const shouldSuppressClick = dragState.value.moved

  dragState.value.pointerId = -1
  dragState.value.active = false
  dragState.value.moved = false

  if (target instanceof HTMLElement && pointerId >= 0 && target.hasPointerCapture?.(pointerId)) {
    target.releasePointerCapture(pointerId)
  }

  if (shouldSuppressClick) {
    const nextSide: SnapSide = buttonState.value.left + buttonState.value.width / 2 <= window.innerWidth / 2 ? 'left' : 'right'
    snapToSide(nextSide)
  }

  dragState.value.suppressClick = shouldSuppressClick
}

function handlePointerUp(event: PointerEvent) {
  if (dragState.value.pointerId !== event.pointerId) {
    return
  }
  finishDrag(event.currentTarget)
}

function handlePointerCancel(event: PointerEvent) {
  if (dragState.value.pointerId !== event.pointerId) {
    return
  }
  finishDrag(event.currentTarget)
}

function handleLostPointerCapture(event: PointerEvent) {
  if (dragState.value.active && dragState.value.pointerId === event.pointerId) {
    finishDrag(event.currentTarget)
  }
}

function handleClick() {
  if (dragState.value.suppressClick) {
    dragState.value.suppressClick = false
    return
  }
  appSettingsStore.toggleSidebarCollapse()
}

function handleViewportResize() {
  if (appSettingsStore.mode !== 'mobile' || !buttonState.value.initialized) {
    return
  }
  syncPositionToViewport()
}

watch(() => appSettingsStore.mode, async (mode) => {
  if (mode === 'mobile') {
    await initializeButtonPosition()
    return
  }

  dragState.value.pointerId = -1
  dragState.value.active = false
  dragState.value.moved = false
}, {
  immediate: true,
})

onMounted(() => {
  window.addEventListener('resize', handleViewportResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleViewportResize)
})
</script>

<template>
  <FaButton
    v-if="appSettingsStore.mode === 'mobile' && !appSettingsStore.settings.topbar.toolbar"
    ref="buttonRef"
    variant="outline"
    size="icon"
    class="rounded-full size-10 select-none shadow-sm fixed z-1008 touch-none"
    :class="{ 'cursor-grabbing': dragState.active, 'cursor-grab': !dragState.active }"
    :style="buttonStyle"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
    @pointercancel="handlePointerCancel"
    @lostpointercapture="handleLostPointerCapture"
    @click="handleClick"
  >
    <FaIcon name="app-toolbar-collapse" class="size-4 rotate-180" />
  </FaButton>
</template>
