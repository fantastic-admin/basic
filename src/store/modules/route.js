import { deepClone, resolveRoutePath } from '@/util'
import api from '@/api'
import { systemRoutes } from '@/router/routes'

import useSettingsStore from './settings'
import useUserStore from './user'

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

function filterAsyncRoutes(routes, permissions) {
    const res = []
    routes.forEach(route => {
        let tmpRoute = deepClone(route)
        if (hasPermission(permissions, tmpRoute)) {
            if (tmpRoute.children) {
                tmpRoute.children = filterAsyncRoutes(tmpRoute.children, permissions)
                tmpRoute.children.length && res.push(tmpRoute)
            } else {
                res.push(tmpRoute)
            }
        }
    })
    return res
}

function formatBackRoutes(routes, views = import.meta.glob('../../views/**/*.vue')) {
    return routes.map(route => {
        switch (route.component) {
            case 'Layout':
                route.component = () => import('@/layout/index.vue')
                break
            default:
                if (route.component) {
                    route.component = views[`../../views/${route.component}`]
                }
        }
        if (route.children) {
            route.children = formatBackRoutes(route.children, views)
        }
        return route
    })
}

// 将多层嵌套路由处理成两层，保留顶层和最子层路由，中间层级将被拍平
function flatAsyncRoutes(routes, breadcrumb = [], baseUrl = '', isRoot = true) {
    if (isRoot) {
        if (routes.children) {
            routes.children = flatAsyncRoutes(routes.children, [{
                path: routes.path,
                title: routes.meta.title,
                hide: !routes.meta.breadcrumb && routes.meta.breadcrumb === false
            }], routes.path, false)
        }
        return routes
    } else {
        let res = []
        routes.forEach(route => {
            if (route.children) {
                let childrenBaseUrl = resolveRoutePath(baseUrl, route.path)
                let childrenBreadcrumb = deepClone(breadcrumb)
                if (route.meta.breadcrumb !== false) {
                    childrenBreadcrumb.push({
                        path: childrenBaseUrl,
                        title: route.meta.title,
                        hide: !route.meta.breadcrumb && route.meta.breadcrumb === false
                    })
                }
                let tmpRoute = deepClone(route)
                tmpRoute.path = childrenBaseUrl
                tmpRoute.meta.breadcrumbNeste = childrenBreadcrumb
                delete tmpRoute.children
                res.push(tmpRoute)
                let childrenRoutes = flatAsyncRoutes(route.children, childrenBreadcrumb, childrenBaseUrl, false)
                childrenRoutes.map(item => {
                    // 如果 path 一样则覆盖，因为子路由的 path 可能设置为空，导致和父路由一样，直接注册会提示路由重复
                    if (res.some(v => v.path == item.path)) {
                        res.forEach((v, i) => {
                            if (v.path == item.path) {
                                res[i] = item
                            }
                        })
                    } else {
                        res.push(item)
                    }
                })
            } else {
                let tmpRoute = deepClone(route)
                tmpRoute.path = resolveRoutePath(baseUrl, tmpRoute.path)
                // 处理面包屑导航
                let tmpBreadcrumb = deepClone(breadcrumb)
                tmpBreadcrumb.push({
                    path: tmpRoute.path,
                    title: tmpRoute.meta.title,
                    hide: !tmpRoute.meta.breadcrumb && tmpRoute.meta.breadcrumb === false
                })
                tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb
                res.push(tmpRoute)
            }
        })
        return res
    }
}

const useRouteStore = defineStore(
    // 唯一ID
    'route',
    {
        state: () => ({
            isGenerate: false,
            routes: [],
            currentRemoveRoutes: []
        }),
        getters: {
            // 扁平化路由（将三级及以上路由数据拍平成二级）
            flatRoutes: state => {
                const settingsStore = useSettingsStore()
                let routes = []
                if (state.routes) {
                    if (settingsStore.app.routeBaseOn !== 'filesystem') {
                        state.routes.map(item => {
                            routes.push(...deepClone(item.children))
                        })
                        routes.map(item => flatAsyncRoutes(item))
                    } else {
                        state.routes.map(item => {
                            routes.push(deepClone(item))
                        })
                    }
                }
                return routes
            },
            flatSystemRoutes: () => {
                let routes = []
                systemRoutes.map(item => {
                    routes.push(deepClone(item))
                })
                routes.map(item => flatAsyncRoutes(item))
                return routes
            }
        },
        actions: {
            // 根据权限动态生成路由（前端生成）
            generateRoutesAtFront(asyncRoutes) {
                // eslint-disable-next-line no-async-promise-executor
                return new Promise(async resolve => {
                    const settingsStore = useSettingsStore()
                    const userStore = useUserStore()
                    let accessedRoutes
                    // 如果权限功能开启，则需要对路由数据进行筛选过滤
                    if (settingsStore.app.enablePermission) {
                        const permissions = await userStore.getPermissions()
                        accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
                    } else {
                        accessedRoutes = deepClone(asyncRoutes)
                    }
                    // 设置 routes 数据
                    this.isGenerate = true
                    this.routes = accessedRoutes.filter(item => item.children.length != 0)
                    resolve()
                })
            },
            // 根据权限动态生成路由（后端获取）
            generateRoutesAtBack() {
                return new Promise(resolve => {
                    api.get('route/list', {
                        baseURL: '/mock/'
                    }).then(async res => {
                        const settingsStore = useSettingsStore()
                        const userStore = useUserStore()
                        let asyncRoutes = formatBackRoutes(res.data)
                        let accessedRoutes
                        // 如果权限功能开启，则需要对路由数据进行筛选过滤
                        if (settingsStore.app.enablePermission) {
                            const permissions = await userStore.getPermissions()
                            accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
                        } else {
                            accessedRoutes = deepClone(asyncRoutes)
                        }
                        // 设置 routes 数据
                        this.isGenerate = true
                        this.routes = accessedRoutes.filter(item => item.children.length != 0)
                        resolve()
                    })
                })
            },
            // 根据权限动态生成路由（文件系统生成）
            generateRoutesAtFilesystem(asyncRoutes) {
                // eslint-disable-next-line no-async-promise-executor
                return new Promise(async resolve => {
                    const settingsStore = useSettingsStore()
                    const userStore = useUserStore()
                    let accessedRoutes
                    // 如果权限功能开启，则需要对路由数据进行筛选过滤
                    if (settingsStore.app.enablePermission) {
                        const permissions = await userStore.getPermissions()
                        accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
                    } else {
                        accessedRoutes = deepClone(asyncRoutes)
                    }
                    // 设置 routes 数据
                    this.isGenerate = true
                    this.routes = accessedRoutes.filter(item => item.children.length != 0)
                    resolve()
                })
            },
            // 记录 accessRoutes 路由，用于登出时删除路由
            setCurrentRemoveRoutes(routes) {
                this.currentRemoveRoutes = routes
            },
            // 清空路由
            removeRoutes() {
                this.isGenerate = false
                this.routes = []
                this.currentRemoveRoutes.forEach(removeRoute => {
                    removeRoute()
                })
                this.currentRemoveRoutes = []
            }
        }
    }
)

export default useRouteStore
