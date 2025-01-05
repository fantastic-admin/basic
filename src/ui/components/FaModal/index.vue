<script setup lang="ts">
import type { ModalEmits, ModalProps } from '.'
import { cn } from '@/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog'

defineOptions({
  name: 'FaModal',
})

const props = withDefaults(
  defineProps<ModalProps>(),
  {
    modelValue: false,
    loading: false,
    closable: true,
    maximize: false,
    maximizable: false,
    centered: false,
    bordered: true,
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
  },
)

const emits = defineEmits<ModalEmits>()

const slots = defineSlots<{
  header?: () => VNode
  default?: () => VNode
  footer?: () => VNode
}>()

const isOpen = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  isOpen.value = newValue
})

function updateOpen(value: boolean) {
  isOpen.value = value
  emits('update:modelValue', value)
  if (value) {
    emits('open')
  }
  else {
    emits('close')
  }
}

const isMaximize = ref(props.maximize)

function onConfirm() {
  updateOpen(false)
  emits('confirm')
}

function onCancel() {
  updateOpen(false)
  emits('cancel')
}

function handleFocusOutside(e: Event) {
  e.preventDefault()
  e.stopPropagation()
}

function handleClickOutside(e: Event) {
  if (!props.closeOnClickOverlay) {
    e.preventDefault()
  }
}

function handleEscapeKeyDown(e: KeyboardEvent) {
  if (!props.closeOnPressEscape) {
    e.preventDefault()
  }
}

function handleMaximize(val: boolean) {
  isMaximize.value = val
}

function handleAnimationEnd() {
  if (isOpen.value) {
    emits('opened')
  }
  else {
    emits('closed')
  }
}
</script>

<template>
  <Dialog :modal="props.overlay" :open="isOpen" @update:open="updateOpen">
    <DialogContent
      :closable="props.closable"
      :overlay-blur="props.overlayBlur"
      :maximize="isMaximize"
      :maximizable="props.maximizable"
      :class="cn('flex flex-col p-0 gap-0 max-h-full sm:max-h-[90vh] duration-0', props.class, {
        'size-full max-w-full max-h-full sm:max-h-full': isMaximize,
      })"
      @close-auto-focus="handleFocusOutside"
      @focus-outside="handleFocusOutside"
      @pointer-down-outside="handleClickOutside"
      @interact-outside="handleClickOutside"
      @escape-key-down="handleEscapeKeyDown"
      @toggle-maximize="handleMaximize"
      @animation-end="handleAnimationEnd"
    >
      <DialogHeader
        v-if="header" :class="cn('p-4', props.headerClass, {
          'border-b': props.bordered,
        })"
      >
        <slot name="header">
          <DialogTitle class="flex-center-start gap-x-2" :class="{ 'justify-center': props.centered }">
            <FaIcon
              v-if="props.icon" :name="{
                info: 'i-ant-design:info-circle-filled',
                success: 'i-ant-design:check-circle-filled',
                warning: 'i-ant-design:exclamation-circle-filled',
                error: 'i-ant-design:close-circle-filled',
              }[props.icon]" :size="24" :class="{
                'text-blue-600 dark:text-blue-400': props.icon === 'info',
                'text-green-600 dark:text-green-400': props.icon === 'success',
                'text-yellow-600 dark:text-yellow-400': props.icon === 'warning',
                'text-red-600 dark:text-red-400': props.icon === 'error',
              }"
            />
            {{ title }}
          </DialogTitle>
          <DialogDescription v-if="!!description" :class="{ 'text-center': props.centered }">
            {{ description }}
          </DialogDescription>
        </slot>
      </DialogHeader>
      <div
        v-if="!!slots.default" :class="cn('relative min-h-40 flex-1 p-4 of-y-auto', props.contentClass, {
          'of-hidden': props.loading,
        })"
      >
        <slot />
        <div v-show="props.loading" class="absolute inset-0 z-1000 size-full flex-center bg-popover/75">
          <FaIcon name="i-line-md:loading-twotone-loop" :size="36" />
        </div>
      </div>
      <DialogFooter
        v-if="footer" :class="cn('p-2 gap-y-2', props.footerClass, {
          'sm:justify-center': props.centered,
          'border-t': props.bordered,
        })"
      >
        <slot name="footer">
          <FaButton v-if="showCancelButton" variant="outline" @click="onCancel">
            {{ cancelButtonText }}
          </FaButton>
          <FaButton v-if="showConfirmButton" @click="onConfirm">
            {{ confirmButtonText }}
          </FaButton>
        </slot>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
