import { deepClone, resolveRoutePath } from '@/util'
import path from 'path-browserify'
import api from '@/api'
import menu from '@/menu'

import useSettingsStore from './settings'
import useUserStore from './user'
import useRouteStore from './route'

function getDeepestPath(routes, rootPath = '') {
    let retnPath
    if (routes.children) {
        if (
            routes.children.some(item => {
                return item.meta.sidebar != false
            })
        ) {
            for (let i = 0; i < routes.children.length; i++) {
                if (routes.children[i].meta.sidebar != false) {
                    retnPath = getDeepestPath(routes.children[i], resolveRoutePath(rootPath, routes.path))
                    break
                }
            }
        } else {
            retnPath = getDeepestPath(routes.children[0], resolveRoutePath(rootPath, routes.path))
        }
    } else {
        retnPath = resolveRoutePath(rootPath, routes.path)
    }
    return retnPath
}

function hasPermission(permissions, route) {
    let isAuth = false
    if (route.meta && route.meta.auth) {
        isAuth = permissions.some(auth => {
            if (typeof route.meta.auth == 'string') {
                return route.meta.auth === auth
            } else {
                return route.meta.auth.some(routeAuth => {
                    return routeAuth === auth
                })
            }
        })
    } else {
        isAuth = true
    }
    return isAuth
}

function filterAsyncMenus(menus, permissions) {
    const res = []
    menus.forEach(menu => {
        let tmpMenu = deepClone(menu)
        if (hasPermission(permissions, tmpMenu)) {
            if (tmpMenu.children) {
                tmpMenu.children = filterAsyncMenus(tmpMenu.children, permissions)
                tmpMenu.children.length && res.push(tmpMenu)
            } else {
                res.push(tmpMenu)
            }
        }
    })
    return res
}

const useMenuStore = defineStore(
    // 唯一ID
    'menu',
    {
        state: () => ({
            menus: [],
            actived: 0
        }),
        getters: {
            // 完整导航数据
            allMenus() {
                const settingsStore = useSettingsStore()
                let menus
                if (settingsStore.app.routeBaseOn !== 'filesystem') {
                    const routeStore = useRouteStore()
                    if (settingsStore.menu.menuMode === 'single') {
                        menus = [{ children: [] }]
                        routeStore.routes.map(item => {
                            menus[0].children.push(...item.children)
                        })
                    } else {
                        menus = routeStore.routes
                    }
                } else {
                    menus = this.menus
                }
                return menus
            },
            // 次导航数据
            sidebarMenus() {
                return this.allMenus.length > 0 ? this.allMenus[this.actived].children : []
            },
            // 次导航里第一个导航的路径
            sidebarMenusFirstDeepestPath() {
                return this.allMenus.length > 0 ? getDeepestPath(this.sidebarMenus[0]) : '/'
            },
            defaultOpenedPaths() {
                const settingsStore = useSettingsStore()
                let defaultOpenedPaths = []
                if (settingsStore.app.routeBaseOn !== 'filesystem') {
                    const routeStore = useRouteStore()
                    routeStore.routes.map(item => {
                        item.meta.defaultOpened && defaultOpenedPaths.push(item.path)
                        item.children && item.children.map(child => {
                            child.meta.defaultOpened && defaultOpenedPaths.push(path.resolve(item.path, child.path))
                        })
                    })
                }
                return defaultOpenedPaths
            }
        },
        actions: {
            // 生成导航（前端生成）
            generateMenusAtFront() {
                // eslint-disable-next-line no-async-promise-executor
                return new Promise(async resolve => {
                    const settingsStore = useSettingsStore()
                    const userStore = useUserStore()
                    let accessedMenus
                    // 如果权限功能开启，则需要对导航数据进行筛选过滤
                    if (settingsStore.app.enablePermission) {
                        const permissions = await userStore.getPermissions()
                        accessedMenus = filterAsyncMenus(menu, permissions)
                    } else {
                        accessedMenus = deepClone(menu)
                    }
                    this.menus = accessedMenus.filter(item => item.children.length != 0)
                    resolve()
                })
            },
            // 生成导航（后端生成）
            generateMenusAtBack() {
                return new Promise(resolve => {
                    api.get('menu/list', {
                        baseURL: '/mock/'
                    }).then(async res => {
                        const settingsStore = useSettingsStore()
                        const userStore = useUserStore()
                        let accessedMenus
                        // 如果权限功能开启，则需要对导航数据进行筛选过滤
                        if (settingsStore.app.enablePermission) {
                            const permissions = await userStore.getPermissions()
                            accessedMenus = filterAsyncMenus(res.data, permissions)
                        } else {
                            accessedMenus = deepClone(res.data)
                        }
                        this.menus = accessedMenus.filter(item => item.children.length != 0)
                        resolve()
                    })
                })
            },
            // 切换主导航
            setActived(data) {
                if (typeof data === 'number') {
                    // 如果是 number 类型，则认为是主导航的索引
                    this.actived = data
                } else {
                    // 如果是 string 类型，则认为是路由，需要查找对应的主导航索引
                    this.allMenus.map((item, index) => {
                        if (
                            item.children.some(r => {
                                return data.indexOf(r.path + '/') === 0 || data == r.path
                            })
                        ) {
                            this.actived = index
                        }
                    })
                }
            }
        }
    }
)

export default useMenuStore
