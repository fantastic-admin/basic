/**
 * fork: https://github.com/element-plus/element-plus/blob/dev/packages/hooks/use-draggable/index.ts
 * reference: https://github.com/vbenjs/vue-vben-admin/blob/main/packages/%40core/ui-kit/popup-ui/src/modal/use-modal-draggable.ts
 */

import type { ComputedRef, Ref } from 'vue'
import { unrefElement } from '@vueuse/core'

export function useDraggable(
  targetRef: Ref<HTMLElement | undefined>,
  dragRef: Ref<HTMLElement | undefined>,
  draggable: ComputedRef<boolean>,
  overflow?: ComputedRef<boolean>,
) {
  const isDragging = ref(false)
  const transform = reactive({
    offsetX: 0,
    offsetY: 0,
  })

  const onMousedown = (e: MouseEvent) => {
    const downX = e.clientX
    const downY = e.clientY
    const { offsetX, offsetY } = transform

    const targetRect = targetRef.value!.getBoundingClientRect()
    const targetLeft = targetRect.left
    const targetTop = targetRect.top
    const targetWidth = targetRect.width
    const targetHeight = targetRect.height

    const clientWidth = document.documentElement.clientWidth
    const clientHeight = document.documentElement.clientHeight

    const minLeft = -targetLeft + offsetX
    const minTop = -targetTop + offsetY
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX
    const maxTop = clientHeight - targetTop - targetHeight + offsetY

    const onMousemove = (e: MouseEvent) => {
      let moveX = offsetX + e.clientX - downX
      let moveY = offsetY + e.clientY - downY

      if (!overflow?.value) {
        moveX = Math.min(Math.max(moveX, minLeft), maxLeft)
        moveY = Math.min(Math.max(moveY, minTop), maxTop)
      }

      transform.offsetX = moveX
      transform.offsetY = moveY

      if (targetRef.value) {
        isDragging.value = true
        targetRef.value.style.transform = `translate(${moveX}px, ${moveY}px)`
      }
    }

    const onMouseup = () => {
      isDragging.value = false
      document.removeEventListener('mousemove', onMousemove)
      document.removeEventListener('mouseup', onMouseup)
    }

    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
  }

  const onDraggable = () => {
    const dragRefElement = unrefElement(dragRef)
    if (dragRefElement && targetRef.value) {
      dragRefElement.addEventListener('mousedown', onMousedown)
    }
  }

  const offDraggable = () => {
    const dragRefElement = unrefElement(dragRef)
    if (dragRefElement && targetRef.value) {
      dragRefElement.removeEventListener('mousedown', onMousedown)
    }
  }

  const resetPosition = () => {
    transform.offsetX = 0
    transform.offsetY = 0
    if (targetRef.value) {
      targetRef.value.style.transform = 'none'
    }
  }

  onMounted(() => {
    watchEffect(() => {
      if (draggable.value) {
        onDraggable()
      }
      else {
        offDraggable()
      }
    })
  })

  onBeforeUnmount(() => {
    offDraggable()
  })

  return {
    isDragging,
    transform,
    resetPosition,
  }
}
