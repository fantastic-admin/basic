import type { App } from 'vue'
import Antdv from 'antdv-next'

function install(app: App) {
  app.use(Antdv)
}

export default { install }
