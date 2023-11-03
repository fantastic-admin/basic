<script setup lang="ts">
import { Dialog, DialogDescription, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    appear?: boolean
    side?: 'left' | 'right'
    title?: string
    preventClose?: boolean
    overlay?: boolean
  }>(),
  {
    modelValue: false,
    appear: false,
    side: 'right',
    preventClose: false,
    overlay: false,
  },
)

const emits = defineEmits<{
  'update:modelValue': [boolean]
  'close': []
}>()

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

const isOpen = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})

function close() {
  isOpen.value = false
  emits('close')
}
</script>

<template>
  <TransitionRoot as="template" :appear="appear" :show="isOpen">
    <Dialog class="fixed inset-0 flex z-2000" :class="{ 'justify-end': side === 'right' }" @close="!preventClose && close()">
      <TransitionChild as="template" :appear="appear" v-bind="overlayTransitionClass">
        <div class="fixed inset-0 transition-opacity bg-stone-2/75 dark:bg-stone-8/75" :class="{ 'backdrop-blur-sm': overlay }" />
      </TransitionChild>
      <TransitionChild as="template" :appear="appear" v-bind="transitionClass">
        <DialogPanel relative flex-1 flex flex-col w-full focus:outline-none w-screen max-w-md bg-white dark:bg-stone-8>
          <div flex="~ items-center justify-between" p-4 border-b="~ solid stone/15" text-6>
            <DialogTitle m-0 text-lg text-dark dark:text-white>
              {{ title }}
            </DialogTitle>
            <SvgIcon name="carbon:close" cursor-pointer @click="close" />
          </div>
          <DialogDescription flex-1 m-0 of-y-hidden>
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
