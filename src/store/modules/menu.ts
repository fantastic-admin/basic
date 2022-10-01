import { cloneDeep } from 'lodash-es'
import useSettingsStore from './settings'
import useUserStore from './user'
import useRouteStore from './route'
import type { Menu } from '@/global'

import { resolveRoutePath } from '@/utils'
import api from '@/api'
import menu from '@/menu'

function getDeepestPath(menu: Menu.recordRaw, rootPath = '') {
  let retnPath = ''
  if (menu.path) {
    if (menu.children) {
      if (
        menu.children.some((item) => {
          return item.meta.sidebar !== false
        })
      ) {
        for (let i = 0; i < menu.children.length; i++) {
          if (menu.children[i].meta.sidebar !== false) {
            retnPath = getDeepestPath(menu.children[i], resolveRoutePath(rootPath, menu.path))
            break
          }
        }
      }
      else {
        retnPath = getDeepestPath(menu.children[0], resolveRoutePath(rootPath, menu.path))
      }
    }
    else {
      retnPath = resolveRoutePath(rootPath, menu.path)
    }
  }
  return retnPath
}

function hasPermission(permissions: string[], menu: Menu.recordMainRaw | Menu.recordRaw) {
  let isAuth = false
  if (menu.meta && menu.meta.auth) {
    isAuth = permissions.some((auth) => {
      return typeof menu.meta.auth === 'string'
        ? menu.meta.auth === auth
        : typeof menu.meta.auth === 'object'
          ? menu.meta.auth.includes(auth)
          : false
    })
  }
  else {
    isAuth = true
  }
  return isAuth
}

function filterAsyncMenus<T extends Menu.recordMainRaw[] | Menu.recordRaw[]>(menus: T, permissions: string[]): T {
  const res: any = []
  menus.forEach((menu) => {
    const tmpMenu = cloneDeep(menu)
    if (hasPermission(permissions, tmpMenu)) {
      if (tmpMenu.children) {
        tmpMenu.children = filterAsyncMenus(tmpMenu.children, permissions) as Menu.recordRaw[]
        tmpMenu.children.length && res.push(tmpMenu)
      }
      else {
        res.push(tmpMenu)
      }
    }
  })
  return res
}

function getDefaultOpenedPaths(menus: Menu.recordRaw[], rootPath = '') {
  const defaultOpenedPaths: string[] = []
  menus.forEach((item) => {
    if (item.path && item.meta.defaultOpened && item.children) {
      defaultOpenedPaths.push(resolveRoutePath(rootPath, item.path))
      const childrenDefaultOpenedPaths = getDefaultOpenedPaths(item.children, resolveRoutePath(rootPath, item.path))
      if (childrenDefaultOpenedPaths.length > 0) {
        defaultOpenedPaths.push(...childrenDefaultOpenedPaths)
      }
    }
  })
  return defaultOpenedPaths
}

const useMenuStore = defineStore(
  // 唯一ID
  'menu',
  {
    state: () => ({
      menus: [{
        meta: {},
        children: [],
      }] as Menu.recordMainRaw[],
      actived: 0,
    }),
    getters: {
      // 完整导航数据
      allMenus() {
        const settingsStore = useSettingsStore()
        let menus: Menu.recordMainRaw[] = [{
          meta: {},
          children: [],
        }]
        if (settingsStore.app.routeBaseOn !== 'filesystem') {
          const routeStore = useRouteStore()
          if (settingsStore.menu.menuMode === 'single') {
            menus[0].children = []
            routeStore.routes.forEach((item) => {
              menus[0].children?.push(...item.children as Menu.recordRaw[])
            })
          }
          else {
            menus = routeStore.routes as Menu.recordMainRaw[]
          }
        }
        else {
          menus = this.menus
        }
        return menus
      },
      // 次导航数据
      sidebarMenus(): Menu.recordMainRaw['children'] {
        return this.allMenus.length > 0
          ? this.allMenus[this.actived].children
          : []
      },
      // 次导航里第一个导航的路径
      sidebarMenusFirstDeepestPath(): string {
        return this.allMenus.length > 0
          ? getDeepestPath(this.sidebarMenus[0])
          : '/'
      },
      defaultOpenedPaths() {
        const settingsStore = useSettingsStore()
        let defaultOpenedPaths: string[] = []
        if (settingsStore.app.routeBaseOn !== 'filesystem') {
          defaultOpenedPaths = getDefaultOpenedPaths(this.sidebarMenus)
        }
        return defaultOpenedPaths
      },
    },
    actions: {
      // 生成导航（前端生成）
      generateMenusAtFront() {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<void>(async (resolve) => {
          const settingsStore = useSettingsStore()
          const userStore = useUserStore()
          let accessedMenus
          // 如果权限功能开启，则需要对导航数据进行筛选过滤
          if (settingsStore.app.enablePermission) {
            const permissions = await userStore.getPermissions()
            accessedMenus = filterAsyncMenus(menu, permissions)
          }
          else {
            accessedMenus = cloneDeep(menu)
          }
          this.menus = accessedMenus.filter(item => item.children.length !== 0)
          resolve()
        })
      },
      // 生成导航（后端生成）
      generateMenusAtBack() {
        return new Promise<void>((resolve) => {
          api.get('menu/list', {
            baseURL: '/mock/',
          }).then(async (res) => {
            const settingsStore = useSettingsStore()
            const userStore = useUserStore()
            let accessedMenus: Menu.recordMainRaw[]
            // 如果权限功能开启，则需要对导航数据进行筛选过滤
            if (settingsStore.app.enablePermission) {
              const permissions = await userStore.getPermissions()
              accessedMenus = filterAsyncMenus(res.data, permissions)
            }
            else {
              accessedMenus = cloneDeep(res.data)
            }
            this.menus = accessedMenus.filter(item => item.children.length !== 0)
            resolve()
          })
        })
      },
      // 切换主导航
      setActived(data: number | string) {
        if (typeof data === 'number') {
          // 如果是 number 类型，则认为是主导航的索引
          this.actived = data
        }
        else {
          // 如果是 string 类型，则认为是路由，需要查找对应的主导航索引
          this.allMenus.forEach((item, index) => {
            if (
              item.children.some((r) => {
                return data.indexOf(`${r.path}/`) === 0 || data === r.path
              })
            ) {
              this.actived = index
            }
          })
        }
      },
    },
  },
)

export default useMenuStore
