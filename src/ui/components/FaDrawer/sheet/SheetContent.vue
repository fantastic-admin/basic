<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { SheetVariants } from '.'
import { cn } from '@/utils'
import { useScrollLock } from '@vueuse/core'
import { X } from 'lucide-vue-next'
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed } from 'vue'
import { sheetVariants } from '.'

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes['class']
  open?: boolean
  side?: SheetVariants['side']
  closable?: boolean
  overlay?: boolean
  overlayBlur?: boolean
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<SheetContentProps>()

const emits = defineEmits<DialogContentEmits & {
  animationEnd: []
}>()

const delegatedProps = computed(() => {
  const { class: _, side, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

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

const id = inject('DrawerId')
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
        :data-drawer-id="id"
        :class="cn('fixed inset-0 z-2000 data-[state=closed]:animate-out data-[state=open]:animate-in bg-black/50 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0', {
          'backdrop-blur-sm': props.overlayBlur,
        })"
      />
    </Transition>
    <DialogContent
      :class="cn(sheetVariants({ side }), props.class)"
      v-bind="{ ...forwarded, ...$attrs }"
      @animationend="emits('animationEnd')"
    >
      <slot />
      <DialogClose
        v-if="closable"
        class="absolute right-4 top-4 rounded-sm bg-transparent opacity-70 ring-offset-background transition-opacity disabled:pointer-events-none data-[state=open]:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
      >
        <X class="h-4 w-4 text-muted-foreground" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
