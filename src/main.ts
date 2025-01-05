// 加载 iconify 图标
import { downloadAndInstall } from '@/iconify'

import icons from '@/iconify/index.json'
// 自定义指令
import directive from '@/utils/directive'

import VxeUI from 'vxe-pc-ui'
import VxeUITable from 'vxe-table'
import App from './App.vue'

import router from './router'
import pinia from './store'
import uiProvider from './ui/provider'
import '@/utils/baidu'

import '@/utils/systemCopyright'

import 'vxe-table/lib/style.css'
import 'vxe-pc-ui/lib/style.css'
// 加载 svg 图标
import 'virtual:svg-icons-register'
import 'virtual:uno.css'
import '@unocss/reset/tailwind-compat.css'
// 全局样式
import '@/assets/styles/globals.css'

const app = createApp(App)
app.use(VxeUI).use(VxeUITable)
app.use(pinia)
app.use(router)
app.use(uiProvider)
directive(app)
if (icons.isOfflineUse) {
  for (const info of icons.collections) {
    downloadAndInstall(info)
  }
}

app.mount('#app')
