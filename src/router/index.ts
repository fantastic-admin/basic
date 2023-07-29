import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import '@/assets/styles/nprogress.scss'

// 路由相关数据
import { asyncRoutes, asyncRoutesByFilesystem, constantRoutes, constantRoutesByFilesystem } from './routes'
import pinia from '@/store'
import useSettingsStore from '@/store/modules/settings'
import useKeepAliveStore from '@/store/modules/keepAlive'
import useUserStore from '@/store/modules/user'
import useMenuStore from '@/store/modules/menu'
import useRouteStore from '@/store/modules/route'

const { isLoading } = useNProgress()

const router = createRouter({
  history: createWebHashHistory(),
  routes: useSettingsStore(pinia).settings.app.routeBaseOn === 'filesystem' ? constantRoutesByFilesystem : constantRoutes as RouteRecordRaw[],
})

router.beforeEach(async (to, from, next) => {
  const settingsStore = useSettingsStore()
  const userStore = useUserStore()
  const menuStore = useMenuStore()
  const routeStore = useRouteStore()
  settingsStore.settings.app.enableProgress && (isLoading.value = true)
  // 是否已登录
  if (userStore.isLogin) {
    // 是否已根据权限动态生成并注册路由
    if (routeStore.isGenerate) {
      // 导航栏如果不是 single 模式，则需要根据 path 定位主导航的选中状态
      settingsStore.settings.menu.menuMode !== 'single' && menuStore.setActived(to.path)
      // 如果已登录状态下，进入登录页会强制跳转到主页
      if (to.name === 'login') {
        next({
          name: 'home',
          replace: true,
        })
      }
      // 如果未开启主页，但进入的是主页，则会进入侧边栏导航第一个模块
      else if (!settingsStore.settings.home.enable && to.name === 'home') {
        if (menuStore.sidebarMenus.length > 0) {
          next({
            path: menuStore.sidebarMenusFirstDeepestPath,
            replace: true,
          })
        }
        // 如果侧边栏导航第一个模块无法命中，则还是进入主页
        else {
          next()
        }
      }
      // 正常访问页面
      else {
        next()
      }
    }
    else {
      // 生成动态路由
      switch (settingsStore.settings.app.routeBaseOn) {
        case 'frontend':
          await routeStore.generateRoutesAtFront(asyncRoutes)
          break
        case 'backend':
          await routeStore.generateRoutesAtBack()
          break
        case 'filesystem':
          await routeStore.generateRoutesAtFilesystem(asyncRoutesByFilesystem)
          // 文件系统生成的路由，需要手动生成导航数据
          switch (settingsStore.settings.menu.baseOn) {
            case 'frontend':
              await menuStore.generateMenusAtFront()
              break
            case 'backend':
              await menuStore.generateMenusAtBack()
              break
          }
          break
      }
      // 注册并记录路由数据
      // 记录的数据会在登出时会使用到，不使用 router.removeRoute 是考虑配置的路由可能不一定有设置 name ，则通过调用 router.addRoute() 返回的回调进行删除
      const removeRoutes: (() => void)[] = []
      routeStore.flatRoutes.forEach((route) => {
        if (!/^(https?:|mailto:|tel:)/.test(route.path)) {
          removeRoutes.push(router.addRoute(route as RouteRecordRaw))
        }
      })
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        routeStore.flatSystemRoutes.forEach((route) => {
          removeRoutes.push(router.addRoute(route as RouteRecordRaw))
        })
      }
      routeStore.setCurrentRemoveRoutes(removeRoutes)
      // 动态路由生成并注册后，重新进入当前路由
      next({
        path: to.path,
        query: to.query,
        replace: true,
      })
    }
  }
  else {
    if (to.name !== 'login') {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath !== '/' ? to.fullPath : undefined,
        },
      })
    }
    else {
      next()
    }
  }
})

router.afterEach((to, from) => {
  const settingsStore = useSettingsStore()
  const keepAliveStore = useKeepAliveStore()
  settingsStore.settings.app.enableProgress && (isLoading.value = false)
  // 设置页面 title
  if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
    settingsStore.setTitle(to.meta.breadcrumbNeste?.at(-1)?.title ?? to.meta.title)
  }
  else {
    settingsStore.setTitle(to.meta.title)
  }
  // 判断当前页面是否开启缓存，如果开启，则将当前页面的 name 信息存入 keep-alive 全局状态
  if (to.meta.cache) {
    const componentName = to.matched.at(-1)?.components?.default.name
    if (componentName) {
      keepAliveStore.add(componentName)
    }
    else {
      console.warn('该页面组件未设置组件名，会导致缓存失效，请检查')
    }
  }
  // 判断离开页面是否开启缓存，如果开启，则根据缓存规则判断是否需要清空 keep-alive 全局状态里离开页面的 name 信息
  if (from.meta.cache) {
    const componentName = from.matched.at(-1)?.components?.default.name
    if (componentName) {
    // 通过 meta.cache 判断针对哪些页面进行缓存
      switch (typeof from.meta.cache) {
        case 'string':
          if (from.meta.cache !== to.name) {
            keepAliveStore.remove(componentName)
          }
          break
        case 'object':
          if (!from.meta.cache.includes(to.name as string)) {
            keepAliveStore.remove(componentName)
          }
          break
      }
      // 如果进入的是 reload 页面，则也将离开页面的缓存清空
      if (to.name === 'reload') {
        keepAliveStore.remove(componentName)
      }
    }
  }
  document.documentElement.scrollTop = 0
})

export default router
