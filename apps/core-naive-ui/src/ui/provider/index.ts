import type { App } from 'vue'
import naive from 'naive-ui'

function install(app: App) {
  app.use(naive)
}

export default { install }
