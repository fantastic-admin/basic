import type { App } from 'vue'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'

function install(app: App) {
  app.use(TDesign)
}

export default { install }
