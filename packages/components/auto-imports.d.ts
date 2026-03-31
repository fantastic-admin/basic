export {}

declare global {
  const computed: typeof import('vue').computed
  const createVNode: typeof import('vue').createVNode
  const getCurrentInstance: typeof import('vue').getCurrentInstance
  const h: typeof import('vue').h
  const isVNode: typeof import('vue').isVNode
  const nextTick: typeof import('vue').nextTick
  const onActivated: typeof import('vue').onActivated
  const onDeactivated: typeof import('vue').onDeactivated
  const onBeforeUnmount: typeof import('vue').onBeforeUnmount
  const onMounted: typeof import('vue').onMounted
  const onUnmounted: typeof import('vue').onUnmounted
  const reactive: typeof import('vue').reactive
  const ref: typeof import('vue').ref
  const shallowRef: typeof import('vue').shallowRef
  const toRef: typeof import('vue').toRef
  const unref: typeof import('vue').unref
  const useId: typeof import('vue').useId
  const useSlots: typeof import('vue').useSlots
  const useTemplateRef: typeof import('vue').useTemplateRef
  const watch: typeof import('vue').watch
  const watchEffect: typeof import('vue').watchEffect

  const faToast: typeof import('./index').faToast
  const useFaDrawer: typeof import('./index').useFaDrawer
  const useFaImagePreview: typeof import('./index').useFaImagePreview
  const useFaModal: typeof import('./index').useFaModal
}

declare global {
  // @ts-ignore
  export type { ComponentPublicInstance, VNode } from 'vue'
  import('vue')
}
