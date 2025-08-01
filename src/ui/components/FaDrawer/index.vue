<script setup lang="ts">
import type { DrawerEmits, DrawerProps } from '.'
import { VisuallyHidden } from 'reka-ui'
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
  defineProps<DrawerProps>(),
  {
    modelValue: false,
    zIndex: 2000,
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
    destroyOnClose: true,
  },
)

const emits = defineEmits<DrawerEmits>()

const slots = defineSlots<{
  header?: () => VNode
  default?: () => VNode
  footer?: () => VNode
}>()

const drawerId = shallowRef(props.id ?? useId())
const isOpen = ref(props.modelValue)

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
  if (!props.closeOnClickOverlay || (e.target as HTMLElement).dataset.drawerId !== drawerId.value) {
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
    isClosed.value = true
  }
}
</script>

<template>
  <Sheet :modal="false" :open="isOpen" @update:open="updateOpen">
    <SheetContent
      :drawer-id="drawerId"
      :open="isOpen"
      :z-index="props.zIndex"
      :closable="props.closable"
      :overlay="props.overlay"
      :overlay-blur="props.overlayBlur"
      :class="cn('w-full flex flex-col gap-0 p-0', props.contentClass, {
        hidden: isClosed,
      })"
      :side="props.side"
      :force-mount="forceMount"
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
        <VisuallyHidden v-if="!!slots.header">
          <SheetTitle />
          <SheetDescription />
        </VisuallyHidden>
        <slot name="header">
          <SheetTitle :class="{ 'text-center': props.centered }">
            {{ title }}
          </SheetTitle>
          <SheetDescription class="empty:hidden" :class="{ 'text-center': props.centered }">
            {{ description }}
          </SheetDescription>
        </slot>
      </SheetHeader>
      <VisuallyHidden v-else>
        <SheetTitle />
        <SheetDescription />
      </VisuallyHidden>
      <div class="m-0 flex-1 of-y-hidden">
        <FaScrollArea v-if="!!slots.default" class="h-full">
          <div class="p-4">
            <slot />
          </div>
          <div v-show="props.loading" class="absolute inset-0 z-1000 size-full flex-center bg-popover/75">
            <FaIcon name="i-line-md:loading-twotone-loop" class="size-10" />
          </div>
        </FaScrollArea>
      </div>
      <SheetFooter
        v-if="footer" :class="cn('p-3 gap-y-2', props.footerClass, {
          'sm:justify-center': props.centered,
          'border-t': props.bordered,
        })"
      >
        <slot name="footer">
          <FaButton v-if="showCancelButton" variant="outline" @click="onCancel">
            {{ cancelButtonText }}
          </FaButton>
          <FaButton v-if="showConfirmButton" :disabled="confirmButtonDisabled" :loading="confirmButtonLoading" @click="onConfirm">
            {{ confirmButtonText }}
          </FaButton>
        </slot>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
