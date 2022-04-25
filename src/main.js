import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import { piniaStore } from './store'
import { useSettingsOutsideStore } from './store/modules/settings'
app.use(piniaStore)

import router from './router'
app.use(router)

import globalProperties from '@/util/global.properties'
globalProperties(app)

// 自定义指令
import directive from '@/util/directive'
directive(app)

// 加载 svg 图标
import 'virtual:svg-icons-register'

// 加载 iconify 图标（element plus）
import { downloadAndInstall } from '@/iconify-ep'
if (useSettingsOutsideStore().app.iconifyOfflineUse) {
    downloadAndInstall()
}

// 全局样式
import '@/assets/styles/globals.scss'

app.mount('#app')
