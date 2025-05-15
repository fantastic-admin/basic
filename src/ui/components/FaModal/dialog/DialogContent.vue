<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import { useScrollLock } from '@vueuse/core'
import { Maximize, Minimize, X } from 'lucide-vue-next'
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<DialogContentProps & {
  class?: HTMLAttributes['class']
  open?: boolean
  maximize?: boolean
  maximizable?: boolean
  closable?: boolean
  overlay?: boolean
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

const id = inject('ModalId')
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
        :data-modal-id="id"
        :class="cn('fixed inset-0 z-2000 data-[state=closed]:animate-out data-[state=open]:animate-in bg-black/50 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0', {
          'backdrop-blur-sm': props.overlayBlur,
        })"
      />
    </Transition>
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
        <button v-if="props.maximizable" class="hidden rounded-sm bg-transparent opacity-70 ring-offset-background transition-opacity disabled:pointer-events-none sm:inline-block data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring" @click="handleMaximize">
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
