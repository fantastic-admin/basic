import { useAuth } from '@/util/composables'

export default function directive(app) {
    // 注册 v-auth 和 v-auth-all 指令
    app.directive('auth', {
        mounted: (el, binding) => {
            if (!useAuth().auth(binding.value)) {
                el.remove()
            }
        }
    })
    app.directive('auth-all', {
        mounted: (el, binding) => {
            if (!useAuth().authAll(binding.value)) {
                el.remove()
            }
        }
    })
}
