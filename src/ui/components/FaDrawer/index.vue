<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './sheet'

defineOptions({
  name: 'FaDrawer',
})

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    side?: 'top' | 'bottom' | 'left' | 'right'
    title: string
    description?: string
    loading?: boolean
    closable?: boolean
    centered?: boolean
    bordered?: boolean
    overlay?: boolean
    overlayBlur?: boolean
    showConfirmButton?: boolean
    showCancelButton?: boolean
    confirmButtonText?: string
    cancelButtonText?: string
    confirmButtonDisabled?: boolean
    confirmButtonLoading?: boolean
    header?: boolean
    footer?: boolean
    closeOnClickOverlay?: boolean
    closeOnPressEscape?: boolean
    contentClass?: HTMLAttributes['class']
    headerClass?: HTMLAttributes['class']
    footerClass?: HTMLAttributes['class']
  }>(),
  {
    modelValue: false,
    side: 'right',
    loading: false,
    closable: true,
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

const emits = defineEmits<{
  'update:modelValue': [value: boolean]
  'open': []
  'opened': []
  'close': []
  'closed': []
  'confirm': []
  'cancel': []
}>()

const id = useId()
provide('DrawerId', id)

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
  if (!props.closeOnClickOverlay || (e.target as HTMLElement).dataset.drawerId !== id) {
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
  <Sheet :modal="false" :open="isOpen" @update:open="updateOpen">
    <SheetContent
      :closable="props.closable"
      :open="isOpen"
      :overlay="props.overlay"
      :overlay-blur="props.overlayBlur"
      :class="cn('w-full flex flex-col gap-0 p-0', props.contentClass)"
      :side="props.side"
      @open-auto-focus="handleFocusOutside"
      @close-auto-focus="handleFocusOutside"
      @focus-outside="handleFocusOutside"
      @pointer-down-outside="handleClickOutside"
      @interact-outside="handleClickOutside"
      @escape-key-down="handleEscapeKeyDown"
      @animation-end="handleAnimationEnd"
    >
      <SheetHeader
        v-if="header" :class="cn('p-4 gap-y-1', props.headerClass, {
          'border-b': props.bordered,
        })"
      >
        <slot name="header">
          <SheetTitle :class="{ 'text-center': props.centered }">
            {{ title }}
          </SheetTitle>
          <SheetDescription class="empty:hidden" :class="{ 'text-center': props.centered }">
            {{ description }}
          </SheetDescription>
        </slot>
      </SheetHeader>
      <div class="m-0 flex-1 of-y-hidden">
        <FaScrollArea class="h-full">
          <div class="p-4">
            <slot />
          </div>
        </FaScrollArea>
        <div v-show="props.loading" class="absolute inset-0 z-1000 size-full flex-center bg-popover/75">
          <FaIcon name="i-line-md:loading-twotone-loop" class="size-10" />
        </div>
      </div>
      <SheetFooter
        v-if="footer" :class="cn('p-2 gap-y-2', props.footerClass, {
          'sm:justify-center': props.centered,
          'border-t': props.bordered,
        })"
      >
        <slot name="footer">
          <FaButton variant="outline" @click="onCancel">
            {{ cancelButtonText }}
          </FaButton>
          <FaButton @click="onConfirm">
            {{ confirmButtonText }}
          </FaButton>
        </slot>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
