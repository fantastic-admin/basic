<script setup lang="ts">
import { cn } from '@/utils'
import { Maximize, Minimize, X } from 'lucide-vue-next'
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<DialogContentProps & {
  class?: HTMLAttributes['class']
  maximize?: boolean
  maximizable?: boolean
  closable?: boolean
  overlayBlur?: boolean
}>()
const emits = defineEmits<DialogContentEmits & {
  toggleMaximize: [val: boolean]
  animationEnd: []
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

function handleMaximize() {
  emits('toggleMaximize', !props.maximize)
}

const dialogContentRef = useTemplateRef('dialogContentRef')

defineExpose({
  el: dialogContentRef,
})
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      :class="cn('fixed inset-0 z-2000 data-[state=closed]:animate-out data-[state=open]:animate-in bg-black/50 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0', {
        'backdrop-blur-sm': props.overlayBlur,
      })"
    />
    <DialogContent
      ref="dialogContentRef"
      v-bind="forwarded"
      :class="
        cn(
          'fixed left-1/2 top-1/2 z-2000 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-0 data-[state=closed]:slide-out-to-top-1/5 data-[state=open]:slide-in-from-left-0 data-[state=open]:slide-in-from-top-1/5 sm:rounded-lg',
          props.class,
        )"
      @animationend="emits('animationEnd')"
    >
      <slot />
      <div class="absolute inset-e-4 top-4 flex-center gap-2">
        <button v-if="props.maximizable" class="rounded-sm bg-transparent opacity-70 ring-offset-background transition-opacity hidden disabled:pointer-events-none sm:inline-block data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring" @click="handleMaximize">
          <Maximize v-if="!props.maximize" class="h-4 w-4" />
          <Minimize v-else class="h-4 w-4" />
        </button>
        <DialogClose
          v-if="closable"
          class="rounded-sm bg-transparent opacity-70 ring-offset-background transition-opacity disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
        >
          <X class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </div>
    </DialogContent>
  </DialogPortal>
</template>
