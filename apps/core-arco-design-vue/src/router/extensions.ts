import type { NavigationFailure, RouteLocationRaw, Router } from 'vue-router'
import pinia from '@/store'

function getId(router: Router) {
  return router.currentRoute.value.fullPath
}

function extendPush(router: Router) {
  const originalPush = router.push
  router.push = function (to: RouteLocationRaw) {
    const appSettingsStore = useAppSettingsStore(pinia)
    if (appSettingsStore.settings.topbar.tabbar) {
      const appTabbarStore = useAppTabbarStore(pinia)
      const index = appTabbarStore.list.findIndex(item => item.tabId === getId(router))
      appTabbarStore.$patch({
        leaveIndex: index,
      })
    }
    return originalPush(to)
  }
}

function extendReplace(router: Router) {
  const originalReplace = router.replace
  router.replace = function (to: RouteLocationRaw) {
    const appSettingsStore = useAppSettingsStore(pinia)
    if (appSettingsStore.settings.topbar.tabbar) {
      const tabId = getId(router)
      const appTabbarStore = useAppTabbarStore(pinia)
      return originalReplace(to).then(() => {
        appTabbarStore.remove(tabId)
      })
    }
    else {
      return originalReplace(to)
    }
  }
}

function extendGo(router: Router) {
  const originalGo = router.go
  router.go = function (delta: number) {
    const appSettingsStore = useAppSettingsStore(pinia)
    if (appSettingsStore.settings.topbar.tabbar) {
      const tabId = getId(router)
      const appTabbarStore = useAppTabbarStore(pinia)
      originalGo(delta)
      if (delta < 0) {
        appTabbarStore.remove(tabId)
      }
    }
    else {
      originalGo(delta)
    }
  }
}

function shouldUseHistoryBack(router: Router, to?: RouteLocationRaw) {
  const historyBack = window.history.state?.back
  if (typeof historyBack !== 'string' || !historyBack) {
    return false
  }
  if (!to) {
    return true
  }
  const backRoute = router.resolve(historyBack)
  const targetRoute = router.resolve(to)
  if (backRoute.name && targetRoute.name) {
    return backRoute.name === targetRoute.name
  }
  return (backRoute.matched.at(-1)?.path ?? backRoute.path) === (targetRoute.matched.at(-1)?.path ?? targetRoute.path)
}

function extendBack(router: Router) {
  const originalBack = router.back
  router.back = function (to?: RouteLocationRaw) {
    const appSettingsStore = useAppSettingsStore(pinia)
    const tabId = getId(router)
    const fallbackTo = to ?? appSettingsStore.settings.app.home.fullPath
    if (shouldUseHistoryBack(router, to)) {
      originalBack()
      if (appSettingsStore.settings.topbar.tabbar) {
        const appTabbarStore = useAppTabbarStore(pinia)
        appTabbarStore.remove(tabId)
      }
      return Promise.resolve()
    }
    else {
      return router.replace(fallbackTo).then(() => {
        if (appSettingsStore.settings.topbar.tabbar) {
          const appTabbarStore = useAppTabbarStore(pinia)
          appTabbarStore.remove(tabId)
        }
      })
    }
  }
}

function extendClose(router: Router) {
  router.close = function (to: RouteLocationRaw) {
    const tabId = getId(router)
    return router.push(to).then(() => {
      const appSettingsStore = useAppSettingsStore(pinia)
      if (appSettingsStore.settings.topbar.tabbar) {
        const appTabbarStore = useAppTabbarStore(pinia)
        appTabbarStore.remove(tabId)
      }
    })
  }
}

declare module 'vue-router' {
  interface Router {
    /**
     * 本方法为框架扩展语法，会同时关闭当前标签页
     *
     * 如果上一条历史记录与传入目标页一致，则调用原生 `back` 方法
     * 如果没有历史记录，或者上一条历史记录不是目标页，则使用 `replace` 方法跳转到指定路径或首页
     *
     * @param to 可选的目标路由，当无法安全回退时使用此参数作为跳转目标
     */
    back: (to?: RouteLocationRaw) => Promise<NavigationFailure | void | undefined>
    /**
     * 本方法为框架扩展语法，等同于 `push` 方法，并且同时会关闭当前标签页
     */
    close: (to: RouteLocationRaw) => Promise<NavigationFailure | void | undefined>
  }
}

export default function setupExtensions(router: Router) {
  extendPush(router)
  extendReplace(router)
  extendGo(router)
  extendBack(router)
  extendClose(router)
}
