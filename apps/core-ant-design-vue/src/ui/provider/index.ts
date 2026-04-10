import type { App } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

function install(app: App) {
  app.use(Antd)
}

export default { install }
