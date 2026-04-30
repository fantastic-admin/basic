<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit, useScrollLock } from '@vueuse/core'
import { X } from 'lucide-vue-next'
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../../../utils'
import SheetOverlay from './SheetOverlay.vue'

interface SheetContentProps extends DialogContentProps {
  drawerId: string
  open?: boolean
  zIndex?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  closable?: boolean
  overlay?: boolean
  overlayBlur?: boolean
  class?: HTMLAttributes['class']
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SheetContentProps>(), {
  side: 'right',
})
const emits = defineEmits<DialogContentEmits & {
  animationEnd: []
}>()

const delegatedProps = reactiveOmit(props, 'class', 'side')

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const sheetContentRef = useTemplateRef<ComponentPublicInstance<typeof DialogContent>>('sheetContentRef')

defineExpose({
  el: sheetContentRef,
})

const showOverlay = computed(() => props.open && props.overlay)
const isLocked = useScrollLock(document.body)
watch(showOverlay, (val) => {
  if (val) {
    isLocked.value = true
  }
  else {
    isLocked.value = false
  }
})
</script>

<template>
  <DialogPortal>
    <Transition
      v-bind="{
        enterActiveClass: 'ease-in-out duration-300',
        enterFromClass: 'opacity-0',
        enterToClass: 'opacity-100',
        leaveActiveClass: 'ease-in-out duration-300',
        leaveFromClass: 'opacity-100',
        leaveToClass: 'opacity-0',
      }"
      :appear="true"
    >
      <div
        v-if="showOverlay"
        :data-drawer-id="props.drawerId"
        :class="cn('fixed inset-0 pointer-events-auto data-[state=closed]:animate-out data-[state=open]:animate-in bg-black/50 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0', {
          'backdrop-blur-sm': props.overlayBlur,
        })"
        :style="{
          zIndex: props.zIndex,
        }"
      />
    </Transition>
    <SheetOverlay />
    <DialogContent
      ref="sheetContentRef"
      data-slot="sheet-content"
      :class="cn(
        'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
        side === 'right'
          && 'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
        side === 'left'
          && 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        side === 'top'
          && 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
        side === 'bottom'
          && 'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
        props.class)"
      :style="{
        zIndex: props.zIndex,
      }"
      v-bind="{ ...$attrs, ...forwarded }"
      @animationend="emits('animationEnd')"
    >
      <slot />
      <DialogClose
        v-if="closable"
        class="rounded-xs opacity-70 ring-offset-background transition-opacity right-4 top-4 absolute focus:outline-hidden data-[state=open]:bg-secondary hover:opacity-100 disabled:pointer-events-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <X class="size-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
