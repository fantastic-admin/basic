import type { Menu, Route } from '#/global'
import type { RouteRecordRaw } from 'vue-router'
import { cloneDeep } from 'es-toolkit'
import apiApp from '@/api/modules/app'
import menu from '@/menu'
import { resolveRoutePath } from '@/utils'
import useRouteStore from './route'
import useSettingsStore from './settings'

const useMenuStore = defineStore(
  // 唯一ID
  'menu',
  () => {
    const settingsStore = useSettingsStore()
    const routeStore = useRouteStore()

    const filesystemMenusRaw = ref<Menu.recordMainRaw[]>([])
    const actived = ref(0)

    // 将原始路由转换成导航菜单
    function convertRouteToMenu(routes: Route.recordMainRaw[]): Menu.recordMainRaw[] {
      const returnMenus: Menu.recordMainRaw[] = []
      routes.forEach((item) => {
        if (item.children.length > 0) {
          if (settingsStore.settings.menu.mode === 'single') {
            returnMenus.length === 0 && returnMenus.push({
              meta: {},
              children: [],
            })
            returnMenus[0].children.push(...convertRouteToMenuRecursive(item.children))
          }
          else {
            const menuItem: Menu.recordMainRaw = {
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
    function convertRouteToMenuRecursive(routes: RouteRecordRaw[], basePath = ''): Menu.recordRaw[] {
      const returnMenus: Menu.recordRaw[] = []
      routes.forEach((item) => {
        const menuItem: Menu.recordRaw = {
          path: resolveRoutePath(basePath, item.path),
          meta: {
            title: item?.meta?.title,
            icon: item?.meta?.icon,
            defaultOpened: item?.meta?.defaultOpened,
            auth: item?.meta?.auth,
            menu: item?.meta?.menu,
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
    const allMenus = computed(() => {
      let returnMenus: Menu.recordMainRaw[] = []
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        returnMenus = convertRouteToMenu(routeStore.routesRaw)
      }
      else {
        returnMenus = filesystemMenusRaw.value
      }
      returnMenus = filterAsyncMenus(returnMenus)
      return returnMenus
    })
    // 次导航数据
    const sidebarMenus = computed<Menu.recordMainRaw['children']>(() => {
      return allMenus.value.length > 0
        ? allMenus.value.length > 1
          ? allMenus.value[actived.value].children
          : allMenus.value[0].children
        : []
    })
    // 次导航第一层最深路径
    const sidebarMenusFirstDeepestPath = computed(() => {
      return sidebarMenus.value.length > 0
        ? getDeepestPath(sidebarMenus.value[0])
        : settingsStore.settings.home.fullPath
    })
    function getDeepestPath(menu: Menu.recordRaw, rootPath = '') {
      let retnPath = ''
      if (menu.children) {
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
    function isSidebarMenusHasOnlyMenu(menus: Menu.recordRaw[]) {
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
    // 默认展开的导航路径
    const defaultOpenedPaths = computed(() => {
      const defaultOpenedPaths: string[] = []
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        allMenus.value.forEach((item) => {
          defaultOpenedPaths.push(...getDefaultOpenedPaths(item.children))
        })
      }
      return defaultOpenedPaths
    })
    function getDefaultOpenedPaths(menus: Menu.recordRaw[], rootPath = '') {
      const defaultOpenedPaths: string[] = []
      menus.forEach((item) => {
        if (item.meta?.defaultOpened && item.children) {
          defaultOpenedPaths.push(resolveRoutePath(rootPath, item.path))
          const childrenDefaultOpenedPaths = getDefaultOpenedPaths(item.children, resolveRoutePath(rootPath, item.path))
          if (childrenDefaultOpenedPaths.length > 0) {
            defaultOpenedPaths.push(...childrenDefaultOpenedPaths)
          }
        }
      })
      return defaultOpenedPaths
    }

    const auth = useAuth()
    // 根据权限过滤导航
    function filterAsyncMenus<T extends Menu.recordMainRaw[] | Menu.recordRaw[]>(menus: T): T {
      const res: any = []
      menus.forEach((menu) => {
        if (auth.auth(menu.meta?.auth ?? '')) {
          const tmpMenu = cloneDeep(menu)
          if (tmpMenu.children && tmpMenu.children.length > 0) {
            tmpMenu.children = filterAsyncMenus(tmpMenu.children) as Menu.recordRaw[]
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
    // 生成导航（前端生成）
    async function generateMenusAtFront() {
      filesystemMenusRaw.value = menu.filter(item => item.children.length !== 0)
    }
    // 生成导航（后端生成）
    async function generateMenusAtBack() {
      await apiApp.menuList().then(async (res) => {
        filesystemMenusRaw.value = (res.data as Menu.recordMainRaw[]).filter(item => item.children.length !== 0)
      }).catch(() => {})
    }
    // 设置主导航
    function isPathInMenus(menus: Menu.recordRaw[], path: string) {
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
      defaultOpenedPaths,
      generateMenusAtFront,
      generateMenusAtBack,
      setActived,
    }
  },
)

export default useMenuStore
