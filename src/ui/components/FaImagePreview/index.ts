import Preview from './preview.vue'

export function useFaImagePreview() {
  function open(src: string) {
    const container = document.createElement('div')
    const app = createApp({
      render() {
        return h(Preview, {
          modelValue: true,
          src,
        })
      },
    })
    app.mount(container)
  }

  return {
    open,
  }
}
