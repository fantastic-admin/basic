import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import { piniaStore } from './store'
import { useSettingsOutsideStore } from './store/modules/settings'
app.use(piniaStore)

import router from './router'
app.use(router)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementIcons from '@element-plus/icons-vue'
// 将 element-plus 的图标库注册到全局
for (var key in ElementIcons) {
    app.component(`ElIcon${ElementIcons[key].name}`, ElementIcons[key])
}
import zhCn from 'element-plus/es/locale/lang/zh-cn'
app.use(ElementPlus, {
    locale: zhCn,
    size: useSettingsOutsideStore().app.elementSize
})

import globalProperties from '@/util/global.properties'
globalProperties(app)

// 自定义指令
import directive from '@/util/directive'
directive(app)

// 加载 svg 图标
import 'virtual:svg-icons-register'

// 全局样式
import '@/assets/styles/globals.scss'

app.mount('#app')
