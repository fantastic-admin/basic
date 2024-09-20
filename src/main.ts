import FloatingVue from 'floating-vue'

import Message from 'vue-m-message'

import VxeUI from 'vxe-pc-ui'
import VxeUITable from 'vxe-table'

import App from './App.vue'
import router from './router'

import pinia from './store'
import ui from './ui-provider'
import '@/utils/baidu'
import '@/utils/system.copyright'

import 'floating-vue/dist/style.css'

import 'vue-m-message/dist/style.css'
import 'vxe-table/lib/style.css'
import 'vxe-pc-ui/lib/style.css'
import 'overlayscrollbars/overlayscrollbars.css'

// 自定义指令
import directive from '@/utils/directive'

// 加载 svg 图标
import 'virtual:svg-icons-register'

// 加载 iconify 图标
import { downloadAndInstall } from '@/iconify'
import icons from '@/iconify/index.json'

import 'virtual:uno.css'

// 全局样式
import '@/assets/styles/globals.css'

const app = createApp(App)
app.use(FloatingVue, {
  distance: 12,
})
app.use(Message)
app.use(VxeUI).use(VxeUITable)
app.use(pinia)
app.use(router)
app.use(ui)
directive(app)
if (icons.isOfflineUse) {
  for (const info of icons.collections) {
    downloadAndInstall(info)
  }
}

app.mount('#app')
