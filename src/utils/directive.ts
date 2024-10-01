import type { App, DirectiveBinding } from 'vue'

export default function directive(app: App) {
  app.directive('auth', (el: HTMLElement, binding: DirectiveBinding) => {
    if (binding.modifiers.all ? useAuth().authAll(binding.value) : useAuth().auth(binding.value)) {
      el.style.display = ''
    }
    else {
      el.style.display = 'none'
    }
  })
}
