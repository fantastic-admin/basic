<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Maximize, Minimize, X } from 'lucide-vue-next'
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../../../utils'
import DialogOverlay from './DialogOverlay.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<DialogContentProps & {
  modalId: string
  open?: boolean
  zIndex?: number
  maximize?: boolean
  maximizable?: boolean
  closable?: boolean
  overlay?: boolean
  overlayBlur?: boolean
  class?: HTMLAttributes['class']
}>()
const emits = defineEmits<DialogContentEmits & {
  toggleMaximize: [val: boolean]
  animationEnd: []
}>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)

function handleMaximize() {
  emits('toggleMaximize', !props.maximize)
}

const dialogContentRef = useTemplateRef<ComponentPublicInstance<typeof DialogContent>>('dialogContentRef')

defineExpose({
  el: dialogContentRef,
})

const showOverlay = computed(() => props.open && props.overlay)
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
        :data-modal-id="props.modalId"
        :class="cn('fixed inset-0 pointer-events-auto data-[state=closed]:animate-out data-[state=open]:animate-in bg-black/50 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0', {
          'backdrop-blur-sm': props.overlayBlur,
        })"
        :style="{
          zIndex: props.zIndex,
        }"
      />
    </Transition>
    <DialogOverlay class="hidden" />
    <DialogContent
      ref="dialogContentRef"
      v-bind="forwarded"
      :class="
        cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg outline-hidden',
          props.class,
        )"
      :style="{
        zIndex: props.zIndex,
      }"
      @animationend="emits('animationEnd')"
    >
      <slot />
      <div class="flex-center gap-2 inset-e-4 inset-t-4 absolute">
        <button v-if="props.maximizable" class="rounded-xs opacity-70 ring-offset-background transition-opacity right-4 top-4 data-[state=open]:text-muted-foreground focus:outline-hidden data-[state=open]:bg-accent hover:opacity-100 [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 [&_svg]:pointer-events-none disabled:pointer-events-none focus:ring-2 focus:ring-ring focus:ring-offset-2" @click="handleMaximize">
          <Maximize v-if="!props.maximize" />
          <Minimize v-else />
        </button>
        <DialogClose
          v-if="closable"
          class="rounded-xs opacity-70 ring-offset-background transition-opacity right-4 top-4 data-[state=open]:text-muted-foreground focus:outline-hidden data-[state=open]:bg-accent hover:opacity-100 [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 [&_svg]:pointer-events-none disabled:pointer-events-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X />
          <span class="sr-only">Close</span>
        </DialogClose>
      </div>
    </DialogContent>
  </DialogPortal>
</template>
