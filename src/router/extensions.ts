import type { RouteLocationRaw, Router } from 'vue-router'
import pinia from '@/store'
import useSettingsStore from '@/store/modules/settings'
import useTabbarStore from '@/store/modules/tabbar'

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

export default function setupExtensions(router: Router) {
  extendPush(router)
  extendGo(router)
  extendReplace(router)
}
