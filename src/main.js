import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import pinia from './store'
app.use(pinia)

import router from './router'
app.use(router)

/* importElementPlusPlaceholder */

import globalProperties from '@/util/global.properties'
globalProperties(app)

// 自定义指令
import directive from '@/util/directive'
directive(app)

// 加载 svg 图标
import 'virtual:svg-icons-register'

// 加载 iconify 图标（element plus）
import { downloadAndInstall } from '@/iconify-ep'
import useSettingsStore from './store/modules/settings'
if (useSettingsStore().app.iconifyOfflineUse) {
    downloadAndInstall()
}

// 全局样式
import '@/assets/styles/globals.scss'

app.mount('#app')
