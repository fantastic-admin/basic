import type { MenuRecordMainRaw, MenuRecordRaw, RouteMetaRaw, RouteRecordMainRaw, TabbarRecordRaw } from './types'

declare module 'vue-router' {
  interface RouteMeta extends RouteMetaRaw {}
}

declare global {
  namespace Route {
    interface recordMainRaw extends RouteRecordMainRaw {}
  }

  namespace Menu {
    /** 原始 */
    interface recordRaw extends MenuRecordRaw {}
    /** 主导航 */
    interface recordMainRaw extends MenuRecordMainRaw {}
  }

  namespace Tabbar {
    interface recordRaw extends TabbarRecordRaw {}
  }
}

export {}
