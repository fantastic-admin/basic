<script setup lang="ts">
import { Dialog, DialogDescription, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'

const props = withDefaults(
  defineProps<{
    appear?: boolean
    side?: 'left' | 'right'
    title?: string
    preventClose?: boolean
    overlay?: boolean
  }>(),
  {
    appear: false,
    side: 'right',
    preventClose: false,
    overlay: false,
  },
)

const emits = defineEmits<{
  close: []
}>()

const isOpen = defineModel<boolean>({
  default: false,
})

const slots = useSlots()

const overlayTransitionClass = ref({
  enter: 'ease-in-out duration-500',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: 'ease-in-out duration-500',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
})

const transitionClass = computed(() => {
  return {
    enter: 'transform transition ease-in-out duration-300',
    leave: 'transform transition ease-in-out duration-200',
    enterFrom: props.side === 'left' ? '-translate-x-full' : 'translate-x-full',
    enterTo: 'translate-x-0',
    leaveFrom: 'translate-x-0',
    leaveTo: props.side === 'left' ? '-translate-x-full' : 'translate-x-full',
  }
})

function close() {
  isOpen.value = false
  emits('close')
}
</script>

<template>
  <TransitionRoot as="template" :appear="appear" :show="isOpen">
    <Dialog class="fixed inset-0 z-2000 flex" :class="{ 'justify-end': side === 'right' }" @close="!preventClose && close()">
      <TransitionChild as="template" :appear="appear" v-bind="overlayTransitionClass">
        <div class="fixed inset-0 bg-stone-2/75 transition-opacity dark-bg-stone-8/75" :class="{ 'backdrop-blur-sm': overlay }" />
      </TransitionChild>
      <TransitionChild as="template" :appear="appear" v-bind="transitionClass">
        <DialogPanel relative max-w-md w-full w-screen flex flex-1 flex-col bg-white dark-bg-stone-8 focus-outline-none>
          <div flex="~ items-center justify-between" p-4 border-b="~ solid stone/15" text-6>
            <DialogTitle m-0 text-lg text-dark dark-text-white>
              {{ title }}
            </DialogTitle>
            <SvgIcon name="i-carbon:close" cursor-pointer @click="close" />
          </div>
          <DialogDescription m-0 flex-1 of-y-hidden>
            <OverlayScrollbarsComponent :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }" defer class="h-full p-4">
              <slot />
            </OverlayScrollbarsComponent>
          </DialogDescription>
          <div v-if="!!slots.footer" flex="~ items-center justify-end" px-3 py-2 border-t="~ solid stone/15">
            <slot name="footer" />
          </div>
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
