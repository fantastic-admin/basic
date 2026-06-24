import { createApp, h } from 'vue'
import Preview from './preview.vue'

export function useImagePreview() {
  function open(src: string | string[], index = 0) {
    const container = document.createElement('div')
    const app = createApp({
      render() {
        return h(Preview, {
          modelValue: true,
          src,
          index,
        })
      },
    })
    app.mount(container)
  }

  return {
    open,
  }
}
