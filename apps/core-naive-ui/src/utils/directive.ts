import type { App, DirectiveBinding } from 'vue'

export default function directive(app: App) {
  app.directive('auth', (el: HTMLElement, binding: DirectiveBinding) => {
    watch(() => binding.modifiers.all ? useAppAuth().authAll(binding.value) : useAppAuth().auth(binding.value), (val) => {
      el.style.display = val ? '' : 'none'
    }, {
      immediate: true,
    })
  })
}
