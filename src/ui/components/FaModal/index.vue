<script setup lang="ts">
import type { ModalEmits, ModalProps } from '.'
import { VisuallyHidden } from 'reka-ui'
import { cn } from '@/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog'
import { useDraggable } from './use-draggable'

defineOptions({
  name: 'FaModal',
})

const props = withDefaults(
  defineProps<ModalProps>(),
  {
    modelValue: false,
    zIndex: 2000,
    loading: false,
    closable: true,
    maximize: false,
    maximizable: false,
    draggable: false,
    center: false,
    border: true,
    alignCenter: false,
    overlay: true,
    overlayBlur: false,
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    confirmButtonDisabled: false,
    confirmButtonLoading: false,
    header: true,
    footer: true,
    closeOnClickOverlay: true,
    closeOnPressEscape: true,
    destroyOnClose: true,
  },
)

const emits = defineEmits<ModalEmits>()

const slots = defineSlots<{
  header?: () => VNode
  default?: () => VNode
  footer?: () => VNode
}>()

const dialogContentRef = useTemplateRef('dialogContentRef')
const dialogHeaderRef = ref()
const dialogAreaRef = useTemplateRef('dialogAreaRef')
const dialogRef = ref()

defineExpose({
  areaRef: dialogAreaRef,
})

const modalId = shallowRef(props.id ?? useId())
const isOpen = ref(props.modelValue)
const isMaximize = ref(props.maximize)

watch(() => props.modelValue, (newValue) => {
  isOpen.value = newValue
})

const hasOpened = ref(false)
const isClosed = ref(true)

watch(isOpen, (val) => {
  emits('update:modelValue', val)
  if (val) {
    emits('open')
  }
  else {
    emits('close')
  }
  isClosed.value = false
  if (val && !hasOpened.value) {
    hasOpened.value = true
  }
}, {
  immediate: true,
})

const forceMount = computed(() => !props.destroyOnClose && hasOpened.value)

const { isDragging, transform } = useDraggable(
  dialogRef,
  dialogHeaderRef,
  computed(() => props.draggable && props.header && !isMaximize.value),
)
function setTransform() {
  if (isMaximize.value) {
    dialogRef.value.style.transform = 'none'
  }
  else {
    dialogRef.value.style.transform = `translate(${transform.offsetX}px, ${transform.offsetY}px)`
  }
}

watch(isOpen, (val) => {
  if (val) {
    nextTick(() => {
      if (dialogContentRef.value) {
        dialogRef.value = dialogContentRef.value.el?.$el
        setTransform()
      }
    })
  }
})

async function updateOpen(value: boolean) {
  if (value) {
    isOpen.value = value
    emits('open')
  }
  else {
    if (props.beforeClose) {
      await props.beforeClose(
        'close',
        () => {
          isOpen.value = value
          emits('close')
        },
      )
    }
    else {
      isOpen.value = value
      emits('close')
    }
  }
}

const isConfirmButtonLoading = ref(false)

async function onConfirm() {
  if (props.beforeClose) {
    isConfirmButtonLoading.value = true
    await props.beforeClose(
      'confirm',
      () => {
        isOpen.value = false
        emits('confirm')
      },
    )
    isConfirmButtonLoading.value = false
  }
  else {
    isOpen.value = false
    emits('confirm')
  }
}

async function onCancel() {
  if (props.beforeClose) {
    await props.beforeClose(
      'cancel',
      () => {
        isOpen.value = false
        emits('cancel')
      },
    )
  }
  else {
    isOpen.value = false
    emits('cancel')
  }
}

function handleFocusOutside(e: Event) {
  e.preventDefault()
  e.stopPropagation()
}

function handleClickOutside(e: Event) {
  if (!props.closeOnClickOverlay || (e.target as HTMLElement).dataset.modalId !== modalId.value) {
    e.preventDefault()
    e.stopPropagation()
  }
}

function handleEscapeKeyDown(e: KeyboardEvent) {
  if (!props.closeOnPressEscape) {
    e.preventDefault()
    e.stopPropagation()
  }
}

function handleMaximize(val: boolean) {
  isMaximize.value = val
  setTransform()
}

function handleAnimationEnd() {
  if (isOpen.value) {
    emits('opened')
  }
  else {
    emits('closed')
    isClosed.value = true
  }
}
</script>

<template>
  <Dialog :modal="false" :open="isOpen" @update:open="updateOpen">
    <DialogContent
      ref="dialogContentRef"
      :modal-id="modalId"
      :open="isOpen"
      :z-index="props.zIndex"
      :closable="props.closable"
      :overlay="props.overlay"
      :overlay-blur="props.overlayBlur"
      :maximize="isMaximize"
      :maximizable="props.maximizable"
      :force-mount="forceMount"
      :class="cn('left-0 right-0 top-0 md:top-[5vh] flex flex-col p-0 gap-0 mx-auto h-[calc-size(auto,size)] min-h-full md:min-h-auto max-h-full md:max-h-[90vh] translate-x-0 translate-y-0', props.class, {
        'md:top-0 size-full max-w-full max-h-full md:max-h-full': isMaximize,
        'md:top-1/2 md:-translate-y-1/2!': props.alignCenter,
        'duration-0': isDragging,
        'hidden': isClosed,
      })"
      @open-auto-focus="handleFocusOutside"
      @close-auto-focus="handleFocusOutside"
      @focus-outside="handleFocusOutside"
      @pointer-down-outside="handleClickOutside"
      @interact-outside="handleClickOutside"
      @escape-key-down="handleEscapeKeyDown"
      @toggle-maximize="handleMaximize"
      @animation-end="handleAnimationEnd"
    >
      <DialogHeader
        v-if="header" ref="dialogHeaderRef" :class="cn('p-4', props.headerClass, {
          'cursor-move select-none': props.draggable,
          'border-b': props.border,
        })"
      >
        <VisuallyHidden v-if="!!slots.header">
          <DialogTitle />
          <DialogDescription />
        </VisuallyHidden>
        <slot name="header">
          <DialogTitle class="flex-center gap-x-2 md:justify-start" :class="{ 'md:justify-center': props.center }">
            <FaIcon
              v-if="props.icon" :name="{
                info: 'i-ant-design:info-circle-filled',
                success: 'i-ant-design:check-circle-filled',
                warning: 'i-ant-design:exclamation-circle-filled',
                error: 'i-ant-design:close-circle-filled',
              }[props.icon]" class="size-6" :class="{
                'text-blue-600 dark:text-blue-400': props.icon === 'info',
                'text-green-600 dark:text-green-400': props.icon === 'success',
                'text-yellow-600 dark:text-yellow-400': props.icon === 'warning',
                'text-red-600 dark:text-red-400': props.icon === 'error',
              }"
            />
            {{ title }}
          </DialogTitle>
          <DialogDescription class="empty:hidden" :class="{ 'text-center': props.center }">
            {{ description }}
          </DialogDescription>
        </slot>
      </DialogHeader>
      <VisuallyHidden v-else>
        <DialogTitle />
        <DialogDescription />
      </VisuallyHidden>
      <FaScrollArea v-if="!!slots.default" ref="dialogAreaRef" class="flex-1">
        <div :class="cn('min-h-40 p-4', props.contentClass)">
          <slot />
        </div>
        <div v-show="props.loading" class="absolute inset-0 z-1000 size-full flex-center bg-popover/75">
          <FaIcon name="i-line-md:loading-twotone-loop" class="size-10" />
        </div>
      </FaScrollArea>
      <DialogFooter
        v-if="footer" :class="cn('p-3 gap-y-2', props.footerClass, {
          'md:justify-center': props.center,
          'border-t': props.border,
        })"
      >
        <slot name="footer">
          <FaButton v-if="showCancelButton" variant="outline" @click="onCancel">
            {{ cancelButtonText }}
          </FaButton>
          <FaButton v-if="showConfirmButton" :disabled="confirmButtonDisabled" :loading="confirmButtonLoading || isConfirmButtonLoading" @click="onConfirm">
            {{ confirmButtonText }}
          </FaButton>
        </slot>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
