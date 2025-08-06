import type { Component, HTMLAttributes } from 'vue'
import { createVNode, isVNode, render } from 'vue'
import Drawer from './index.vue'

export interface DrawerProps {
  id?: string
  modelValue?: boolean
  zIndex?: number
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
    const instance = getCurrentInstance()
    let vnode: VNode | null = null

    const updateVNode = () => {
      vnode = createVNode(Drawer, Object.assign({
        'id': instance && instance.uid ? `FaDrawer-${instance.uid}` : undefined,
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
  return {
    create,
  }
}
