import type { Route } from '#/global'
import type { RouteRecordRaw, RouterMatcher } from 'vue-router'
import apiApp from '@/api/modules/app'
import { systemRoutes as systemRoutesRaw } from '@/router/routes'
import { cloneDeep } from 'es-toolkit'
import { createRouterMatcher } from 'vue-router'
import useSettingsStore from './settings'

const useRouteStore = defineStore(
  // 唯一ID
  'route',
  () => {
    const settingsStore = useSettingsStore()

    const isGenerate = ref(false)
    // 原始路由
    const routesRaw = ref<Route.recordMainRaw[]>([])
    // 文件系统原始路由
    const filesystemRoutesRaw = ref<RouteRecordRaw[]>([])
    // 已注册的路由，用于登出时删除路由
    const currentRemoveRoutes = ref<(() => void)[]>([])

    // 实际路由
    const routes = computed(() => {
      const returnRoutes: RouteRecordRaw[] = []
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        if (routesRaw.value) {
          routesRaw.value.forEach((item) => {
            const tmpRoutes = cloneDeep(item.children) as RouteRecordRaw[]
            tmpRoutes.map((v) => {
              if (!v.meta) {
                v.meta = {}
              }
              v.meta.auth = item.meta?.auth ?? v.meta?.auth
              return v
            })
            returnRoutes.push(...tmpRoutes)
          })
          returnRoutes.forEach((item) => {
            if (item.children) {
              item.children = deleteMiddleRouteComponent(item.children)
            }
            return item
          })
        }
      }
      else {
        returnRoutes.push(...cloneDeep(filesystemRoutesRaw.value) as RouteRecordRaw[])
      }
      return returnRoutes
    })
    // 系统路由
    const systemRoutes = computed(() => {
      const routes = [...systemRoutesRaw]
      routes.forEach((item) => {
        if (item.children) {
          item.children = deleteMiddleRouteComponent(item.children)
        }
      })
      return routes
    })
    // 删除路由中间层级对应的组件
    function deleteMiddleRouteComponent(routes: RouteRecordRaw[]) {
      const res: RouteRecordRaw[] = []
      routes.forEach((route) => {
        if (route.children?.length) {
          delete route.component
          route.children = deleteMiddleRouteComponent(route.children)
        }
        else {
          delete route.children
        }
        res.push(route)
      })
      return res
    }

    // 路由匹配器
    const routesMatcher = ref<RouterMatcher>()
    // 根据路径获取匹配的路由
    function getRouteMatchedByPath(path: string) {
      return routesMatcher.value?.resolve({ path }, undefined!)?.matched ?? []
    }

    // 生成路由（前端生成）
    function generateRoutesAtFront(asyncRoutes: Route.recordMainRaw[]) {
      // 设置 routes 数据
      routesRaw.value = cloneDeep(asyncRoutes) as any
      // 创建路由匹配器
      const routes: RouteRecordRaw[] = []
      routesRaw.value.forEach((route) => {
        if (route.children) {
          routes.push(...route.children)
        }
      })
      routesMatcher.value = createRouterMatcher(routes, {})
      isGenerate.value = true
    }
    // 格式化后端路由数据
    function formatBackRoutes(routes: any, views = import.meta.glob('../../views/**/*.vue')): Route.recordMainRaw[] {
      return routes.map((route: any) => {
        switch (route.component) {
          case 'Layout':
            route.component = () => import('@/layouts/index.vue')
            break
          default:
            if (route.component) {
              route.component = views[`../../views/${route.component}`]
            }
            else {
              delete route.component
            }
        }
        if (route.children) {
          route.children = formatBackRoutes(route.children, views)
        }
        return route
      })
    }
    // 生成路由（后端获取）
    async function generateRoutesAtBack() {
      await apiApp.routeList().then((res) => {
        // 设置 routes 数据
        routesRaw.value = formatBackRoutes(res.data) as any
        // 创建路由匹配器
        const routes: RouteRecordRaw[] = []
        routesRaw.value.forEach((route) => {
          if (route.children) {
            routes.push(...route.children)
          }
        })
        routesMatcher.value = createRouterMatcher(routes, {})
        isGenerate.value = true
      }).catch(() => {})
    }
    // 生成路由（文件系统生成）
    function generateRoutesAtFilesystem(asyncRoutes: RouteRecordRaw[]) {
      // 设置 routes 数据
      filesystemRoutesRaw.value = cloneDeep(asyncRoutes) as any
      isGenerate.value = true
    }
    // 记录 accessRoutes 路由，用于登出时删除路由
    function setCurrentRemoveRoutes(routes: (() => void)[]) {
      currentRemoveRoutes.value = routes
    }
    // 清空动态路由
    function removeRoutes() {
      isGenerate.value = false
      routesRaw.value = []
      filesystemRoutesRaw.value = []
      currentRemoveRoutes.value.forEach((removeRoute) => {
        removeRoute()
      })
      currentRemoveRoutes.value = []
    }

    return {
      isGenerate,
      routesRaw,
      currentRemoveRoutes,
      routes,
      systemRoutes,
      getRouteMatchedByPath,
      generateRoutesAtFront,
      generateRoutesAtBack,
      generateRoutesAtFilesystem,
      setCurrentRemoveRoutes,
      removeRoutes,
    }
  },
)

export default useRouteStore
