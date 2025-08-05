import type { RouteLocationRaw, Router } from 'vue-router'
import pinia from '@/store'

function getId(router: Router) {
  return router.currentRoute.value.fullPath
}

function extendPush(router: Router) {
  const originalPush = router.push
  router.push = function (to: RouteLocationRaw) {
    const settingsStore = useSettingsStore(pinia)
    if (settingsStore.settings.tabbar.enable) {
      const tabbarStore = useTabbarStore(pinia)
      const index = tabbarStore.list.findIndex(item => item.tabId === getId(router))
      tabbarStore.$patch({
        leaveIndex: index,
      })
    }
    return originalPush(to)
  }
}

function extendGo(router: Router) {
  const originalGo = router.go
  router.go = function (delta: number) {
    const settingsStore = useSettingsStore(pinia)
    if (settingsStore.settings.tabbar.enable) {
      const tabId = getId(router)
      const tabbarStore = useTabbarStore(pinia)
      originalGo(delta)
      if (delta < 0) {
        tabbarStore.remove(tabId)
      }
    }
    else {
      originalGo(delta)
    }
  }
}

function extendReplace(router: Router) {
  const originalReplace = router.replace
  router.replace = function (to: RouteLocationRaw) {
    const settingsStore = useSettingsStore(pinia)
    if (settingsStore.settings.tabbar.enable) {
      const tabId = getId(router)
      const tabbarStore = useTabbarStore(pinia)
      return originalReplace(to).then(() => {
        tabbarStore.remove(tabId)
      })
    }
    else {
      return originalReplace(to)
    }
  }
}

declare module 'vue-router' {
  interface Router {
    /**
     * 本方法为框架扩展语法，等同于 `push` 方法，并且同时会关闭当前标签页
     */
    close: (to: RouteLocationRaw) => Promise<NavigationFailure | void | undefined>
  }
}

function extendClose(router: Router) {
  router.close = function (to: RouteLocationRaw) {
    const currentRoute = router.currentRoute.value
    const tabId = getId(router)
    return router.push(to).then(() => {
      const settingsStore = useSettingsStore(pinia)
      if (settingsStore.settings.tabbar.enable && currentRoute.meta.tabMerge !== 'activeMenu') {
        const tabbarStore = useTabbarStore(pinia)
        tabbarStore.remove(tabId)
      }
    })
  }
}

export default function setupExtensions(router: Router) {
  extendPush(router)
  extendGo(router)
  extendReplace(router)
  extendClose(router)
}
