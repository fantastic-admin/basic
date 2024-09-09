import { createRouter, createWebHashHistory } from 'vue-router'
import { loadingFadeOut } from 'virtual:app-loading'
import setupGuards from './guards'

// 路由相关数据
import { constantRoutes, constantRoutesByFilesystem } from './routes'
import pinia from '@/store'
import useSettingsStore from '@/store/modules/settings'

const router = createRouter({
  history: createWebHashHistory(),
  routes: useSettingsStore(pinia).settings.app.routeBaseOn === 'filesystem' ? constantRoutesByFilesystem : constantRoutes,
})

setupGuards(router)

router.isReady().then(() => {
  loadingFadeOut()
})

export default router
