import type { App } from 'vue'
import { install as vexipInstall } from 'vexip-ui'
import 'vexip-ui/css/index.css'
import 'vexip-ui/css/dark/index.css'

function install(app: App) {
  app.use(vexipInstall, {
    prefix: 'vxp',
  })
}

export default { install }
