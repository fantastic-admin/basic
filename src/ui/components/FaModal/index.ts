import type { Component, HTMLAttributes } from 'vue'
import { createVNode, isVNode, render } from 'vue'
import Modal from './index.vue'

export interface ModalProps {
  id?: string
  modelValue?: boolean
  zIndex?: number
  title?: string
  description?: string
  icon?: 'info' | 'success' | 'warning' | 'error'
  loading?: boolean
  closable?: boolean
  maximize?: boolean
  maximizable?: boolean
  draggable?: boolean
  center?: boolean
  border?: boolean
  alignCenter?: boolean
  overlay?: boolean
  overlayBlur?: boolean
  showConfirmButton?: boolean
  showCancelButton?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonDisabled?: boolean
  confirmButtonLoading?: boolean
  beforeClose?: (
    action: 'confirm' | 'cancel' | 'close',
    done: () => void
  ) => void
  header?: boolean
  footer?: boolean
  closeOnClickOverlay?: boolean
  closeOnPressEscape?: boolean
  destroyOnClose?: boolean
  class?: HTMLAttributes['class']
  headerClass?: HTMLAttributes['class']
  contentClass?: HTMLAttributes['class']
  footerClass?: HTMLAttributes['class']
}
export interface ModalEmits {
  'update:modelValue': [value: boolean]
  'open': []
  'opened': []
  'close': []
  'closed': []
  'confirm': []
  'cancel': []
}

type BaseOptions = Omit<ModalProps, 'modelValue'> & {
  content?: Component | VNode | string
  onOpen?: () => void
  onOpened?: () => void
  onClose?: () => void
  onClosed?: () => void
  onConfirm?: () => void
  onCancel?: () => void
}

type alertOptions = Pick<BaseOptions, 'title' | 'description' | 'icon' | 'alignCenter' | 'overlay' | 'overlayBlur' | 'confirmButtonText' | 'confirmButtonDisabled' | 'confirmButtonLoading' | 'closeOnClickOverlay' | 'closeOnPressEscape' | 'class' | 'headerClass' | 'contentClass' | 'footerClass' | 'content' | 'onConfirm'>

type confirmOptions = Pick<BaseOptions, 'title' | 'description' | 'alignCenter' | 'overlay' | 'overlayBlur' | 'confirmButtonText' | 'cancelButtonText' | 'confirmButtonDisabled' | 'confirmButtonLoading' | 'beforeClose' | 'closeOnClickOverlay' | 'closeOnPressEscape' | 'class' | 'headerClass' | 'contentClass' | 'footerClass' | 'content' | 'onConfirm' | 'onCancel'>

export function useFaModal() {
  function create(initialOptions: BaseOptions) {
    const container = document.createElement('div')
    const visible = ref(false)
    const options = reactive({ ...initialOptions })
    const instance = getCurrentInstance()
    let vnode: VNode | null = null

    const updateVNode = () => {
      vnode = createVNode(Modal, Object.assign({
        'id': instance && instance.uid ? `FaModal-${instance.uid}` : undefined,
        'modelValue': visible.value,
        'onUpdate:modelValue': (val: boolean) => {
          visible.value = val
        },
        ...options,
      }), {
        default: () => {
          if (typeof options.content === 'string') {
            return options.content
          }
          else if (isVNode(options.content)) {
            return options.content
          }
          else if (options.content) {
            return h(options.content)
          }
          return null
        },
      })
      // 继承主应用的上下文
      if (instance && instance.appContext) {
        vnode.appContext = instance.appContext
      }
      render(vnode, container)
    }

    // 监听 visible 和 options 变化，自动重新渲染
    watch([visible, options], () => {
      updateVNode()
    }, {
      immediate: true,
      deep: true,
    })

    // 挂载到当前实例
    instance?.proxy?.$el?.appendChild(container)

    // 监听组件卸载，自动清理
    if (instance) {
      onUnmounted(() => {
        if (vnode) {
          render(null, container)
          vnode = null
        }
        if (container.parentNode) {
          container.parentNode.removeChild(container)
        }
      })
    }

    const open = () => {
      visible.value = true
    }
    const close = () => {
      visible.value = false
    }
    const update = (newOptions: BaseOptions) => {
      Object.assign(options, newOptions)
    }
    return {
      open,
      close,
      update,
    }
  }
  function info(options: alertOptions) {
    const defaultOptions: BaseOptions = {
      icon: 'info',
      closable: false,
      border: false,
      alignCenter: true,
      closeOnClickOverlay: false,
      destroyOnClose: true,
      contentClass: 'py-0 min-h-auto',
      footerClass: 'p-4',
    }
    const { open } = create(Object.assign(defaultOptions, options))
    open()
  }
  function success(options: alertOptions) {
    const defaultOptions: BaseOptions = {
      icon: 'success',
      closable: false,
      border: false,
      alignCenter: true,
      closeOnClickOverlay: false,
      destroyOnClose: true,
      contentClass: 'py-0 min-h-auto',
      footerClass: 'p-4',
    }
    const { open } = create(Object.assign(defaultOptions, options))
    open()
  }
  function warning(options: alertOptions) {
    const defaultOptions: BaseOptions = {
      icon: 'warning',
      closable: false,
      border: false,
      alignCenter: true,
      closeOnClickOverlay: false,
      destroyOnClose: true,
      contentClass: 'py-0 min-h-auto',
      footerClass: 'p-4',
    }
    const { open } = create(Object.assign(defaultOptions, options))
    open()
  }
  function error(options: alertOptions) {
    const defaultOptions: BaseOptions = {
      icon: 'error',
      closable: false,
      border: false,
      alignCenter: true,
      closeOnClickOverlay: false,
      destroyOnClose: true,
      contentClass: 'py-0 min-h-auto',
      footerClass: 'p-4',
    }
    const { open } = create(Object.assign(defaultOptions, options))
    open()
  }
  function confirm(options: confirmOptions) {
    const defaultOptions: BaseOptions = {
      closable: false,
      border: false,
      alignCenter: true,
      showCancelButton: true,
      closeOnClickOverlay: false,
      destroyOnClose: true,
      contentClass: 'py-0 min-h-auto',
      footerClass: 'p-4',
    }
    const { open, update } = create(Object.assign(defaultOptions, options))
    open()
    return {
      update,
    }
  }
  return {
    create,
    info,
    success,
    warning,
    error,
    confirm,
  }
}
