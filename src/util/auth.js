import { auth, authAll } from '@/util'

export default {
    install(Vue) {
        Vue.prototype.$auth = auth
        Vue.prototype.$authAll = authAll
        // 注册 v-auth 和 v-auth-all 指令
        Vue.directive('auth', {
            inserted: (el, binding) => {
                if (!auth(binding.value)) {
                    el.remove()
                }
            }
        })
        Vue.directive('auth-all', {
            inserted: (el, binding) => {
                if (!authAll(binding.value)) {
                    el.remove()
                }
            }
        })
    }
}
