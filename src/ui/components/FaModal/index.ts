import type { HTMLAttributes } from 'vue'
import Modal from './index.vue'

export interface ModalProps {
  modelValue?: boolean
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
  header?: boolean
  footer?: boolean
  closeOnClickOverlay?: boolean
  closeOnPressEscape?: boolean
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

type alertOptions = Pick<ModalProps, 'title' | 'description' | 'icon' | 'alignCenter' | 'overlay' | 'overlayBlur' | 'confirmButtonText' | 'confirmButtonDisabled' | 'confirmButtonLoading' | 'closeOnClickOverlay' | 'closeOnPressEscape' | 'class' | 'headerClass' | 'contentClass' | 'footerClass'> & {
  content: string
  onConfirm?: () => any
}

type confirmOptions = Pick<ModalProps, 'title' | 'description' | 'alignCenter' | 'overlay' | 'overlayBlur' | 'confirmButtonText' | 'cancelButtonText' | 'confirmButtonDisabled' | 'confirmButtonLoading' | 'closeOnClickOverlay' | 'closeOnPressEscape' | 'class' | 'headerClass' | 'contentClass' | 'footerClass'> & {
  content: string
  onConfirm?: () => any
  onCancel?: () => any
}

export function useFaModal() {
  function info(options: alertOptions) {
    const container = document.createElement('div')
    const app = createApp({
      render() {
        return h(Modal, Object.assign({
          modelValue: true,
          icon: 'info',
          closable: false,
          border: false,
          alignCenter: true,
          closeOnClickOverlay: false,
          contentClass: 'py-0 min-h-auto',
          footerClass: 'p-4',
          onClosed: () => {
            app.unmount()
          },
        }, options), () => options.content)
      },
    })
    app.mount(container)
  }
  function success(options: alertOptions) {
    const container = document.createElement('div')
    const app = createApp({
      render() {
        return h(Modal, Object.assign({
          modelValue: true,
          icon: 'success',
          closable: false,
          border: false,
          alignCenter: true,
          closeOnClickOverlay: false,
          contentClass: 'py-0 min-h-auto',
          footerClass: 'p-4',
          onClosed: () => {
            app.unmount()
          },
        }, options), () => options.content)
      },
    })
    app.mount(container)
  }
  function warning(options: alertOptions) {
    const container = document.createElement('div')
    const app = createApp({
      render() {
        return h(Modal, Object.assign({
          modelValue: true,
          icon: 'warning',
          closable: false,
          border: false,
          alignCenter: true,
          closeOnClickOverlay: false,
          contentClass: 'py-0 min-h-auto',
          footerClass: 'p-4',
          onClosed: () => {
            app.unmount()
          },
        }, options), () => options.content)
      },
    })
    app.mount(container)
  }
  function error(options: alertOptions) {
    const container = document.createElement('div')
    const app = createApp({
      render() {
        return h(Modal, Object.assign({
          modelValue: true,
          icon: 'error',
          closable: false,
          border: false,
          alignCenter: true,
          closeOnClickOverlay: false,
          contentClass: 'py-0 min-h-auto',
          footerClass: 'p-4',
          onClosed: () => {
            app.unmount()
          },
        }, options), () => options.content)
      },
    })
    app.mount(container)
  }
  function confirm(options: confirmOptions) {
    const container = document.createElement('div')
    const app = createApp({
      render() {
        return h(Modal, Object.assign({
          modelValue: true,
          closable: false,
          border: false,
          alignCenter: true,
          closeOnClickOverlay: false,
          contentClass: 'py-0 min-h-auto',
          footerClass: 'p-4',
          showCancelButton: true,
          onClosed: () => {
            app.unmount()
          },
        }, options), () => options.content)
      },
    })
    app.mount(container)
  }

  return {
    info,
    success,
    warning,
    error,
    confirm,
  }
}
