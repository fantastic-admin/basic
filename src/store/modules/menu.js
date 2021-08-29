import path from 'path-browserify'
import { deepClone } from '@/util'
import api from '@/api'

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
        const tmp = { ...route }
        if (hasPermission(permissions, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, permissions)
                tmp.children.length && res.push(tmp)
            } else {
                res.push(tmp)
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

// 将多层嵌套路由处理成平级
function flatAsyncRoutes(routes, breadcrumb, baseUrl = '') {
    let res = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (tmp.children) {
            let childrenBaseUrl = ''
            if (baseUrl == '') {
                childrenBaseUrl = tmp.path
            } else if (tmp.path != '') {
                childrenBaseUrl = `${baseUrl}/${tmp.path}`
            }
            let childrenBreadcrumb = deepClone(breadcrumb)
            if (route.meta.breadcrumb !== false) {
                childrenBreadcrumb.push({
                    path: childrenBaseUrl,
                    title: route.meta.title
                })
            }
            let tmpRoute = deepClone(route)
            tmpRoute.path = childrenBaseUrl
            tmpRoute.meta.breadcrumbNeste = childrenBreadcrumb
            delete tmpRoute.children
            res.push(tmpRoute)
            let childrenRoutes = flatAsyncRoutes(tmp.children, childrenBreadcrumb, childrenBaseUrl)
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
            if (baseUrl != '') {
                if (tmp.path != '') {
                    tmp.path = `${baseUrl}/${tmp.path}`
                } else {
                    tmp.path = baseUrl
                }
            }
            // 处理面包屑导航
            let tmpBreadcrumb = deepClone(breadcrumb)
            if (tmp.meta.breadcrumb !== false) {
                tmpBreadcrumb.push({
                    path: tmp.path,
                    title: tmp.meta.title
                })
            }
            tmp.meta.breadcrumbNeste = tmpBreadcrumb
            res.push(tmp)
        }
    })
    return res
}

const state = () => ({
    isGenerate: false,
    routes: [],
    defaultOpenedPaths: [],
    headerActived: 0,
    currentRemoveRoutes: []
})

const getters = {
    // 由于 getter 的结果不会被缓存，导致导航栏切换时有明显的延迟，该问题会在 Vue 3.2 版本中修复，详看 https://github.com/vuejs/vuex/pull/1883
    routes: (state, getters, rootState) => {
        let routes
        if (rootState.settings.menuMode === 'single') {
            routes = [{children: []}]
            state.routes.map(item => {
                routes[0].children.push(...item.children)
            })
        } else {
            routes = state.routes
        }
        return routes
    },
    sidebarRoutes: (state, getters) => {
        return getters.routes.length > 0 ? getters.routes[state.headerActived].children : []
    }
}

const actions = {
    // 根据权限动态生成路由（前端生成）
    generateRoutesAtFront({rootState, dispatch, commit}, data) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async resolve => {
            let accessedRoutes
            // 如果权限功能开启，则需要对路由数据进行筛选过滤
            if (rootState.settings.enablePermission) {
                const permissions = await dispatch('user/getPermissions', null, { root: true })
                accessedRoutes = filterAsyncRoutes(data.asyncRoutes, permissions)
            } else {
                accessedRoutes = data.asyncRoutes
            }
            commit('setRoutes', accessedRoutes)
            commit('setHeaderActived', data.currentPath)
            let routes = []
            accessedRoutes.map(item => {
                routes.push(...item.children)
            })
            // 将三级及以上路由数据拍平成二级
            routes.map(item => {
                if (item.children) {
                    item.children = flatAsyncRoutes(item.children, [{
                        path: item.path,
                        title: item.meta.title
                    }])
                }
            })
            commit('setDefaultOpenedPaths', routes)
            resolve(routes)
        })
    },
    // 生成路由（后端获取）
    generateRoutesAtBack({ commit }, data) {
        return new Promise(resolve => {
            api.get('route/list', {
                baseURL: '/mock/'
            }).then(res => {
                let accessedRoutes = formatBackRoutes(res.data)
                commit('setRoutes', accessedRoutes)
                commit('setHeaderActived', data.currentPath)
                let routes = []
                accessedRoutes.map(item => {
                    routes.push(...item.children)
                })
                // 将三级及以上路由数据拍平成二级
                routes.map(item => {
                    if (item.children) {
                        item.children = flatAsyncRoutes(item.children, [{
                            path: item.path,
                            title: item.meta.title
                        }])
                    }
                })
                commit('setDefaultOpenedPaths', routes)
                resolve(routes)
            })
        })
    }
}

const mutations = {
    invalidRoutes(state) {
        state.isGenerate = false
        state.headerActived = 0
    },
    setRoutes(state, routes) {
        state.isGenerate = true
        let newRoutes = deepClone(routes)
        state.routes = newRoutes.filter(item => {
            return item.children.length != 0
        })
    },
    setDefaultOpenedPaths(state, routes) {
        let defaultOpenedPaths = []
        routes.map(item => {
            item.meta.defaultOpened && defaultOpenedPaths.push(item.path)
            item.children.map(child => {
                child.meta.defaultOpened && defaultOpenedPaths.push(path.resolve(item.path, child.path))
            })
        })
        state.defaultOpenedPaths = defaultOpenedPaths
    },
    // 根据路由判断属于哪个头部导航
    setHeaderActived(state, path) {
        state.routes.map((item, index) => {
            if (
                item.children.some(r => {
                    return path.indexOf(r.path + '/') === 0 || path == r.path
                })
            ) {
                state.headerActived = index
            }
        })
    },
    // 切换头部导航
    switchHeaderActived(state, index) {
        state.headerActived = index
    },
    // 记录 accessRoutes 路由，用于登出时删除路由
    setCurrentRemoveRoutes(state, routes) {
        state.currentRemoveRoutes = routes
    },
    // 清空动态路由
    removeRoutes(state) {
        state.currentRemoveRoutes.forEach(removeRoute => {
            removeRoute()
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
