<script setup lang="ts">
import { Dialog, DialogDescription, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    appear?: boolean
    title?: string
    preventClose?: boolean
    overlay?: boolean
  }>(),
  {
    modelValue: false,
    appear: false,
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
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
    enterTo: 'opacity-100 translate-y-0 sm:scale-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
    leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
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
    <Dialog class="fixed inset-0 z-2000 flex" @close="!preventClose && close()">
      <TransitionChild as="template" :appear="appear" v-bind="overlayTransitionClass">
        <div class="fixed inset-0 bg-stone-2/75 transition-opacity dark:bg-stone-8/75" :class="{ 'backdrop-blur-sm': overlay }" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="min-h-full flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" :appear="appear" v-bind="transitionClass">
            <DialogPanel class="relative w-full flex flex-col overflow-hidden rounded-xl bg-white text-left shadow-xl sm:my-8 sm:max-w-lg dark:bg-stone-8">
              <div flex="~ items-center justify-between" px-4 py-3 border-b="~ solid stone/15" text-6>
                <DialogTitle m-0 text-lg text-dark dark:text-white>
                  {{ title }}
                </DialogTitle>
                <SvgIcon name="carbon:close" cursor-pointer @click="close" />
              </div>
              <DialogDescription m-0 overflow-y-auto p-4>
                <slot />
              </DialogDescription>
              <div v-if="!!slots.footer" flex="~ items-center justify-end" px-4 py-3 border-t="~ solid stone/15">
                <slot name="footer" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
