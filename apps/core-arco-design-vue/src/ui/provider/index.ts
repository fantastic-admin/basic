import type { App } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'

function install(app: App) {
  app.use(ArcoVue)
}

export default { install }
