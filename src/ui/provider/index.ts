import type { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

function install(app: App) {
  app.use(ElementPlus)
}

export default { install }
