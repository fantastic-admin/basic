import type { Component, HTMLAttributes } from 'vue'
import { isVNode } from 'vue'
import Drawer from './index.vue'

export interface DrawerProps {
  id?: string
  modelValue?: boolean
  side?: 'top' | 'bottom' | 'left' | 'right'
  title?: string
  description?: string
  loading?: boolean
  closable?: boolean
  centered?: boolean
  bordered?: boolean
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
  contentClass?: HTMLAttributes['class']
  headerClass?: HTMLAttributes['class']
  footerClass?: HTMLAttributes['class']
}

export interface DrawerEmits {
  'update:modelValue': [value: boolean]
  'open': []
  'opened': []
  'close': []
  'closed': []
  'confirm': []
  'cancel': []
}

type BaseOptions = Omit<DrawerProps, 'modelValue'> & {
  content?: Component | VNode | string
  onOpen?: () => void
  onOpened?: () => void
  onClose?: () => void
  onClosed?: () => void
  onConfirm?: () => void
  onCancel?: () => void
}

export function useFaDrawer() {
  function create(initialOptions: BaseOptions) {
    const container = document.createElement('div')
    const visible = ref(false)
    const options = reactive({ ...initialOptions })
    const app = createApp({
      render() {
        return h(Drawer, Object.assign({
          'id': useId(),
          'modelValue': visible.value,
          'onUpdate:modelValue': (val: boolean) => {
            visible.value = val
          },
        }, options), {
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
      },
    })
    // 继承主应用的上下文
    const instance = getCurrentInstance()
    if (instance && instance.appContext) {
      Object.assign(app._context, instance.appContext)
    }
    app.mount(container)
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
  return {
    create,
  }
}
