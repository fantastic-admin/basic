import { defineStore } from 'pinia'
import { piniaStore } from '@/store'
import { resolveRoutePath } from '@/util'
import path from 'path-browserify'

import { useSettingsStore } from './settings'
import { useRouteStore } from './route'

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

export const useMenuStore = defineStore(
    // 唯一ID
    'menu',
    {
        state: () => ({
            headerActived: 0
        }),
        getters: {
            // 完整导航数据
            allMenus() {
                const settingsStore = useSettingsStore()
                const routeStore = useRouteStore()
                let routes
                if (settingsStore.menu.menuMode === 'single') {
                    routes = [{ children: [] }]
                    routeStore.routes.map(item => {
                        routes[0].children.push(...item.children)
                    })
                } else {
                    routes = routeStore.routes
                }
                return routes
            },
            // 次导航数据
            sidebarMenus() {
                return this.allMenus.length > 0 ? this.allMenus[this.headerActived].children : []
            },
            // 次导航里第一个导航的路径
            sidebarMenusFirstDeepestPath() {
                return this.allMenus.length > 0 ? getDeepestPath(this.sidebarMenus[0]) : '/'
            },
            defaultOpenedPaths() {
                const routeStore = useRouteStore()
                let defaultOpenedPaths = []
                routeStore.routes.map(item => {
                    item.meta.defaultOpened && defaultOpenedPaths.push(item.path)
                    item.children && item.children.map(child => {
                        child.meta.defaultOpened && defaultOpenedPaths.push(path.resolve(item.path, child.path))
                    })
                })
                return defaultOpenedPaths
            }
        },
        actions: {
            // 根据路由判断属于哪个头部导航
            setHeaderActived(path) {
                const routeStore = useRouteStore()
                routeStore.routes.map((item, index) => {
                    if (
                        item.children.some(r => {
                            return path.indexOf(r.path + '/') === 0 || path == r.path
                        })
                    ) {
                        this.headerActived = index
                    }
                })
            },
            // 切换头部导航
            switchHeaderActived(index) {
                this.headerActived = index
            }
        }
    }
)

export function useMenuOutsideStore() {
    return useMenuStore(piniaStore)
}
