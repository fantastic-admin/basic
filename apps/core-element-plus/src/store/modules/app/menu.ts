import type { MenuRecordMainRaw, MenuRecordRaw, RouteRecordMainRaw } from '@fantastic-admin/types'
import type { RouteRecordRaw } from 'vue-router'
import { cloneDeep } from 'es-toolkit'
import { resolveRoutePath } from '@/utils'

export const useAppMenuStore = defineStore(
  'appMenu',
  () => {
    const appSettingsStore = useAppSettingsStore()
    const appRouteStore = useAppRouteStore()

    // 将原始路由转换成导航菜单
    function convertRouteToMenu(routes: RouteRecordMainRaw[]): MenuRecordMainRaw[] {
      const returnMenus: MenuRecordMainRaw[] = []
      routes.forEach((item) => {
        if (item.children.length > 0) {
          if (appSettingsStore.settings.menu.mode === 'single') {
            returnMenus.length === 0 && returnMenus.push({
              meta: {},
              children: [],
            })
            returnMenus[0].children.push(...convertRouteToMenuRecursive(item.children))
          }
          else {
            const menuItem: MenuRecordMainRaw = {
              meta: {
                title: item?.meta?.title,
                icon: item?.meta?.icon,
                auth: item?.meta?.auth,
              },
              children: [],
            }
            menuItem.children = convertRouteToMenuRecursive(item.children)
            returnMenus.push(menuItem)
          }
        }
      })
      return returnMenus
    }
    function convertRouteToMenuRecursive(routes: RouteRecordRaw[], basePath = ''): MenuRecordRaw[] {
      const returnMenus: MenuRecordRaw[] = []
      routes.forEach((item) => {
        const menuItem: MenuRecordRaw = {
          path: resolveRoutePath(basePath, item.path),
          meta: {
            auth: item?.meta?.auth,
            title: item?.meta?.title,
            icon: item?.meta?.icon,
            menu: item?.meta?.menu,
            expand: item?.meta?.expand,
            link: item?.meta?.link,
          },
        }
        if (item.children) {
          menuItem.children = convertRouteToMenuRecursive(item.children, menuItem.path)
        }
        returnMenus.push(menuItem)
      })
      return returnMenus
    }

    // 完整导航数据
    const allMenus = computed(() => filterAsyncMenus(convertRouteToMenu(appRouteStore.routesRaw)))

    function normalizeActivedIndex(index: number) {
      if (allMenus.value.length === 0) {
        return 0
      }
      if (Number.isNaN(index) || index < 0) {
        return 0
      }
      if (index >= allMenus.value.length) {
        return allMenus.value.length - 1
      }
      return index
    }
    // 原始记录值：保存最近一次被设置的主导航索引
    // 当 allMenus 变化后，它可能暂时变成过期值，因此不应该直接在外部使用
    const activedOriginal = ref(0)
    // 对外可用值：始终基于 allMenus 当前长度做安全修正
    // 外部读取 actived 时，拿到的一定是当前有效索引
    const actived = computed({
      get: () => normalizeActivedIndex(activedOriginal.value),
      set: value => activedOriginal.value = normalizeActivedIndex(value),
    })

    // 次导航数据
    const sidebarMenus = computed<MenuRecordMainRaw['children']>(() => {
      return allMenus.value.length > 0
        ? allMenus.value[normalizeActivedIndex(actived.value)].children
        : []
    })
    // 次导航第一层最深路径
    const sidebarMenusFirstDeepestPath = computed(() => {
      return sidebarMenus.value.length > 0
        ? getDeepestPath(sidebarMenus.value[0])
        : appSettingsStore.settings.app.home.fullPath
    })
    function getDeepestPath(menu: MenuRecordRaw, rootPath = '') {
      let retnPath = ''
      if (menu.children?.some(item => item.meta?.menu !== false)) {
        const item = menu.children.find(item => item.meta?.menu !== false)
        if (item) {
          retnPath = getDeepestPath(item, resolveRoutePath(rootPath, menu.path))
        }
        else {
          retnPath = getDeepestPath(menu.children[0], resolveRoutePath(rootPath, menu.path))
        }
      }
      else {
        retnPath = resolveRoutePath(rootPath, menu.path)
      }
      return retnPath
    }
    // 次导航是否有且只有一个可访问的菜单
    const sidebarMenusHasOnlyMenu = computed(() => {
      return isSidebarMenusHasOnlyMenu(sidebarMenus.value)
    })
    function isSidebarMenusHasOnlyMenu(menus: MenuRecordRaw[]) {
      let count = 0
      let isOnly = true
      menus.forEach((menu) => {
        if (menu.meta?.menu !== false) {
          count++
        }
        if (menu.children) {
          isOnly = isSidebarMenusHasOnlyMenu(menu.children)
        }
      })
      return count <= 1 && isOnly
    }

    function getExpandPaths(menus: MenuRecordRaw[], rootPath = '') {
      const expandPaths: string[] = []
      menus.forEach((item) => {
        if (item.children) {
          if (item.meta?.expand) {
            expandPaths.push(resolveRoutePath(rootPath, item.path))
          }
          const childrenExpandPaths = getExpandPaths(item.children, resolveRoutePath(rootPath, item.path))
          if (childrenExpandPaths.length > 0) {
            expandPaths.push(...childrenExpandPaths)
          }
        }
      })
      return expandPaths
    }
    // 默认展开的导航路径
    const defaultExpandPaths = computed(() => {
      const defaultExpandPaths: string[] = []
      allMenus.value.forEach((item) => {
        defaultExpandPaths.push(...getExpandPaths(item.children))
      })
      return defaultExpandPaths
    })

    const auth = useAppAuth()
    // 根据权限过滤导航
    function filterAsyncMenus<T extends MenuRecordMainRaw[] | MenuRecordRaw[]>(menus: T): T {
      const res: any = []
      menus.forEach((menu) => {
        if (auth.auth(menu.meta?.auth ?? '')) {
          const tmpMenu = cloneDeep(menu)
          if (tmpMenu.children && tmpMenu.children.length > 0) {
            tmpMenu.children = filterAsyncMenus(tmpMenu.children) as MenuRecordRaw[]
            tmpMenu.children.length > 0 && res.push(tmpMenu)
          }
          else {
            delete tmpMenu.children
            res.push(tmpMenu)
          }
        }
      })
      return res
    }
    // 设置主导航
    function isPathInMenus(menus: MenuRecordRaw[], path: string) {
      let flag = false
      flag = menus.some((item) => {
        if (item.children) {
          return isPathInMenus(item.children, path)
        }
        return path.indexOf(`${item.path}/`) === 0 || path === item.path
      })
      return flag
    }
    function setActived(indexOrPath: number | string) {
      if (typeof indexOrPath === 'number') {
        // 如果是 number 类型，则认为是主导航的索引
        actived.value = indexOrPath
      }
      else {
        // 如果是 string 类型，则认为是路由，需要查找对应的主导航索引
        const findIndex = allMenus.value.findIndex(item => isPathInMenus(item.children, indexOrPath))
        if (findIndex >= 0) {
          actived.value = findIndex
        }
      }
    }

    return {
      actived,
      allMenus,
      sidebarMenus,
      sidebarMenusFirstDeepestPath,
      sidebarMenusHasOnlyMenu,
      defaultExpandPaths,
      setActived,
    }
  },
)
